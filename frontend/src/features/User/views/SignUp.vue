<template>
  <v-container class="fill-height justify-center align-center" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-icon large class=" d-flex align-center">
          mdi-face-man
        </v-icon>
        <v-form>
          <v-text-field
            v-model="newUser.user"
            :rules="[(v) => !!v ||'Cannot be empty']"
            label="User"
            variant="underlined"
          />
          <v-text-field
            v-model="newUser.displayName"
            :rules="[(v) => !!v ||'Cannot be empty']"
            label="Display Name"
            variant="underlined"
          />
          <v-text-field
            v-model="newUser.email"
            :rules="[(v) => !!v ||'Cannot be empty' ,
                     v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid e-mail.']"
            label="Email"
            variant="underlined"
          />
          <v-text-field
            v-model="newUser.password"
            :rules="[(v) => !!v ||'Cannot be empty']"
            label="Password"
            variant="underlined"
          />
          <v-text-field
            v-model="confirmPassWord"
            :rules="[(v) => !!v ||'Cannot be empty', (v)=> v == newUser.password||'Password must match']"
            label="
          Confirm
          Password"
            variant="underlined"
          />
          <v-row justify="center">
            <v-btn
              tile
              :disabled="!(newUser.user && newUser.displayName && newUser.email && newUser.password &&
                confirmPassWord && isPassWordConfirmed(newUser.password,confirmPassWord)
              )"
              @click="signUp(newUser)"
            >
              SIGN UP
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
        <v-card-text>{{ message }}</v-card-text>
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
import { useFind } from 'feathers-vuex';
import { Board } from '@/features/Crud/service.model';
import BoardCard from '@/features/Crud/components/BoardCard.vue';
import router from '@/router';

export default defineComponent({
  name: 'SignUp',

  setup(props, context) {
    const { User } = context.root.$FeathersVuex.api;

    const newUser = ref(new User());
    const confirmPassWord = ref('');
    const dialog = ref(false);
    const message = ref('');

    const signUp = async (user) => {
      try {
        await user.create();
      } catch (e) {
        dialog.value = true;
        newUser.value = new User();
        message.value = e.message;

        return;
      }
      // eslint-disable-next-line no-param-reassign
      newUser.value = new User();
      router.push('/login');
    };

    const isPassWordConfirmed = (p, cp) => p === cp;

    return {
      newUser,
      confirmPassWord,
      isPassWordConfirmed,
      signUp,
      message,
      dialog
    };
  }
});
</script>
