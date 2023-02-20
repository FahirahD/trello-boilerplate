<template>
  <v-container v-if="!addMode" class="pa-0 ma-0">
    <v-card class="pa-0 mb-0">
      <v-card-subtitle style="color: black" class="pa-0">
        {{ task.name }}
      </v-card-subtitle>
    </v-card>
  </v-container>
  <v-container
    v-else
    class="pa-0 mb-0"
  >
    <v-card
      v-if="
        addBoard"
      flat
      class="ma-0 pa-0"
      @click="$emit('addNewTask'), addBoard=false"
    >
      <v-card-text
        class="a ma-0 pa-0"
      >
        <v-card
          flat
          class="add-card pa-1"
          height="35"
        >
          <v-card-subtitle class="add-card ma-0 pa-1">
            Add a card...
          </v-card-subtitle>
        </v-card>
      </v-card-text>
    </v-card>
    <v-card
      v-else
    >
      <v-card-text
        v-click-outside="onClickOutside"
        class=" pa-0 size d-flex align-center md-20"
      >
        <v-text-field
          v-model="task.name"
          height="20px"
          autofocus
          append-icon="mdi-content-save"
          flat
          color="black"
          hide-details="auto"
          solo
          :rules="[(v) => !!v ||'Cannot be empty']"
          @click:append="saveTask(task)"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useFind } from 'feathers-vuex';

export default defineComponent({
  name: 'Task',

  props: {
    task: Object,
    columnID: String,
    addMode: Boolean
  },

  setup(props, context) {
    const addList = ref(true);

    const addBoard = ref(true);

    const saveTask = (t) => {
      // eslint-disable-next-line no-param-reassign
      t.columnId = props.columnID;
      t.create();
      addBoard.value = true;
    };

    const onClickOutside = () => {
      addList.value = true;
      addBoard.value = true;
    };

    return {
      addList,
      addBoard,
      saveTask,
      onClickOutside
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
