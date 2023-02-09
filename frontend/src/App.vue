<template>
  <v-app>
    <v-app-bar
      color="primary"
      app
      fixed
      flat
    >
      <v-row class="ma-0 d-flex align-center">
        <v-col>
          <h3 style="color: white" v-text="$route.meta.title" />
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                fab
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-avatar>
                  <img
                    src="https://www.gravatar.com/avatar/62da7cdbf9f4072f8b935b5452c8d5b6?s=80&d=retro&r=g"
                  >
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-app-bar>

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
