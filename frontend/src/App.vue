<template>
  <v-app
    class="pb-0 pt-0"
  >
    <v-app-bar
      color="primary"
      app
      fixed
      flat
      class="pb-0 pt-0"
    >
      <v-row class="ma-0 pa-0 d-flex align-center">
        <v-col>
          <h3 style="color: white" v-text="$route.meta.title" />
        </v-col>
        <v-spacer />
        <v-col v-if="isUserAuthenticated" cols="auto">
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
                <v-list-item-title @click="logOut">
                  Logout
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col v-else class="pa-0" cols="auto">
          <v-btn
            style="height:80px"
            depressed
            tile
            class=" white--text"
            color="transparent"
            variant="flat"
            to="/login"
          >
            LOGIN
          </v-btn>
          <v-btn
            style="height:80px"
            depressed
            tile
            class="white--text"
            color="transparent"
            variant="flat"
            to="/signup"
          >
            SIGN UP
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watch,
  onMounted
} from '@vue/composition-api';
import useAuth from '@/features/Auth/composites';
import store from '@/store';
import router from '@/router';

export default defineComponent({
  name: 'App',

  setup(props, context) {
    // 1. Get a reference to the model class);

    const { logout } = useAuth();
    const { $store, $router } = context.root;

    const isUserAuthenticated = computed(() => {
      if (store.state.auth.user) return true;
      return false;
    });
    console.log(store.state.auth.user);

    // watch(
    //   () => $store.state.auth.user,
    //   (user) => {
    //     console.log('watched');
    //     const toRouteName = user ? 'projects' : 'login';
    //     $router.replace({ name: toRouteName });
    //   }
    // );

    router.beforeEach(async (to, from, next) => {
      if (!isUserAuthenticated) {
        next({ name: 'login' });
      } else if (isUserAuthenticated) {
        next({ name: 'projects' });
      } else {
        next();
      }
      // validate URL
      const link = router.resolve(to.path);
      if (link.resolved?.matched.length === 0) {
        next('/404');
        return;
      }
      next();
    });

    onMounted(() => {
      $store.dispatch('auth/authenticate').catch((error) => {
        if (!error.message.includes('Could not find stored JWT')) {
          console.error(error);
          $router.replace({ name: 'login' });
          if (isUserAuthenticated) {
            $router.push('/projects');
          }
        }
      });
    });

    const logOut = async () => {
      await logout();
      $router.replace({ name: 'login' });
    };

    return {
      logOut,
      isUserAuthenticated,
    };
  }
});

</script>
