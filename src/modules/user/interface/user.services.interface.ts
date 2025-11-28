import { IUserCreateDto, IUserResponseDto, IUserUpdateDto } from './dtos';

export interface IUserService {
  create(data: IUserCreateDto): Promise<IUserResponseDto>;
  get(id: string): Promise<IUserResponseDto>;
  update(id: string, data: IUserUpdateDto): Promise<IUserResponseDto>;
  delete(id: string): Promise<IUserResponseDto>;
}
