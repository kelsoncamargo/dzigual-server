export interface UserDomain {
  id: string;
  email: string;
  fullName: string;
  password?: string;
  phoneNumber?: string | null;
  active: boolean;
  createAt: Date | string;
  updatedAt: Date | string;
}
