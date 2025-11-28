export interface IResourceRepo {
  findAll(): Promise<any>;
  getUrlImage(normalizedId: string): Promise<string>;
}
