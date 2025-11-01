export interface IUserUpdate {
  email: string;
  newEmail?: string;
  password?: string;
  name?: string;
  lastName?: string;
  phoneNumber?: string | null | undefined;
}

export interface IUserUpdateDto {
  id: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber?: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
}
