import { MessageMap } from '../../../shared/messages';
import pagination from '../../../shared/pagination';
import {
  IResourceGetAllDto,
  IResourceRepo,
  IResourceGetAllResponseDto,
  IResourceGetResponseDto,
  IResourceService,
} from '../interface';

export class ResourceService implements IResourceService {
  constructor(private readonly repository: IResourceRepo) {}

  async get(id: string): Promise<IResourceGetAllResponseDto> {
    const fullDataBreeds = await this.repository.findAll();
    const normalizedId = id.toLowerCase();

    if (!(normalizedId in fullDataBreeds)) {
      throw new Error(`breed_${id}_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
    }

    const resourceImgUrl = await this.repository.getUrlImage(normalizedId);
    const countries = fullDataBreeds[normalizedId];

    if (countries.length === 0) {
      return {
        breed: normalizedId,
        imgUrl: resourceImgUrl,
        countries: `${MessageMap.ERROR.DEFAULT.NOT_FOUND}_country_race`,
      };
    }

    return {
      breed: normalizedId,
      imgUrl: resourceImgUrl,
      countries: countries,
    };
  }

  async getAll({
    page,
    limit,
  }: IResourceGetAllDto): Promise<IResourceGetResponseDto> {
    const fullDataBreeds = await this.repository.findAll();
    const fullBreeds = Object.keys(fullDataBreeds);

    return pagination({ page, limit, data: fullBreeds });
  }
}
