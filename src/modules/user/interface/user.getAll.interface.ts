import { Role } from '@prisma/client';

export interface IUserGetAllDto {
  users: {
    id: string;
    email: string;
    role: Role;
    name: string;
    lastName: string;
    phoneNumber?: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
