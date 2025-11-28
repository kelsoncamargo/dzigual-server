import { UserDomain } from '../entities/user.entities';
import { IUserCreateDto } from './dtos';

export interface IUserRepo {
  create(data: IUserCreateDto): Promise<UserDomain>;
  get(id: string): Promise<UserDomain | null>;
  update(id: string, data: Partial<UserDomain>): Promise<UserDomain>;
  delete(id: string): Promise<UserDomain>;
  findByEmail(email: string): Promise<UserDomain | null>;
}
