import { z } from "zod";
import { IpAddressSchema } from "../../../common/validation/common.schema.js";
// API request result status.

export const ApiResponseStatusSchema = z.enum(["SUCCESS", "FAILURE"]);

export type ApiresponseStatus = z.infer<typeof ApiResponseStatusSchema>;

// Supported client platforms.

export const PlatformSchema = z.enum(["WEB", "ANDROID", "IOS", "UNKNOWN"]);

export type Platfrom = z.infer<typeof PlatformSchema>;

// API request log validation

export const ApiRequestLogSchema = z.object({
  requestId: z.string().min(1).max(100),

  traceId: z.string().min(1).max(100),

  spanId: z.string().min(1).max(100),

  userId: z.string().min(1).max(100).nullable().optional(),

  sessionId: z.string().min(1).max(100).nullable().optional(),

  deviceId: z.string().min(1).max(100).nullable().optional(),

  serviceName: z.string().min(1).max(100),

  environment: z.string().min(1).max(30),

  httpMethod: z
    .string()
    .min(1)
    .max(10)
    .transform((value) => value.toUpperCase()),

  requestPath: z.string().min(1).max(500),
  routePattern: z.string().min(1).max(500).nullable().optional(),

  statusCode: z.number().int().min(100).max(559),

  responseStatus: ApiResponseStatusSchema,

  durationMs: z.number().int().min(0),

  ipAddress: IpAddressSchema.nullable().optional(),
  countryCode: z.string().length(2).toUpperCase().nullable().optional(),

  platform: PlatformSchema.default("UNKNOWN"),

  userAgent: z.string().max(1000).nullable().optional(),

  errorCode: z.string().max(100).nullable().optional(),

  errorMessage: z.string().max(1000).nullable().optional(),

  requestStartedAt: z.date(),

  completedAt: z.date(),
});

export type ApiRequestLog = z.infer<typeof ApiRequestLogSchema>;
