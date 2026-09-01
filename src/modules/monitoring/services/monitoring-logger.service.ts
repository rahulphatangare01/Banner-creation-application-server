import {
  ApiRequestLogSchema,
  UserActivityEventSchema,
  AuditLogSchema,
  SecurityEventSchema,
} from "../models/index.js";
import { getRequestContext } from "../../../common/context/index.js";

import type {
  ApiRequestLog,
  UserActivityEvent,
  AuditLog,
  SecurityEvent,
} from "../models/index.js";
import {
  ApiRequestLogRepository,
  UserActivityEventRepository,
  AuditLogRepository,
  SecurityEventRepository,
} from "../repositories/index.js";
import type { IMonitoringLoggerService } from "./interfaces/index.js";

export class monitoringLoggerService implements IMonitoringLoggerService {
  private readonly apiRequestLogRepository: ApiRequestLogRepository;
  private readonly userActivityEventRepository: UserActivityEventRepository;
  private readonly auditLogRepository: AuditLogRepository;
  private readonly securityEventRepository: SecurityEventRepository;

  /**
   * Get common request information.
   */
  private getContextData() {
    const context = getRequestContext();

    return {
      requestId: context?.requestId,
      traceId: context?.traceId,
      spanId: context?.spanId,

      userId: context?.userId,
      sessionId: context?.sessionId,
      deviceId: context?.deviceId,

      ipAddress: context?.ipAddress,
      countryCode: context?.countryCode,

      platform: context?.platform,
      userAgent: context?.userAgent,

      requestStartedAt: context?.requestStartedAt,
    };
  }

  constructor() {
    this.apiRequestLogRepository = new ApiRequestLogRepository();
    this.userActivityEventRepository = new UserActivityEventRepository();
    this.auditLogRepository = new AuditLogRepository();
    this.securityEventRepository = new SecurityEventRepository();
  }

  // Log API request.

  async logApiRequest(data: ApiRequestLog): Promise<void> {
    const context = this.getContextData();
    const logData = {
      ...data,
      requestId: data.requestId || context.requestId,

      traceId: data.traceId || context.traceId,

      spanId: data.spanId || context.spanId,

      userId: data.userId ?? context.userId,

      sessionId: data.sessionId ?? context.sessionId,

      deviceId: data.deviceId ?? context.deviceId,
      ipAddress: data.ipAddress ?? context.ipAddress,

      countryCode: data.countryCode ?? context.countryCode,

      platform: data.platform ?? context.platform,

      userAgent: data.userAgent ?? context.userAgent,

      requestStartedAt: data.requestStartedAt || context.requestStartedAt,

      completedAt: data.completedAt || new Date(),
    };
    const validatedData = ApiRequestLogSchema.parse(logData);
    await this.apiRequestLogRepository.create(validatedData);
  }

  // log meaningful user activity.

  async logUserActivity(data: UserActivityEvent): Promise<void> {
    const context = this.getContextData();

    const logData = {
      ...data,

      userId: data.userId ?? context.userId,

      sessionId: data.sessionId ?? context.sessionId,

      deviceId: data.deviceId ?? context.deviceId,

      requestId: data.requestId ?? context.requestId,

      traceId: data.traceId ?? context.traceId,

      spanId: data.spanId ?? context.spanId,

      ipAddress: data.ipAddress ?? context.ipAddress,

      countryCode: data.countryCode ?? context.countryCode,
    };
    const validatedData = UserActivityEventSchema.parse(logData);
    await this.userActivityEventRepository.create(validatedData);
  }

  // log Auditable actions

  async logAudit(data: AuditLog): Promise<void> {
    const context = this.getContextData();

    const logData = {
      ...data,

      actorUserId: data.actorUserId ?? context.userId,

      actorSessionId: data.actorSessionId ?? context.sessionId,

      requestId: data.requestId ?? context.requestId,

      traceId: data.traceId ?? context.traceId,

      spanId: data.spanId ?? context.spanId,

      ipAddress: data.ipAddress ?? context.ipAddress,

      countryCode: data.countryCode ?? context.countryCode,
    };

    const validatedData = AuditLogSchema.parse(logData);
    await this.auditLogRepository.create(validatedData);
  }

  // log security-sensitive events.

  async logSecurityEvent(data: SecurityEvent): Promise<void> {
    const context = this.getContextData();

    const logData = {
      ...data,

      userId: data.userId ?? context.userId,

      sessionId: data.sessionId ?? context.sessionId,

      deviceId: data.deviceId ?? context.deviceId,

      requestId: data.requestId ?? context.requestId,

      traceId: data.traceId ?? context.traceId,

      spanId: data.spanId ?? context.spanId,

      ipAddress: data.ipAddress ?? context.ipAddress,

      countryCode: data.countryCode ?? context.countryCode,
    };

    const validatedData = SecurityEventSchema.parse(logData);
    await this.securityEventRepository.create(validatedData);
  }
}
