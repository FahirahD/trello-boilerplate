import AuthState, { UserState } from '@/shared/types/auth';

export default interface RootState {
  auth: AuthState;
  user: UserState;
}
