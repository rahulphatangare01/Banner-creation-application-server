import { pool } from "../../../database/connection.js";

import type { AuditLog } from "../models/index.js";

import type { IAuditLogRepository } from "./interfaces/index.js";

export class AuditLogRepository implements IAuditLogRepository {
  async create(data: AuditLog): Promise<void> {
    const query = `
      INSERT INTO audit_logs (
        audit_id,
        actor_user_id,
        actor_session_id,
        actor_role,
        action,
        target_type,
        target_id,
        before_data,
        after_data,
        reason,
        request_id,
        trace_id,
        span_id,
        ip_address,
        country_code,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(query, [
      data.auditId,
      data.actorUserId ?? null,
      data.actorSessionId ?? null,
      data.actorRole ?? null,
      data.action,
      data.targetType,
      data.targetId ?? null,
      data.beforeData ? JSON.stringify(data.beforeData) : null,
      data.afterData ? JSON.stringify(data.afterData) : null,
      data.reason ?? null,
      data.requestId ?? null,
      data.traceId ?? null,
      data.spanId ?? null,
      data.ipAddress ?? null,
      data.countryCode ?? null,
      data.createdAt,
    ]);
  }
}
