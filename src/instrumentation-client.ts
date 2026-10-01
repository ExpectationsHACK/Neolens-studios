// Sentry only reaches the browser when a DSN is configured. The build inlines
// NEXT_PUBLIC_SENTRY_DSN, so without one this branch and its dynamic import
// are dropped and visitors don't download the SDK at all. The trade-off with
// a DSN set: errors in the first moments before the chunk loads aren't sent.
type CaptureTransition = (href: string, navigationType: string) => void;
let captureTransition: CaptureTransition | undefined;

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
    });
    captureTransition = Sentry.captureRouterTransitionStart;
  });
}

export function onRouterTransitionStart(href: string, navigationType: string) {
  captureTransition?.(href, navigationType);
}
