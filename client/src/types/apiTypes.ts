// for this project, this file may not be necessary, and I could easily just colocate these.  But why not
// requests
export interface IUserPayload {
  email: string;
  password: string;
}

export interface INewUserPayload extends IUserPayload {
  name: string;
}

export interface ITicketPayload {
  product: string;
  description: string;
}
