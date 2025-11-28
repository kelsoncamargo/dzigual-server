import { IUserCreateDto } from '../interface/dtos';
import { IUserRepo } from '../interface/user.repo.interface';
import prisma from '../../../config/database';
import { MessageMap } from '../../../shared/messages';
import { UserDomain } from '../entities/user.entities';
import { User as PrismaUser } from '@prisma/client';

export class UserPrismaRepo implements IUserRepo {
  private toDomain(prismaUser: PrismaUser): UserDomain {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      fullName: prismaUser.fullName,
      phoneNumber: prismaUser.phoneNumber,
      active: prismaUser.isActive,
      password: prismaUser.password,
      createAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }

  async get(id: string): Promise<UserDomain | null> {
    try {
      const prismaUser = await prisma.user.findUnique({ where: { id } });

      if (!prismaUser) return null;

      return this.toDomain(prismaUser);
    } catch (err) {
      throw new Error(`database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
    }
  }

  async findByEmail(email: string): Promise<UserDomain | null> {
    try {
      const prismaUser = await prisma.user.findUnique({ where: { email } });

      if (!prismaUser) return null;

      return this.toDomain(prismaUser);
    } catch (err) {
      throw new Error(
        `database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}_in_findByEmail`,
      );
    }
  }
  async create(data: IUserCreateDto): Promise<UserDomain> {
    try {
      const { email, fullName, password, phoneNumber } = data;
      const prismaUser = await prisma.user.create({
        data: { email, fullName, password, phoneNumber },
      });

      return this.toDomain(prismaUser);
    } catch (err) {
      throw new Error(
        `database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}_in_user_create`,
      );
    }
  }
  async update(id: string, data: Partial<UserDomain>): Promise<UserDomain> {
    try {
      const prismaUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...data,
        },
      });

      return this.toDomain(prismaUser);
    } catch (err) {
      throw new Error(
        `database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}_in_user_update`,
      );
    }
  }
  async delete(id: string): Promise<UserDomain> {
    try {
      const prismaUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });

      return this.toDomain(prismaUser);
    } catch (err) {
      throw new Error(
        `database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}_in_user_delete`,
      );
    }
  }
}
