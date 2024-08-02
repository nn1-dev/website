import { defineConfig, envField } from "astro/config";
import netlify from "@astrojs/netlify";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: netlify(),
  experimental: {
    env: {
      schema: {
        API_KEY_FEEDBACK: envField.string({
          context: "server",
          access: "secret",
        }),
        API_KEY_TICKETS: envField.string({
          context: "server",
          access: "secret",
        }),
        API_KEY_NEWSLETTER: envField.string({
          context: "server",
          access: "secret",
        }),
      },
    },
  },
  integrations: [
    sentry({
      dsn: "https://9ce758c607ef6a42feb350348185bbec@o4507649139146752.ingest.de.sentry.io/4507649154089040",
      environment: import.meta.env.MODE,
      sourceMapsUploadOptions: {
        project: "website",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
  redirects: {
    "/events/[...eventId]/event": "/events/[...eventId]/event.ics",
  },
});
