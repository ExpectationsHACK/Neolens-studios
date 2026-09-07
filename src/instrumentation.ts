import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Payload's Postgres adapter can leave an internal reconnect/retry promise
    // unhandled when the DB is unreachable (e.g. DATABASE_URL not yet
    // configured). Node 24 terminates the process on unhandled rejections by
    // default — the per-request errors are already caught in src/lib/data.ts,
    // so this just stops that one background rejection from killing the server.
    process.on("unhandledRejection", (reason) => {
      console.error("[unhandledRejection]", reason);
    });

    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
