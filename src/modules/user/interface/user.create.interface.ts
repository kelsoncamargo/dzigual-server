import { Role } from '@prisma/client';

export interface IUserCreate {
  email: string;
  password: string;
  role: Role;
  name: string;
  lastName: string;
  phoneNumber?: string;
}

export interface IUserCreateDto {
  id: string;
  email: string;
  role: Role;
  name: string;
  lastName: string;
  phoneNumber?: string | null;
}
