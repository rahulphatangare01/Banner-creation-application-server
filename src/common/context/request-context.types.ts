// export interface RequestContext {
//   requestId: string;
//   traceId: string;
//   spanId: string;

//   userId?: string;
//   sessionId?: string;
//   deviceId?: string;

//   requestStartTime: number;
// }

export interface RequestContext {
  requestId: string;
  traceId: string;
  spanId: string;

  userId?: string;
  sessionId?: string;
  deviceId?: string;

  ipAddress?: string;
  countryCode?: string;

  platform: "WEB" | "ANDROID" | "IOS" | "UNKNOWN";

  userAgent?: string;

  requestStartedAt: Date;
}
