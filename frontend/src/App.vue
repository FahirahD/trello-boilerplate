<template>
  <v-app>
    <v-app-bar
      color="primary"
      app
      fixed
      flat
    />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App',
});
</script>
