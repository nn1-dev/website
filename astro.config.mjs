import { defineConfig, envField } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: netlify(),
  experimental: {
    env: {
      schema: {
        API_KEY: envField.string({
          context: "server",
          access: "secret",
        }),
      },
    },
  },
});
