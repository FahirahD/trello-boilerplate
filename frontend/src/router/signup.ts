// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (lazyLoad) => ([
  {
    path: '/signup',
    name: 'signup',
    props: true,
    meta: { title: 'Demo' },
    component: lazyLoad('features/User/views/SignUp.vue'),
  },
]);
