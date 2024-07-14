import { defineConfig, envField } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: netlify(),
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
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
      },
    },
  },
});
