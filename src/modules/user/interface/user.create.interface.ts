export interface IUserCreate {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface IUserCreateDto {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string | null;
}
