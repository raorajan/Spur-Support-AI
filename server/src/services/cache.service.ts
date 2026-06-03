import { redisClient } from "../config/redis";

const DEFAULT_TTL = 300; // 5 minutes

export class CacheService {
  static async get<T>(key: string): Promise<T | null> {
    try {
      if (!redisClient.isOpen) return null;
      const cached = await redisClient.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  static async set(key: string, data: any, ttl = DEFAULT_TTL): Promise<void> {
    try {
      if (!redisClient.isOpen) return;
      await redisClient.set(key, JSON.stringify(data), { EX: ttl });
    } catch {
      // Redis write failure is non-critical, we just skip caching
    }
  }

  static async invalidate(key: string): Promise<void> {
    try {
      if (!redisClient.isOpen) return;
      await redisClient.del(key);
    } catch {
      // Non-critical
    }
  }

  static async invalidatePattern(pattern: string): Promise<void> {
    try {
      if (!redisClient.isOpen) return;
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
    } catch {
      // Non-critical
    }
  }
}
