import { ServiceState } from 'feathers-vuex';
import feathersClient, {
  makeServicePlugin,
  BaseModel,
} from '@/feathers-client';
import { ColumnInterface } from '@/shared/types/columns';
import hooks from './service.hooks';

const modelName = 'Column';
const servicePath = 'columns';

export class Column extends BaseModel {
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = modelName;

  static instanceDefaults(): ColumnInterface {
    return {
      name: null,
      boardId: null
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Column {}

declare module 'feathers-vuex' {
  interface FeathersVuexStoreState {
    [servicePath]: ServiceState<Column>
  }
}

declare module 'src/store' {
  interface ApiModels {
    [modelName]: typeof Column
  }
}

const servicePlugin = makeServicePlugin({
  Model: Column,
  service: feathersClient.service(servicePath),
  servicePath
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks(hooks);
export default servicePlugin;
