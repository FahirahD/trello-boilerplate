// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/projectslist',
    name: 'ProjectsList',
    meta: { title: 'Demo' },
    component: lazyLoad('features/ProjectsList/views/ProjectsList.vue'),
  },
]);
