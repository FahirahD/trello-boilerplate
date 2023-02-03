<template>
  <div>
    <CreateEditDialog
      v-model="isDialogOpen"
      :create-mode="createMode"
      :board="selectedBoard"
    />
    <v-container fluid>
      <v-btn text @click="openCreateDialog">
        create
      </v-btn>
      <v-row v-if="isBoardLoading">
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          md="6"
          lg="4"
          xl="2"
        >
          <board-card skeleton-mode />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="board in boards"
          :key="board._id"
          cols="12"
          md="6"
          lg="4"
          xl="2"
        >
          <board-card :board="board" @modify="openModifyDialog" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useFind } from 'feathers-vuex';
import { Board } from '@/features/Crud/service.model';
import BoardCard from '@/features/Crud/components/BoardCard.vue';
import CreateEditDialog from '@/features/Crud/components/CreateEditDialog.vue';

export default defineComponent({
  name: 'Crud',

  components: {
    CreateEditDialog,
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
    };
  }
});
</script>
