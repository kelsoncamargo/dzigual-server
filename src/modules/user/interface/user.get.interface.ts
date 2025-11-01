export interface IUserGet {
  email: string;
}

export interface IUserGetDto {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
