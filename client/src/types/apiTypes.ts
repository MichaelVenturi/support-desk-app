// requests
export interface IUserPayload {
  email: string;
  password: string;
}

export interface INewUserPayload extends IUserPayload {
  name: string;
}
