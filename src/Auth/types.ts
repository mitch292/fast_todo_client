export type UserInCreate = {
  username: string;
  password: string;
  //   TODO: add password confirmation
};

export type UserInLogin = {
  username: string;
  password: string;
};

export type Token = {
  accessToken: string;
  tokenType: string;
};

export enum AUTH_STATUS {
  EMPTY = "EMPTY",
  BUSY = "BUSY",
  AUTHENTICATED = "AUTHENTICATED",
  ERROR = "ERROR",
}
