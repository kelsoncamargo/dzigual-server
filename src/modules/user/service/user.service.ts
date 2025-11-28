import { MessageMap } from '../../../shared/messages';
import { password } from '../../../shared/password/passowrd';
import { UserDomain } from '../entities/user.entities';
import {
  IUserCreateDto,
  IUserResponseDto,
  IUserUpdateDto,
} from '../interface/dtos';
import { IUserRepo } from '../interface/user.repo.interface';
import { IUserService } from '../interface/user.services.interface';
import { ICacheProvider } from '../../../shared/providers/cache/cache.provider.interface';

export class UserService implements IUserService {
  constructor(
    private readonly repository: IUserRepo,
    private readonly cacheProvider: ICacheProvider,
  ) {}

  private toUserResponseDto(user: UserDomain): IUserResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      active: user.active,
      createdAt: user.createAt,
      updatedAt: user.updatedAt,
    };
  }

  private async ensureUserExists(id: string): Promise<UserDomain> {
    const user = await this.repository.get(id);
    if (!user) {
      throw new Error(`user_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
    }
    return user;
  }

  private async ensureEmailIsUnique(
    email: string,
    ignoreUserId?: string,
  ): Promise<void> {
    const userWithEmail = await this.repository.findByEmail(email);

    if (userWithEmail) {
      if (ignoreUserId && userWithEmail.id === ignoreUserId) {
        return;
      }

      throw new Error(`email_${MessageMap.ERROR.DEFAULT.IN_USE}`);
    }
  }

  async get(id: string): Promise<IUserResponseDto> {
    const user = await this.ensureUserExists(id);
    return this.toUserResponseDto(user);
  }

  async create(data: IUserCreateDto): Promise<IUserResponseDto> {
    await this.ensureEmailIsUnique(data.email);

    const hashedPassword = await password.encryptPassword(data.password);

    const newUser = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    return this.toUserResponseDto(newUser);
  }

  async update(id: string, data: IUserUpdateDto): Promise<IUserResponseDto> {
    await this.ensureUserExists(id);

    if (data.email) {
      await this.ensureEmailIsUnique(data.email, id);
    }

    const payloadToUpdate = { ...data };

    if (data.password) {
      payloadToUpdate.password = await password.encryptPassword(data.password);
    }

    const userDataUpdated = await this.repository.update(id, payloadToUpdate);
    return this.toUserResponseDto(userDataUpdated);
  }

  async delete(id: string): Promise<IUserResponseDto> {
    await this.ensureUserExists(id);

    const userDeleted = await this.repository.delete(id);

    await this.cacheProvider.delete(`access_token:${id}`);
    await this.cacheProvider.delete(`refresh_token:${id}`);

    return this.toUserResponseDto(userDeleted);
  }
}
