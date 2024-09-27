import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import * as Sentry from "@sentry/astro";
import { API_HEADERS_FEEDBACK, API_URL_FEEDBACK } from "../constants";

export default defineAction({
  accept: "form",
  input: z.object({
    name: z.string().trim().optional(),
    stack: z.string().trim().optional(),
    who: z.string(),
    interval: z.string(),
    feedback: z.string().trim().optional(),
  }),
  handler: async ({ name, stack, who, interval, feedback }) => {
    const response = await fetch(API_URL_FEEDBACK, {
      method: "POST",
      ...API_HEADERS_FEEDBACK,
      body: JSON.stringify({
        name,
        stack,
        who,
        interval,
        feedback,
      }),
    });

    if (!response.ok) {
      Sentry.captureException("Failed to submit the feedback.");
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Failed to submit the feedback.",
      });
    }

    return "ok";
  },
});
