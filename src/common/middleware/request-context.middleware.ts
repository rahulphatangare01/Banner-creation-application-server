import type { NextFunction, Request, Response } from "express";

import { runWithRequestContext } from "../context/request-context.js";
import type { RequestContext } from "../context/request-context.types.js";
import {
  generateSpanId,
  generateTraceId,
  generateRequestId,
} from "../utils/id-generator.js";

const getPlatform = (
  userAgent?: string,
): "WEB" | "ANDROID" | "IOS" | "UNKNOWN" => {
  if (!userAgent) {
    return "UNKNOWN";
  }

  const value = userAgent.toLowerCase();

  if (value.includes("android")) {
    return "ANDROID";
  }

  if (
    value.includes("iphone") ||
    value.includes("ipad") ||
    value.includes("ios")
  ) {
    return "IOS";
  }

  return "WEB";
};

// export const requestContextMiddleware = (
//   req: Request,
//   _res: Response,
//   next: NextFunction,
// ): void => {
//   const context: RequestContext = {
//     requestId: generateRequestId(),
//     traceId: generateTraceId(),
//     spanId: generateSpanId(),
//     // requestStartedAt: Date.now(),
//   };

//   runWithRequestContext(context, () => {
//     res.setHeader("X-Request-ID", context.requestId);
//     res.setHeader("X-Trace-ID", context.traceId);

//     next();
//   });
// };

export const requestContextMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const requestId = req.header("x-request-id") || generateRequestId();

  const traceId = req.header("x-trace-id") || generateTraceId();

  const spanId = generateSpanId();

  const userAgent = req.header("user-agent");

  const forwardedFor = req.header("x-forwarded-for");

  const ipAddress = forwardedFor?.split(",")[0]?.trim() || req.ip;

  const context = {
    requestId,
    traceId,
    spanId,

    ipAddress,
    userAgent,

    platform: getPlatform(userAgent),

    requestStartedAt: new Date(),
  };

  runWithRequestContext(context, next);
};
