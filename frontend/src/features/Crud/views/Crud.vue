<template>
  <div>
    <v-dialog
      v-model="editDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title>
          Modify card
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="selectedBoard.name" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="selectedBoard.save();
                    editDialog=false"
          >
            <v-icon
              left
              dark
            >
              mdi-content-save
            </v-icon>
            SAVE
          </v-btn>
          <v-btn text @click="editDialog=false">
            <v-icon
              left
              dark
            >
              mdi-cancel
            </v-icon>
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="board in boards"
          :key="board._id"
          cols="12"
          md="6"
          lg="4"
          xl="2"
        >
          <v-card>
            <v-card-title>
              {{ board.name }}
            </v-card-title>
            <v-card-actions>
              <v-btn text @click="modifyBoard(board)">
                <v-icon
                  left
                  dark
                >
                  mdi-file-edit-outline
                </v-icon>
                Modify
              </v-btn>
              <v-btn text @click="board.remove()">
                <v-icon
                  left
                  dark
                >
                  mdi-delete
                </v-icon>
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useFind } from 'feathers-vuex';
import { Board } from '@/features/Crud/service.model';

export default defineComponent({
  name: 'Crud',
  setup(props, context) {
    // 1. Get a reference to the model class
    const { Board } = context.root.$FeathersVuex.api;

    // 2. Create a computed property for the params
    const boardsParams = computed(() => ({
      query: {}
    }));

    // 3. Provide the model and params in the options
    const boards = useFind({ model: Board, params: boardsParams });

    const editDialog = ref(false);
    const selectedBoard = ref(new Board());

    const modifyBoard = (board:Board):void => {
      selectedBoard.value = board.clone();
      editDialog.value = true;
    };
    // 4. Return the data, named as you prefer
    return {
      modifyBoard,
      selectedBoard,
      editDialog,
      boards: boards.items
    };
  }
});
</script>
