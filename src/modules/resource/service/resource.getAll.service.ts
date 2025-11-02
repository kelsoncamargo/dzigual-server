import { IResourceGet } from '../interface/user.getAll.interface';
import { resourceRepository } from '../repo/resource.repo';
import pagination from '../../../shared/pagination';
import { ObjectEnumValue } from '@prisma/client/runtime/library';

export const getAll = async ({ page, limit }: IResourceGet): Promise<any> => {
  const fullDataBreeds = await resourceRepository.getAll();
  const fullBreeds = Object.keys(fullDataBreeds);

  const breedsFiltered = pagination({ page, limit, data: fullBreeds });

  return breedsFiltered;
};
