// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/login',
    name: 'login',
    props: true,
    meta: { title: 'Demo' },
    component: lazyLoad('features/User/views/Login.vue'),
  },
]);
