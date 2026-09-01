import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

const environment = process.env.NODE_ENV || "local";
const envFileMap: Record<string, string> = {
  local: ".env.local",
  development: ".env.dev",
  test: ".env.test",
  uat: ".env.uat",
  production: ".env.prod",
};

const envFile = envFileMap[environment] || ".env.local";
if (!envFile) {
  throw new Error(`Invalid NODE_ENV: ${environment}`);
}

dotenv.config({
  path: path.resolve(process.cwd(), "config", envFile),
});

const envSchema = z.object({
  NODE_ENV: z.enum(["local", "development", "test", "uat", "production"]),
  PORT: z.coerce.number().default(3000),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().default(3306),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string(),

  DB_CONNECTION_LIMIT: z.coerce.number().min(1).max(100).default(10),
  DB_QUEUE_LIMIT: z.coerce.number().min(0).default(0),

  SERVICE_NAME: z.string().min(1),
  SERVICE_VERSION: z.string().min(1),
  LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal"])
    .default("info"),
});

const parsedEnv = envSchema.safeParse({
  ...process.env,
  NODE_ENV: process.env.NODE_ENV || environment,
});

if (!parsedEnv.success) {
  console.error("❌ Environment validation failed:");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
