export interface IUserCreate {
  email: string;
  password: string;
  name: string;
  lastName: string;
  phoneNumber?: string;
}

export interface IUserCreateDto {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber?: string | null;
}
