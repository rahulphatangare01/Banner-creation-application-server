import { HealthRepository } from "../repositories/health.repository.js";

export class HealthService {
  private readonly healthRepository: HealthRepository;

  constructor() {
    this.healthRepository = new HealthRepository();
  }
  async getHealthStatus() {
    const databaseConnected = await this.healthRepository.checkdatabase();
    return {
      success: true,
      database: databaseConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
    };
  }
}
