import { IResponseFields } from "./api.types";

export interface IUserCredentials {
  username: string;
  password: string;
}

export interface IUserFromResponse {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdOn: string;
  roles: string[];
}

export interface ILoginResponse extends IResponseFields {
  User: IUserFromResponse;
}