import { RateLimitConfig } from "../types";

export const rateLimitConfig: RateLimitConfig = {
  default: {
    interval: 60 * 1000, // 1 minute
    allowedRequests: 100
  },
  strict: {
    interval: 60 * 1000,
    allowedRequests: 10
  },
  auth: {
    interval: 5 * 60 * 1000, // 5 minutes
    allowedRequests: 20
  }
};

export const getRateLimitTier = (path: string) => {
  if (path.startsWith("/api/auth")) return "auth";
  if (path.startsWith("/api/")) return "default";
  return "strict";
};