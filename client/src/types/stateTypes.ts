import store from "../redux/store";

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface IAuthState {
  user?: unknown;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
