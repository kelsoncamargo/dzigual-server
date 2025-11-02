import api from '../../../config/axios';
import { MessageMap } from '../../../shared/messages';
import { IResourceGetDto } from '../interface/user.get.interface';

export const getAll = async (): Promise<IResourceGetDto> => {
  try {
    const resource = await api.get('https://dog.ceo/api/breeds/list/all');

    const breeds = Object.keys(resource.data.message);

    return { breeds };
  } catch (err) {
    throw new Error(`api_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
  }
};
