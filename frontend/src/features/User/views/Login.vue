<template>
  <v-container class="fill-height align-center justify-center" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-icon class="d-flex" large>
          mdi-clipboard-account
        </v-icon>
        <v-form v-model="isFormValid" @submit.prevent="signIn">
          <v-text-field v-model="user" label="User" :rules="[(v) => !!v ||'Cannot be empty']" />
          <v-text-field v-model="password" label="Password" :rules="[(v) => !!v ||'Cannot be empty']" />
          <v-row justify="center">
            <v-btn
              tile
              :disabled="!isFormValid"
              :loading="isAuthenticatePending"
              type="submit"
            >
              Login
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          <v-icon large>
            mdi-alert-circle
          </v-icon>
          Authentication Error
        </v-card-title>
        <v-card-text>Invalid login </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn
            tile
            depressed
            class="green--text"
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import useAuth from '@/features/Auth/composites';
import store from '@/store';
import router from '@/router';

export default defineComponent({
  name: 'Login',

  setup(props, context) {
    // 1. Get a reference to the model class
    const user = ref('');
    const password = ref('');

    const { login } = useAuth();
    const dialog = ref(false);

    const isAuthenticatePending = computed(() => store.state.auth?.isAuthenticatePending);

    const isFormValid = ref(false);
    const signIn = async () => {
      try {
        await login({ email: user.value, password: password.value, strategy: 'local' });
        router.push('/projects');
      } catch (e) {
        dialog.value = true;
        console.log(e);
      }
    };

    return {
      user,
      password,
      signIn,
      isAuthenticatePending,
      isFormValid,
      dialog,
    };
  }
});
</script>
