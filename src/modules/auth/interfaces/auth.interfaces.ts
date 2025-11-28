import { UserDomain } from '../../user/entities/user.entities';

export interface IAuthRepository {
  findByEmail(email: string): Promise<UserDomain | null>;
}
