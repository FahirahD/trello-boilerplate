import { Id } from './commons';
export interface BaseModelInterface {
  _id: Id;
}

export interface UserInterface extends BaseModelInterface {
  email: string;
  user:string;
  displayName:string;
  password: string;
}
