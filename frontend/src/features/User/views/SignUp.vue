<template>
  <v-container class="fill-height justify-center align-center" fluid>
    <div class="justify-center align-center">
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
          :rules="[(v) => !!v ||'Cannot be empty' , v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Invalid e-mail.']"
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
        <v-btn
          :disabled="!(newUser.user && newUser.displayName && newUser.email && newUser.password &&
            confirmPassWord && isPassWordConfirmed(newUser.password,confirmPassWord)
          )"
          class="d-flex justify-center align-center"
          @click="signUp(newUser)"
        >
          SIGN UP
        </v-btn>
      </v-form>
    </div>
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

    const signUp = async (user) => {
      try {
        await user.create();
      } catch (e) {
        newUser.value = new User();
        console.log(e);
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
      signUp
    };
  }
});
</script>
