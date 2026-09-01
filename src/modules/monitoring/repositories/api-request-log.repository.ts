import { pool } from "../../../database/connection.js";

import type { ApiRequestLog } from "../models/index.js";

import type { IApiRequestLogRepository } from "./interfaces/index.js";

export class ApiRequestLogRepository implements IApiRequestLogRepository {
  async create(data: ApiRequestLog): Promise<void> {
    const query = `
      INSERT INTO api_request_logs (
        request_id,
        trace_id,
        span_id,
        user_id,
        session_id,
        device_id,
        service_name,
        environment,
        http_method,
        request_path,
        route_pattern,
        status_code,
        response_status,
        duration_ms,
        ip_address,
        country_code,
        platform,
        user_agent,
        error_code,
        error_message,
        request_started_at,
        completed_at,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(query, [
      data.requestId,
      data.traceId,
      data.spanId,
      data.userId ?? null,
      data.sessionId ?? null,
      data.deviceId ?? null,
      data.serviceName,
      data.environment,
      data.httpMethod,
      data.requestPath,
      data.routePattern ?? null,
      data.statusCode,
      data.responseStatus,
      data.durationMs,
      data.ipAddress ?? null,
      data.countryCode ?? null,
      data.platform,
      data.userAgent ?? null,
      data.errorCode ?? null,
      data.errorMessage ?? null,
      data.requestStartedAt,
      data.completedAt,
      new Date(),
    ]);
  }
}
