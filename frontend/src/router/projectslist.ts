// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { useFind } from 'feathers-vuex';
import { computed } from '@vue/composition-api';
import * as path from 'path';
import axios from 'axios';
import store from '@/store';

export default (lazyLoad) => ([
  {
    path: '/boards/:id',
    props: true,
    meta: { title: 'Demo' },
    component: lazyLoad('features/ProjectsList/views/ProjectsList.vue'),
    // eslint-disable-next-line consistent-return
  //   beforeEnter: async (to, from, next) => {
  //     try {
  //       const res = await axios.get(`http://localhost:3030/boards/${to.params.id}`);
  //       next();
  //     } catch (e) {
  //       next({
  //         name: 'BoardNotFound',
  //         params: {
  //           message: e.response.data.message,
  //         },
  //
  //       });
  //       console.log(to.path.split('/').slice(1));
  //       console.log(e.response.data.message);
  //     }
  //     console.log(to);
  //     // if (store.state.boards.ids.find((e) => e === to.params.id)) {
  //     //   next();
  //     // } else {
  //     //   next({
  //     //     name: 'BoardNotFound',
  //     //
  //     //   });
  //     // }
  //   }
  },

]);
