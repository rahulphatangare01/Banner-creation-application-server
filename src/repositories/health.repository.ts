import { pool } from "../database/connection.js";

export class HealthRepository {
  async checkdatabase(): Promise<boolean> {
    const [rows] = await pool.query("SELECT 1");
    return Array.isArray(rows);
  }
}
