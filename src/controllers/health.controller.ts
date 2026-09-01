import type { Request, Response, NextFunction } from "express";
import { HealthService } from "../services/health.service.js";

export class HealthController {
  private readonly healthService: HealthService;
  constructor() {
    this.healthService = new HealthService();
  }
  getHeath = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.healthService.getHealthStatus();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
