import { cleanEnv, str, url, num } from "envalid";

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development"
  }),
  MONGODB_URI: str(),
  NEXTAUTH_SECRET: str(),
  NEXTAUTH_URL: url(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
  GITHUB_CLIENT_ID: str(),
  GITHUB_CLIENT_SECRET: str(),
  SENTRY_DSN: str({ default: "" }),
  REDIS_URL: str({ default: "" }),
  API_RATE_LIMIT: num({ default: 100 }),
  WS_MAX_PAYLOAD: num({ default: 1e6 }) // 1MB
});

export type Environment = typeof env;