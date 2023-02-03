<template>
  <v-card>
    <v-card-title
      v-if="skeletonMode"
    >
      <v-skeleton-loader
        min-width="
        333"
        type="heading"
      />
    </v-card-title>
    <v-card-title v-else>
      {{ board.name }}
    </v-card-title>
    <v-card-actions v-if="skeletonMode">
      <v-skeleton-loader
        max-height="40"
        min-width="125"
        class="pa-2"
        type="image"
      /><v-skeleton-loader
        max-height="40"
        min-width="125"
        class="pa-2"
        type="image"
      />
    </v-card-actions>
    <v-card-actions v-else>
      <v-btn
        :disabled="board.isRemovePending"
        text
        @click="$emit('modify',board)"
      >
        <v-icon
          left
          dark
        >
          mdi-file-edit-outline
        </v-icon>
        Modify
      </v-btn>
      <v-btn
        :loading="board.isRemovePending"
        text
        @click="board.remove()"
      >
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
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BoardCard',

  props: {
    board: Object,
    skeletonMode: Boolean,
  },

  setup() {
    return {

    };
  },
});
</script>
