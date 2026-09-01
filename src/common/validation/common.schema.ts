import { z } from "zod";
import { isIP } from "node:net";

/**
 * Validates both IPv4 and IPv6 addresses.
 */
export const IpAddressSchema = z
  .string()
  .trim()
  .refine((value) => isIP(value) !== 0, {
    message: "Invalid IPv4 or IPv6 address",
  });
