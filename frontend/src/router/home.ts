// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/home',
    meta: { title: 'Demo' },
    component: lazyLoad('features/Home/views/Main.vue'),
  },
]);
