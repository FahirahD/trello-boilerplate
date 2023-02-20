import { HooksObject } from '@feathersjs/feathers';

const wait = (context:any) => new Promise<any>((resolve) => {
  setTimeout(() => {
    resolve(context);
  }, 2 * 1000);
});

const deleted = async (context:any) => {
  const columnsService = context.app.service('columns');
  const tasksService = context.app.service('tasks');
  console.log(context.id);

  const columns = await columnsService.find({ query: { boardId: context.id } });
  // eslint-disable-next-line no-underscore-dangle
  const columnsIds = columns.data.map((a:any) => a._id.toString());
  columnsIds.forEach((a:string) => columnsService.remove(a));

  // console.log(columnsIds);
  // const tasks = columnsIds.map(async (a:string) => tasksService.find(({ query: { columnId: a } })));
  // console.log(tasks);
  // eslint-disable-next-line no-underscore-dangle
  // const tasksIds = tasks.data.map((a:any) => a._id.toString());
  //
  // colunmsIds.forEach((a:string) => columnsService.remove(a));
  // tasksIds.forEach((a:string) => tasksService.remove(a));
  // return context;
};

export default {
  before: {
    all: [wait],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [deleted]
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
