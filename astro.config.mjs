import { defineConfig, envField } from "astro/config";
import netlify from "@astrojs/netlify";
import sentry from "@sentry/astro";
import fs from "node:fs";
import path from "node:path";

import sitemap from "@astrojs/sitemap";

const EXCLUDED_ROUTES = ["https://nn1.dev/newsletter/unsubscribe/"];

//TODO: Check if this stil works after migration to Astro 5
const events = fs
  .readdirSync("./src/data/events")
  .map((file) => path.basename(file, path.extname(file)));

// https://astro.build/config
export default defineConfig({
  site: "https://nn1.dev",
  adapter: netlify(),
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
      //TODO: Is this still needed, potentially not, it may be a legacy
      //since we used to render events apges on the server, not they are statically rendered
      customPages: events.map((event) => `https://nn1.dev/events/${event}/`),
    }),
  ],
});
