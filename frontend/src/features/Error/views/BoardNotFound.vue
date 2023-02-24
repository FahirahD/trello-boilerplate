<template>
  <VContainer
    style="background-color: #757575;
     height: 100%"
    fluid
    class="ma-0 pa-0 pt-1 "
  >
    <v-alert
      dark
      border="top"
      tile
      class="ma-0"
      color="red"
      icon="mdi-alert"
      type="error"
    >
      {{ errorMessages }}
    </v-alert>
    <div class="flex-fill fill-height d-flex align-center justify-center backdrop-blur">
      <div class="d-flex flex-column align-center garda-blue--text">
        <v-img contain height="100px" src="https://trelloclone.bewave.io/img/error.025ebce7.gif" />
      </div>
    </div>
  </VContainer>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useFind } from 'feathers-vuex';
import router from '@/router';

export default defineComponent({
  name: 'BoardNotFound',
  setup(props, context) {
    // eslint-disable-next-line max-len
    // router.replace('ahaha');
    const errorMessages = router.app.$route.params.message;

    return {
      errorMessages
    };
  },
});

</script>
