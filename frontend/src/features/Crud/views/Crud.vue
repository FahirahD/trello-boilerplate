<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="board in boards"
        :key="board._id"
        class="px-1"
        sm="6"
        lg="2"
        md="4"
        xl="1"
      >
        <board-card :board="board" />
      </v-col>
      <v-col
        class="px-1"
        cols="12"
        sm="6"
        lg="2"
        md="4"
        xl="1"
      >
        <board-card :board="selectedBoard" skeleton-mode @addBoard="addBoard" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useFind } from 'feathers-vuex';
import { Board } from '@/features/Crud/service.model';
import BoardCard from '@/features/Crud/components/BoardCard.vue';

export default defineComponent({
  name: 'Crud',

  components: {
    BoardCard,
  },

  setup(props, context) {
    // 1. Get a reference to the model class
    const { Board } = context.root.$FeathersVuex.api;

    // 2. Create a computed property for the params
    const boardsParams = computed(() => ({
      query: {}
    }));

    // 3. Provide the model and params in the options
    const { items: boards, isPending: isBoardLoading } = useFind({ model: Board, params: boardsParams });
    const selectedBoard = ref(new Board());

    const createMode = ref(false);
    const isDialogOpen = ref(false);
    const openModifyDialog = (board:Board):void => {
      createMode.value = false;
      selectedBoard.value = board.clone();
      isDialogOpen.value = true;
    };

    const addBoard = () => {
      selectedBoard.value = new Board();
    };

    const closeDialog = ():void => {
      isDialogOpen.value = false;
    };

    const openCreateDialog = ():void => {
      isDialogOpen.value = true;
      createMode.value = true;
      selectedBoard.value = new Board();
    };

    // 4. Return the data, named as you prefer
    return {
      openCreateDialog,
      openModifyDialog,
      closeDialog,
      isBoardLoading,
      selectedBoard,
      isDialogOpen,
      boards,
      createMode,
      addBoard,
    };
  }
});
</script>
