import mysql from "mysql2/promise";
import { databaseConfig } from "../config/database.js";
import { logger } from "../utils/logger.js";

/**
 * Shared MySQL connection pool.
 *
 * This pool should be used by repositories across the application.
 */
export const pool = mysql.createPool(databaseConfig);

// export const db = mysql.createPool(databaseConfig);

export const connectDatabase = async (): Promise<void> => {
  let connection;

  try {
    connection = await pool.getConnection();

    await connection.ping();

    logger.info("MYSQL database connected successfully");
  } catch (error) {
    logger.error("Failed to connect to MYSQL database", error);

    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await pool.end();
    logger.info("MYSQL database connection closed successfully");
  } catch (error) {
    logger.error("Failed to close MYSQL database coonection", error);
    throw error;
  }
};
