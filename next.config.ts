import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { withSentryConfig } from "@sentry/nextjs";

const r2Hostname = process.env.R2_PUBLIC_URL
  ? new URL(process.env.R2_PUBLIC_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: r2Hostname ? [{ protocol: "https", hostname: r2Hostname }] : [],
  },
};

const configWithPayload = withPayload(nextConfig);

// Only wrap with Sentry once a DSN is configured — otherwise this stays a
// no-op so the build doesn't need Sentry org/project credentials to run.
export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(configWithPayload, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      silent: true,
      disableLogger: true,
    })
  : configWithPayload;
