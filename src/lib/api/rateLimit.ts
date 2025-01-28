// lib/api/rateLimit.ts
import Redis from 'ioredis';
import { RateLimiterRedis, RateLimiterMemory } from 'rate-limiter-flexible';

let rateLimiter: RateLimiterRedis | RateLimiterMemory;

if (process.env.REDIS_URL) {
  const redisClient = new Redis(process.env.REDIS_URL);
  
  rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rl_',
    points: process.env.API_RATE_LIMIT ? parseInt(process.env.API_RATE_LIMIT) : 100,
    duration: 60,
    blockDuration: 60 * 5,
  });
} else {
  rateLimiter = new RateLimiterMemory({
    points: 100,
    duration: 60,
  });
}

export const apiRateLimiter = async (req: any, res: any) => {
  const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
  
  try {
    await rateLimiter.consume(ip);
  } catch (rejRes) {
    res.setHeader('Retry-After', Math.ceil(rejRes.msBeforeNext / 1000));
    res.status(429).json({ error: 'Too Many Requests' });
    return false;
  }
  return true;
};