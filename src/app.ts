import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { requestContextMiddleware } from "./common/middleware/request-context.middleware.js";
export const createApp = (): Application => {
  const app = express();

  /*
   * Security Middleware
   */
  app.use(helmet());

  /*
   * CORS Configration
   */
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  /**
   * Request context must be one of the first middlewares.
   *
   * All following middleware and routes can access:
   * requestId, traceId, spanId
   */

  app.use(requestContextMiddleware);
  /*
   * Request Body Middleware
   */
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  /*
   * Application Routes
   */
  app.use("/api", routes);

  // Must be after all routes
  app.use(notFoundMiddleware);
  /*
   * Global Error Handler
   * Must be the last middleware
   */
  app.use(errorMiddleware);
  return app;
};
