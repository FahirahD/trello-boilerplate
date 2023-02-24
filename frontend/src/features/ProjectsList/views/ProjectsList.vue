<template>
  <v-container
    fluid
    class="ml-0 pl-0 pt-0 mr-0 pr-0"
    style="
     height: 100%;
     width: 100%;
    background-size: 2500px;
    background-image: url('http://bit.ly/3XgO0dX')"
  >
    <div v-if="isDataValid" class="pa-0 ma-0">
      <v-form class="pl-0 pr-0 mt-0 mr-0">
        <v-text-field
          v-model="textValue"
          dark
          solo-inverted
          class="  pl-0 mt-0 text-md-h5"
          text
          label="Name"
          :rules="[(v) => !!v ||'Cannot be empty']"
          @input="modifyProject"
        />
      </v-form>
      <v-row class="ml-6 mr-6">
        <v-col
          v-for="column in columns"
          :key="column._id"
          class="px-1"
          cols="12"
          sm="3"
          lg="2"
          md="2"
          xl="1"
        >
          <Column :create-list-mode="false" :column="column" />
        </v-col>
        <v-col
          cols="12"
          sm="3"
          lg="2"
          md="2"
          xl="1"
        >
          <Column
            :board-i-d="id"
            :create-list-mode="true"
            :column="newColumn"
            @prepareCol="prepareCol"
          />
        </v-col>
      </v-row>
    </div>
    <div
      v-else
      style="background-color: #757575;
     height: 100%"
      fluid
      class="ma-0 pa-0 pt-1 "
    >
      <v-alert
        dark
        border="top"
        tile
        class="ma-0"
        color="red"
        icon="mdi-alert"
        type="error"
      >
        {{ errorMessage }}
      </v-alert>
      <div class="flex-fill fill-height d-flex align-center justify-center backdrop-blur">
        <div class="d-flex flex-column align-center garda-blue--text">
          <v-img contain height="100px" src="https://trelloclone.bewave.io/img/error.025ebce7.gif" />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import {
  computed, defineComponent, onBeforeMount, ref
} from '@vue/composition-api';
import { useFind } from 'feathers-vuex';
import axios from 'axios/index';
import Column from '@/features/ProjectsList/components/Column.vue';

export default defineComponent({
  name: 'ProjectList',

  components: {
    Column,
  },

  props: {
    id: { type: String }
  },

  setup(props, context) {
    // eslint-disable-next-line max-len
    const isDataValid = ref(true);
    const errorMessage = ref('');

    onBeforeMount(async () => {
      try {
        const res = await axios.get(`http://localhost:3030/boards/${props.id}`);
      } catch (e) {
        errorMessage.value = e.response.data.message;
        isDataValid.value = false;
      }
    });

    const { Board, Column } = context.root.$FeathersVuex.api;

    // 2. Create a computed property for the params
    const boardsParams = computed(() => ({
      query: { _id: props.id }
    }));

    // 2. Create a computed property for the params
    const columnParams = computed(() => ({
      query: { boardId: props.id }
    }));

    const { items: boards, isPending: isBoardLoading } = useFind({ model: Board, params: boardsParams });
    // 3. Provide the model and params in the options
    const { items: columns, isPending: isColumnLoading } = useFind({ model: Column, params: columnParams });

    const addList = ref(true);

    console.log(boards.value);

    const addBoard = ref(true);
    const textBackgroundColor = ref('');
    const textColor = ref('white');
    const textValue = ref(boards.value[0]?.name);
    const textName = ref();
    const newColumn = ref();

    const prepareCol = () => {
      newColumn.value = new Column();
    };

    const modifyProject = () => {
      console.log(textValue.value);
      boards.value[0].name = textValue.value;
      boards.value[0].save();
    };

    const onClickOutside = () => {
      addList.value = true;
      addBoard.value = true;
    };
    const onClickOutsideTexfield = () => {
      textBackgroundColor.value = '';
      textColor.value = 'white';
    };

    return {
      addList,
      addBoard,
      onClickOutside,
      textBackgroundColor,
      onClickOutsideTexfield,
      textColor,
      textValue,
      textName,
      columns,
      newColumn,
      prepareCol,
      boards,
      modifyProject,
      isDataValid,
      errorMessage,
    };
  },
});

</script>

<style scoped>

.a{}

.a:hover{
  text-decoration:underline;
  background-color:black;
}

.add-list{
  text-decoration-color: white;
  background-color:#757575;
  opacity: 0.70;
}

.add-list:hover{
 color: white;
  opacity: 1;
}

.add-card{
  background-color: #E0E0E0;
}

.add-card:hover{
  color: black;
  background-color: #BDBDBD;
}

</style>
