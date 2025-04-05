import store from "../redux/store";

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

interface IStateStatus {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

interface IMongooseObject {
  _id: string;
  createdAt: string;
  updatedAt: string;
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

export interface ITicket extends IMongooseObject {
  product: TicketProduct;
  user: string;
  description: string;
  status: TicketStatus;
}

export interface ITicketState extends IStateStatus {
  tickets: ITicket[];
  ticket: ITicket | null;
  hasChanged: boolean;
}

export interface INote extends IMongooseObject {
  user: string;
  ticket: string;
  text: string;
  isStaff: boolean;
}

export interface INoteState extends IStateStatus {
  notes: INote[];
  ticketId: string;
}
