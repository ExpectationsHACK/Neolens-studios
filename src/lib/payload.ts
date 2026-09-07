import { getPayload } from "payload";
import config from "@payload-config";

let cached: ReturnType<typeof getPayload> | null = null;

/**
 * Reuses one initialized Payload instance across requests in the same
 * server process instead of re-bootstrapping the config on every call.
 */
export function getCachedPayload() {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
}
