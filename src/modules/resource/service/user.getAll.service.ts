import { getAll as getAllRepo } from '../repo/resource.getAll.repo';
import { MessageMap } from '../../../shared/messages';
import {
  IResourceGet,
  IResourceGetDto,
} from '../interface/user.getAll.interface';
import { resourceRepository } from '../repo/resource.repo';

export const getAll = async ({
  page,
  limit,
  countryFilter,
}: IResourceGet): Promise<IResourceGetDto | any> => {
  const breeds = await resourceRepository.getAll();
};
