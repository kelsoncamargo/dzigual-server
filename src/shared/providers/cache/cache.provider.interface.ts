export interface ICacheProvider {
  save(key: string, value: string, timeInSeconds: number): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
}
