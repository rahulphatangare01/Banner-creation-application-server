import type {
  ApiRequestLog,
  UserActivityEvent,
  AuditLog,
  SecurityEvent,
} from "../../models/index.js";

export interface IMonitoringLoggerService {
  logApiRequest(data: ApiRequestLog): Promise<void>;
  logUserActivity(data: UserActivityEvent): Promise<void>;
  logAudit(data: AuditLog): Promise<void>;
  logSecurityEvent(data: SecurityEvent): Promise<void>;
}
