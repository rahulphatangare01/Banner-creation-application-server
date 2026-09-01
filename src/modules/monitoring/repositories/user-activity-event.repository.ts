import { pool } from "../../../database/connection.js";

import type { UserActivityEvent } from "../models/index.js";

import type { IUserActivityEventRepository } from "./interfaces/index.js";

export class UserActivityEventRepository implements IUserActivityEventRepository {
  async create(data: UserActivityEvent): Promise<void> {
    const query = `
      INSERT INTO user_activity_events (
        event_id,
        user_id,
        session_id,
        device_id,
        request_id,
        trace_id,
        span_id,
        event_type,
        event_category,
        resource_type,
        resource_id,
        event_status,
        metadata,
        ip_address,
        country_code,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(query, [
      data.eventId,
      data.userId ?? null,
      data.sessionId ?? null,
      data.deviceId ?? null,
      data.requestId ?? null,
      data.traceId ?? null,
      data.spanId ?? null,
      data.eventType,
      data.eventCategory,
      data.resourceType ?? null,
      data.resourceId ?? null,
      data.eventStatus,
      data.metadata ? JSON.stringify(data.metadata) : null,
      data.ipAddress ?? null,
      data.countryCode ?? null,
      data.createdAt,
    ]);
  }
}
