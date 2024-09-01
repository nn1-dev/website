import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import * as Sentry from "@sentry/astro";
import { API_HEADERS_NEWSLETTER, API_URL_NEWSLETTER } from "../constants";

export default defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
  }),
  handler: async (input) => {
    const response = await fetch(API_URL_NEWSLETTER, {
      method: "POST",
      ...API_HEADERS_NEWSLETTER,
      body: JSON.stringify({
        email: input.email,
      }),
    });

    if (!response.ok) {
      Sentry.captureException("Failed to subscribe member.");
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Failed to subscribe member.",
      });
    }

    return "ok";
  },
});
