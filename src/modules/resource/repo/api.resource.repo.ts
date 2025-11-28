import api from '../../../config/axios';
import { EXTERNAL_APIS } from '../../../shared/externalApis';
import { MessageMap } from '../../../shared/messages';
import { IResourceRepo } from '../interface';

export class ApiResourceRepo implements IResourceRepo {
  async findAll(): Promise<Object> {
    try {
      const resource = await api.get(EXTERNAL_APIS.DOG_API.GET_ALL);
      return resource.data.message;
    } catch (err) {
      throw new Error(`api_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
    }
  }

  async getUrlImage(normalizedId: string): Promise<string> {
    try {
      const resource = await api.get(
        `${EXTERNAL_APIS.DOG_API.BASE_URL}/breed/${normalizedId}/images/random`,
      );
      return resource.data.message;
    } catch (err) {
      throw new Error(`api_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
    }
  }
}
