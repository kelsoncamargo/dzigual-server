export interface IUserCreateDto {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface IUserUpdateDto {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
}

export interface IUserResponseDto {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  active: boolean;
}
