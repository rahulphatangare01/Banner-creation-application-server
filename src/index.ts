import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./database/connection.js";
import { logger } from "./utils/logger.js";
const startServer = async (): Promise<void> => {
  try {
    /*
     * Initialize Database
     */
    await connectDatabase();

    /*
     * Create Application
     */
    const app = createApp();
    /*
     * Start HTTP Server
     */
    const server = app.listen(env.PORT, () => {
      logger.info(
        `Server running on port ${env.PORT} in ${env.NODE_ENV} environment`,
      );
    });
    /*
     * Graceful Shutdown
     */
    const shutdown = async (signal: string): Promise<void> => {
      logger.info(`${signal} received. Starting graceful shutdown...`);
      server.close(async () => {
        try {
          await disconnectDatabase();
          logger.info("Application shutdown completed successfully");
          process.exit(0);
        } catch (error) {
          logger.error("Error during shutdown", error);
          process.exit(1);
        }
      });
    };
    process.on("SIGTERM", () => {
      void shutdown("SIGTERM");
    });
    process.on("SIGINT", () => {
      void shutdown("SIGINT");
    });
  } catch (error) {
    logger.error("Application startup failed", error);
    process.exit(1);
  }
};
void startServer();
