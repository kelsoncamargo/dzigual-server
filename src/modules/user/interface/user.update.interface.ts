export interface IUserUpdate {
  id: string;
  newEmail?: string;
  password?: string;
  fullName: string;
  phoneNumber?: string | null | undefined;
}

export interface IUserUpdateDto {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
}
