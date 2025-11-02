export interface IResourceGet {
  page: number;
  limit: number;
  countryFilter?: string;
}

export interface IResourceGetDto {
  breeds: Array<string>;
}
