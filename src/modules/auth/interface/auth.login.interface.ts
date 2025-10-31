export interface IAuthLogin {
  email: string;
  password: string;
}

export interface IAuthLoginDto {
  token: string;
  refreshToken: string;
}
