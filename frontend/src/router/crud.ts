// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/projects',
    name: 'projects',
    props: true,
    meta: { title: 'Demo' },
    component: lazyLoad('features/Crud/views/Crud.vue'),
  },
]);
