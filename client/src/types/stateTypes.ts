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
  _id: string;
  email: string;
  name: string;
  token: string | null;
}

export interface IAuthState extends IStateStatus {
  user: IUser | null;
}

type TicketProduct = "iPhone" | "iPad" | "Macbook Pro";

type TicketStatus = "new" | "open" | "closed";

export interface ITicket {
  _id: string;
  product: TicketProduct;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ITicketState extends IStateStatus {
  tickets: ITicket[];
  ticket: ITicket | null;
}
