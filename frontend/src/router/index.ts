import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from './home';
import Auth from './auth';
import Crud from './crud';
import Login from './login';
import Projectslist from './projectslist';
import Signup from './signup';
import store from '@/store';

Vue.use(VueRouter);

function lazyLoad(view) {
  return () => import(/* webpackChunkName: "[request]" */ `@/${view}`);
}

export const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: () => '/home',
  },
  ...Home(lazyLoad),
  ...Auth(lazyLoad),
  ...Crud(lazyLoad),
  ...Projectslist(lazyLoad),
  ...Login(lazyLoad),
  ...Signup(lazyLoad),
  {
    path: '/unauthenticated',
    name: 'Unauthenticated',
    component: lazyLoad('features/Error/views/Unauthenticated.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: lazyLoad('features/Error/views/NotFound.vue'),
  },
] as RouteConfig[];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.state.auth.user;
  console.log(isAuthenticated);
  console.log(to.matched);
  if (to.matched.length === 0) {
    // The requested route doesn't exist, redirect to 404 page
    next({ name: 'NotFound' });
  } else if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // The user is not authenticated, redirect to login page
    next({ name: 'login' });
  } else if (to.matched.some((record) => record.meta.requiresGuest) && isAuthenticated) {
    // The user is already authenticated, redirect to home page
    next({ name: 'projects' });
  } else {
    // The user is authenticated and the route exists, continue to the requested page
    next();
  }
});
export default router;
