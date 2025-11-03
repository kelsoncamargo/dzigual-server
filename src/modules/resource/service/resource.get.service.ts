import { MessageMap } from '../../../shared/messages';
import { resourceRepository } from '../repo/resource.repo';

export const get = async (id: string): Promise<object> => {
  const fullDataBreeds = (await resourceRepository.getAll()) as any;
  const normalizedId = id.toLowerCase();

  if (!(normalizedId in fullDataBreeds)) {
    throw new Error(`rece_'${id}'_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
  }
  const countries = fullDataBreeds[normalizedId];

  if (countries.length === 0) {
    return {
      breed: normalizedId,
      message: 'Não existe país cadastrado para esta raça.',
    };
  }

  return {
    breed: normalizedId,
    countries: countries,
  };
};
