import type { SecurityEvent } from "../../models/index.js";

export interface ISecurityEventRepository {
  create(data: SecurityEvent): Promise<void>;
}
