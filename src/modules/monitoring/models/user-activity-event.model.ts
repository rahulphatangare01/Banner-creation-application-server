import { z } from "zod";
import { IpAddressSchema } from "../../../common/validation/common.schema.js";

export const UserActivityStatusSchema = z.enum(["SUCCESS", "FAILURE"]);

export type UserActivityStatus = z.infer<typeof UserActivityStatusSchema>;

/**
 * Main application activity categories.
 */
export const UserActivityCategorySchema = z.enum([
  "AUTH",
  "USER",
  "PROFILE",
  "BANNER",
  "SUBSCRIPTION",
  "PAYMENT",
  "ADMIN",
  "SYSTEM",
]);

export type UserActivityCategory = z.infer<typeof UserActivityCategorySchema>;

/**
 * User activity event model.
 */
export const UserActivityEventSchema = z.object({
  eventId: z.string().min(1).max(100),

  userId: z.string().min(1).max(100).nullable().optional(),

  sessionId: z.string().min(1).max(100).nullable().optional(),

  deviceId: z.string().min(1).max(100).nullable().optional(),

  requestId: z.string().min(1).max(100).nullable().optional(),

  traceId: z.string().min(1).max(100).nullable().optional(),

  spanId: z.string().min(1).max(100).nullable().optional(),

  eventType: z.string().min(1).max(100),

  eventCategory: UserActivityCategorySchema,

  resourceType: z.string().min(1).max(100).nullable().optional(),

  resourceId: z.string().min(1).max(100).nullable().optional(),

  eventStatus: UserActivityStatusSchema,

  metadata: z.record(z.string(), z.unknown()).nullable().optional(),

  ipAddress: IpAddressSchema.nullable().optional(),

  countryCode: z.string().length(2).toUpperCase().nullable().optional(),

  createdAt: z.date(),
});

export type UserActivityEvent = z.infer<typeof UserActivityEventSchema>;
