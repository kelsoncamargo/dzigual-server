export interface IJwtPayload {
  id: string;
  email: string;
  [key: string]: any; // to allow future expansion, like "companyId", "permissions"
}
