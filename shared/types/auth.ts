export interface LoginPayload {
  email: string;
  password: string;
  strategy: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export default interface AuthState {
  isAuthenticatePending: boolean;
  user:UserState;
}

export interface UserState {
  _id: string;
}
