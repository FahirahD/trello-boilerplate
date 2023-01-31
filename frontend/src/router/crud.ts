// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/crud',
    component: lazyLoad('features/Crud/views/Crud.vue'),
  },
]);
