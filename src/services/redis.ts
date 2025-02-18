import Redis from 'ioredis';
import { env } from '../utils/env';

class RedisService {
  private static instance: RedisService;
  private redis: Redis;

  private constructor() {
    this.redis = new Redis(env.REDIS_URL);

    this.redis.on('error', (error) => {
      console.error('Redis Error:', error);
    });

    this.redis.on('connect', () => {
      console.log('Connected to Redis');
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  // Generic get/set methods
  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.setex(key, ttl, value);
    } else {
      await this.redis.set(key, value);
    }
  }

  // Cache message history for each conversation
  async cacheMessages(conversationId: string, messages: any[], ttl: number = 3600): Promise<void> {
    await this.redis.setex(
      `messages:${conversationId}`,
      ttl,
      JSON.stringify(messages)
    );
  }

  async getMessages(conversationId: string): Promise<any[] | null> {
    const cached = await this.redis.get(`messages:${conversationId}`);
    return cached ? JSON.parse(cached) : null;
  }

  // Cache agent state
  async cacheAgentState(agentId: string, state: any, ttl: number = 3600): Promise<void> {
    await this.redis.setex(
      `agent:${agentId}:state`,
      ttl,
      JSON.stringify(state)
    );
  }

  async getAgentState(agentId: string): Promise<any | null> {
    const cached = await this.redis.get(`agent:${agentId}:state`);
    return cached ? JSON.parse(cached) : null;
  }

  // Cache market data
  async cacheMarketData(symbol: string, data: any, ttl: number = 300): Promise<void> {
    await this.redis.setex(
      `market:${symbol}`,
      ttl,
      JSON.stringify(data)
    );
  }

  async getMarketData(symbol: string): Promise<any | null> {
    const cached = await this.redis.get(`market:${symbol}`);
    return cached ? JSON.parse(cached) : null;
  }

  // Cache technical analysis results
  async cacheTechnicalAnalysis(symbol: string, timeframe: string, data: any, ttl: number = 900): Promise<void> {
    await this.redis.setex(
      `ta:${symbol}:${timeframe}`,
      ttl,
      JSON.stringify(data)
    );
  }

  async getTechnicalAnalysis(symbol: string, timeframe: string): Promise<any | null> {
    const cached = await this.redis.get(`ta:${symbol}:${timeframe}`);
    return cached ? JSON.parse(cached) : null;
  }

  // Cache API responses
  async cacheApiResponse(endpoint: string, params: string, data: any, ttl: number = 60): Promise<void> {
    const key = `api:${endpoint}:${params}`;
    await this.redis.setex(key, ttl, JSON.stringify(data));
  }

  async getApiResponse(endpoint: string, params: string): Promise<any | null> {
    const key = `api:${endpoint}:${params}`;
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  // Cache user preferences
  async cacheUserPreferences(userId: string, preferences: any): Promise<void> {
    await this.redis.set(
      `user:${userId}:preferences`,
      JSON.stringify(preferences)
    );
  }

  async getUserPreferences(userId: string): Promise<any | null> {
    const cached = await this.redis.get(`user:${userId}:preferences`);
    return cached ? JSON.parse(cached) : null;
  }

  // Clear specific cache
  async clearCache(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  // Utility method to handle Redis operations with retry
  async withRetry<T>(operation: () => Promise<T>, maxRetries: number = 3): Promise<T> {
    let lastError: Error | null = null;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
    
    throw lastError;
  }
}

export const redisService = RedisService.getInstance();
