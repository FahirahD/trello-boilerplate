<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title v-if="createMode">
        Create card
      </v-card-title>
      <v-card-title v-else>
        Modify card
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="board.name"
          :disabled="board.isCreatePending"
        />
        <v-text-field
          v-model="board.imgUrl"
          :disabled="board.isCreatePending"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="createMode"
          text
          :loading="board.isCreatePending"
          @click="createBoard"
        >
          <v-icon
            left
            dark
          >
            mdi-content-save
          </v-icon>
          CREATE
        </v-btn>
        <v-btn
          v-else
          :loading="board.isPatchPending"
          text
          @click="saveBoard"
        >
          <v-icon
            left
            dark
          >
            mdi-content-save
          </v-icon>
          SAVE
        </v-btn>
        <v-btn
          text
          :disabled="board.isPatchPending"
          @click="$emit('input', false)"
        >
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
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'CreateEditDialog',

  props: {
    board: Object,
    createMode: Boolean,
    value: Boolean
  },

  setup(props, { emit }) {
    const dialog = computed({
      get():boolean { return props.value; },
      set(newValue:boolean):void{
        emit('input', newValue);
      }
    });
    const createBoard = async () => {
      await props.board.create();
      dialog.value = false;
    };
    const saveBoard = async () => {
      await props.board.save();
      dialog.value = false;
    };

    return {
      createBoard,
      dialog,
      saveBoard
    };
  },
});
</script>
