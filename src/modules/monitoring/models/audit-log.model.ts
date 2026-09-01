import { z } from "zod";
import { IpAddressSchema } from "../../../common/validation/common.schema.js";

/**
 * Audit log model.
 */
export const AuditLogSchema = z.object({
  auditId: z.string().min(1).max(100),

  /**
   * Who performed the action?
   */
  actorUserId: z.string().min(1).max(100).nullable().optional(),

  actorSessionId: z.string().min(1).max(100).nullable().optional(),

  /**
   * Role snapshot at execution time.
   */
  actorRole: z.string().min(1).max(100).nullable().optional(),

  /**
   * Example:
   * USER_STATUS_CHANGED
   * USER_SUSPENDED
   * ROLE_ASSIGNED
   */
  action: z.string().min(1).max(100),

  /**
   * USER
   * ROLE
   * PERMISSION
   * SUBSCRIPTION
   */
  targetType: z.string().min(1).max(100),

  targetId: z.string().min(1).max(100).nullable().optional(),

  /**
   * State before modification.
   */
  beforeData: z.record(z.string(), z.unknown()).nullable().optional(),

  /**
   * State after modification.
   */
  afterData: z.record(z.string(), z.unknown()).nullable().optional(),

  reason: z.string().max(1000).nullable().optional(),

  requestId: z.string().min(1).max(100).nullable().optional(),

  traceId: z.string().min(1).max(100).nullable().optional(),

  spanId: z.string().min(1).max(100).nullable().optional(),

  ipAddress: IpAddressSchema.nullable().optional(),

  countryCode: z.string().length(2).toUpperCase().nullable().optional(),

  createdAt: z.date(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;
