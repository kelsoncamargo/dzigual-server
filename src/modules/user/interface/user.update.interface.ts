import { Role } from '@prisma/client';

export interface IUserUpdate {
  email: string;
  newEmail?: string;
  password?: string;
  role?: Role;
  name?: string;
  lastName?: string;
  phoneNumber?: string | null | undefined;
}

export interface IUserUpdateDto {
  id: string;
  email: string;
  role: Role;
  name: string;
  lastName: string;
  phoneNumber?: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
}
