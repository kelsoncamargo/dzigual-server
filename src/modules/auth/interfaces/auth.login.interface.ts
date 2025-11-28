export interface IAuthLogin {
  email: string;
  password: string;
}

export interface IAuthLoginDto {
  newToken: string;
  newRefreshToken: string;
}
