export interface ILogin {
  username: string;
  password: string;
}
export interface ILoginResponse {
  access_token: string;
}
export interface ILoginError {
  error: string;
}
