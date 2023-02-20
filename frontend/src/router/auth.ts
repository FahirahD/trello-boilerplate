// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/logins',
    name: 'Login',
    meta: { title: 'Login' },
    component: lazyLoad('features/Auth/views/Login.vue'),
  },
]);
