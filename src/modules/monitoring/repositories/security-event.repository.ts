import { pool } from "../../../database/connection.js";

import type { SecurityEvent } from "../models/index.js";

import type { ISecurityEventRepository } from "./interfaces/index.js";

export class SecurityEventRepository implements ISecurityEventRepository {
  async create(data: SecurityEvent): Promise<void> {
    const query = `
      INSERT INTO security_events (
        security_event_id,
        user_id,
        session_id,
        device_id,
        event_type,
        severity,
        event_status,
        request_id,
        trace_id,
        span_id,
        ip_address,
        country_code,
        metadata,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(query, [
      data.securityEventId,
      data.userId ?? null,
      data.sessionId ?? null,
      data.deviceId ?? null,
      data.eventType,
      data.severity,
      data.eventStatus,
      data.requestId ?? null,
      data.traceId ?? null,
      data.spanId ?? null,
      data.ipAddress ?? null,
      data.countryCode ?? null,
      data.metadata ? JSON.stringify(data.metadata) : null,
      data.createdAt,
    ]);
  }
}
