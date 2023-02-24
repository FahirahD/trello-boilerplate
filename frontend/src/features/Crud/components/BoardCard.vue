<template>
  <v-card
    v-if="skeletonMode"
    v-click-outside="onClickOutside"
    :color="colors"
    flat
    :ripple="!isCreatingMode"
  >
    <v-card-text
      v-if="isCreatingMode"
      ripple="false"
      height="100%"
    >
      <v-text-field v-model="currentBoard.name" label="Name" :rules="[(v) => !!v ||'Cannot be empty']" />
      <v-text-field
        :rules="[(v) => !!v ||'Cannot be empty']"
        label="Background"
        value="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      />
      <v-spacer />
      <v-card-actions>
        <v-btn
          class="ml-0 white--text font-weight-bold"
          :disabled="!currentBoard.name"
          color="green"
          @click="createBoard"
        >
          CREATE
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card-text>
    <v-card-subtitle
      v-else
      class=" a pa-1"
      @click="$emit('addBoard'); isCreatingMode=true; colors='white'"
    >
      Add a board...
    </v-card-subtitle>
  </v-card>
  <v-card
    v-else
    class="ma-0"
    :ripple="false"
    @click="goToProjectList(currentBoard._id)"
  >
    <v-img
      class="white--text "
      height="200px"
      :src="boardImage"
    >
      <v-app-bar
        flat
        color="rgba(0, 0, 0, 0)"
      >
        <v-toolbar-title class="text-h6 white--text pl-0">
          {{ currentBoard.name }}
        </v-toolbar-title>

        <v-spacer />
      </v-app-bar>
    </v-img>
    <v-card-actions class="d-flex">
      <v-avatar
        class="mr-2"
        size="25px"
      >
        <img
          src="https://www.gravatar.com/avatar/62da7cdbf9f4072f8b935b5452c8d5b6?s=80&d=retro&r=g"
          alt="John"
        >
      </v-avatar>

      <div class="">
        A month ago
      </div>
      <v-spacer />
      <v-btn
        :loading="currentBoard.isRemovePending"
        text
        fab
        small
        color="red"
        @click.stop="removeBoard(currentBoard)"
      >
        <v-icon
          left
          dark
        >
          mdi-delete-forever
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch
} from '@vue/composition-api';
import router from '@/router';
import store from '@/store';

export default defineComponent({
  name: 'BoardCard',

  props: {
    userId: String,
    board: Object,
    skeletonMode: Boolean,
  },

  setup(props) {
    // eslint-disable-next-line no-underscore-dangle
    const userId = computed(() => store.state.auth.user._id);

    const isCreatingMode = ref(false);
    const colors = ref('grey lighten-2');
    // eslint-disable-next-line max-len
    const boardImage = ref('https://images.unsplash.com/photo-1544604860-206456f08229?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
    const currentBoard = ref();
    const textName = ref();
    const deleteClicked = ref(false);
    watch(() => props.board, () => {
      currentBoard.value = props.board;
    }, { immediate: true });

    const goToProjectList = (id) => {
      router.push(`/boards/${id}`);
    };

    const onClickOutside = () => {
      isCreatingMode.value = false;
      colors.value = 'grey lighten-2';
    };

    const createBoard = async () => {
      // eslint-disable-next-line no-param-reassign
      props.board.userId = userId.value;
      console.log(props.userId);
      await props.board.create();
      isCreatingMode.value = false;
      colors.value = 'grey lighten-2';
    };
    const removeBoard = async (board) => {
      await board.remove();
    };

    return {
      boardImage,
      createBoard,
      colors,
      currentBoard,
      isCreatingMode,
      onClickOutside,
      textName,
      goToProjectList,
      removeBoard
    };
  },
});
</script>

<style scoped>

.a{}

.a:hover{

  text-decoration:underline;
  background-color: #BDBDBD;
}

</style>
