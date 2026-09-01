import { z } from "zod";
import { IpAddressSchema } from "../../../common/validation/common.schema.js";

export const SecuritySeveritySchema = z.enum([
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
]);

export type SecuritySeverity = z.infer<typeof SecuritySeveritySchema>;

export const SecurityEventStatusSchema = z.enum([
  "SUCCESS",
  "FAILURE",
  "BLOCKED",
]);

export type SecurityEventStatus = z.infer<typeof SecurityEventStatusSchema>;

/**
 * Security event model.
 */
export const SecurityEventSchema = z.object({
  securityEventId: z.string().min(1).max(100),

  userId: z.string().min(1).max(100).nullable().optional(),

  sessionId: z.string().min(1).max(100).nullable().optional(),

  deviceId: z.string().min(1).max(100).nullable().optional(),

  eventType: z.string().min(1).max(100),

  severity: SecuritySeveritySchema,

  eventStatus: SecurityEventStatusSchema,

  requestId: z.string().min(1).max(100).nullable().optional(),

  traceId: z.string().min(1).max(100).nullable().optional(),

  spanId: z.string().min(1).max(100).nullable().optional(),

  ipAddress: IpAddressSchema.nullable().optional(),

  countryCode: z.string().length(2).toUpperCase().nullable().optional(),

  metadata: z.record(z.string(), z.unknown()).nullable().optional(),

  createdAt: z.date(),
});

export type SecurityEvent = z.infer<typeof SecurityEventSchema>;
