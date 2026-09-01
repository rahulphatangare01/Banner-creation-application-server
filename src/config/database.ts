import { env } from "./env.js";
import type { PoolOptions } from "mysql2/promise";

export const databaseConfig: PoolOptions = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  waitForConnections: true,
  connectionLimit: env.DB_CONNECTION_LIMIT,
  queueLimit: env.DB_QUEUE_LIMIT,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};
