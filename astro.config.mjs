import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sentry from "@sentry/astro";
import fs from "node:fs";
import path from "node:path";

import sitemap from "@astrojs/sitemap";

const EXCLUDED_ROUTES = ["https://nn1.dev/newsletter/unsubscribe/"];

const events = fs
  .readdirSync("./src/data/events")
  .map((file) => path.basename(file, path.extname(file)));

// https://astro.build/config
export default defineConfig({
  site: "https://nn1.dev",
  adapter: cloudflare(),
  env: {
    schema: {
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
  redirects: events.reduce(
    (acc, item) => ({
      ...acc,
      [`/events/${item}/invite`]: `/events/${item}/invite/index.ics`,
    }),
    {},
  ),
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDED_ROUTES.includes(page),
    }),
  ],
});
