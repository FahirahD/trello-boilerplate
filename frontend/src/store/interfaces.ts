import AuthState, { UserState, BoardState } from '@/shared/types/auth';

export default interface RootState {
  auth: AuthState;
  user: UserState;
  boards:BoardState;
}
