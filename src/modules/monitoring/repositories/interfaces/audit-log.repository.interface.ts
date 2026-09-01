import type { AuditLog } from "../../models/index.js";

export interface IAuditLogRepository {
  create(data: AuditLog): Promise<void>;
}
