import store from "../redux/store";

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

interface IStateStatus {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  token: string | null;
}

export interface IAuthState extends IStateStatus {
  user: IUser | null;
}

export interface ITicket {
  product: string;
  description: string;
  status: string;
}

export interface ITicketState extends IStateStatus {
  tickets: ITicket[];
  ticket: ITicket | null;
}
