import { AsyncLocalStorage } from "node:async_hooks";
import type { RequestContext } from "./request-context.types.js";

const requestContextStorage = new AsyncLocalStorage<RequestContext>();

// Runs a callback inside the current request context.

export const runWithRequestContext = <T>(
  context: RequestContext,
  callback: () => T,
): T => {
  return requestContextStorage.run(context, callback);
};

// Return the current request context.
export const getRequestContext = (): RequestContext | undefined => {
  return requestContextStorage.getStore();
};

// Update the current request context.

export const updateRequestContext = (
  updates: Partial<RequestContext>,
  // Omit<RequestContext, "requestId" | "traceId" | "requestStartTime">
): void => {
  const context = requestContextStorage.getStore();

  if (!context) {
    return;
  }
  Object.assign(context, updates);
};

// Returns the current request ID.

export const getRequestId = (): string | undefined => {
  return requestContextStorage.getStore()?.requestId;
};

// Return the current trace ID.

export const getTraceId = (): string | undefined => {
  return requestContextStorage.getStore()?.traceId;
};

// Return the current span ID.

export const getSpanId = (): string | undefined => {
  return requestContextStorage.getStore()?.spanId;
};
