import type { Request, Response, NextFunction } from "express";

import { logger } from "../utils/logger.js";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(error.message, error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
