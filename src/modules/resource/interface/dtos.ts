export interface IResourceGetAllDto {
  page?: number;
  limit?: number;
}

export interface IResourceGetResponseDto {
  page?: number;
  limit?: number;
  data?: string[];
}

export interface IResourceGetAllResponseDto {
  breed: string;
  imgUrl?: string;
  countries?: string[] | string;
}
