import Redis from 'ioredis';
import { ICacheProvider } from '../cache.provider.interface';

export class RedisCacheProvider implements ICacheProvider {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,

      retryStrategy: times => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.client.on('error', err => {
      console.error('Redis Connection Error:', err);
    });

    this.client.on('connect', () => {});
  }

  async save(key: string, value: string, timeInSeconds: number): Promise<void> {
    try {
      await this.client.set(key, value, 'EX', timeInSeconds);
    } catch (error) {
      console.error(`Error saving key ${key} to Redis:`, error);
      throw new Error('Cache service unavailable');
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error(`Error getting key ${key} from Redis:`, error);
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error(`Error deleting key ${key} from Redis:`, error);
    }
  }
}
