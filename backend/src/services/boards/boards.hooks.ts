import { HooksObject } from '@feathersjs/feathers';

const wait = (context:any) => new Promise<any>((resolve) => {
  setTimeout(() => {
    resolve(context);
  }, 2 * 1000);
});

export default {
  before: {
    all: [wait],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
