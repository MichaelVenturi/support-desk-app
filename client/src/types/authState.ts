export interface IAuthState {
  user?: unknown;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
