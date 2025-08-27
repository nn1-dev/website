import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://34ed16507ec802cbbb8fef5c7be8b43b@o4507649139146752.ingest.de.sentry.io/4507873164066896",
  environment: process.env.NODE_ENV,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  sourceMapsUploadOptions: {
    project: "website",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  },
  sendDefaultPii: true,
});
