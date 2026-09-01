import { z } from "zod";
import { IpAddressSchema } from "../../../common/validation/common.schema.js";

export const UserSecurityHistoryActionSchema = z.enum([
  "LOGIN_SUCCESS",
  "LOGIN_FAILED",
  "PASSWORD_CHANGED",
  "PASSWORD_RESET_REQUESTED",
  "PASSWORD_RESET_COMPLETED",
  "NEW_DEVICE_LOGIN",
  "DEVICE_REMOVED",
  "SESSION_CREATED",
  "SESSION_REVOKED",
  "ACCOUNT_LOCKED",
  "ACCOUNT_UNLOCKED",
  "ACCOUNT_SUSPENDED",
  "ACCOUNT_BANNED",
  "ROLE_CHANGED",
  "PERMISSION_CHANGED",
]);

export type UserSecurityHistoryAction = z.infer<
  typeof UserSecurityHistoryActionSchema
>;

export const UserSecurityHistorySchema = z.object({
  historyId: z.string().min(1).max(100),

  userId: z.string().min(1).max(100),

  sessionId: z.string().min(1).max(100).nullable().optional(),

  deviceId: z.string().min(1).max(100).nullable().optional(),

  action: UserSecurityHistoryActionSchema,

  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),

  requestId: z.string().min(1).max(100).nullable().optional(),

  traceId: z.string().min(1).max(100).nullable().optional(),

  ipAddress: IpAddressSchema.nullable().optional(),
  countryCode: z.string().length(2).toUpperCase().nullable().optional(),

  userAgent: z.string().max(1000).nullable().optional(),

  metadata: z.record(z.string(), z.unknown()).nullable().optional(),

  createdAt: z.date(),
});

export type UserSecurityHistory = z.infer<typeof UserSecurityHistorySchema>;
