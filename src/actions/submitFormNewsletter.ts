import * as Sentry from "@sentry/astro";
import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";

import { API_AUTH, API_URL } from "astro:env/server";

export default defineAction({
  accept: "form",
  input: z
    .object({
      email: z.string().email(),
    })
    .strict(),
  handler: async (input) => {
    if (!API_URL || !API_AUTH) {
      Sentry.captureException("API_AUTH is not defined.");
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "API_URL or API_AUTH is not defined.",
      });
    }

    const response = await fetch(`${API_URL}/subscribers`, {
      method: "POST",
      headers: { Authorization: `Bearer ${API_AUTH}` },
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

    const responseJson:
      | {
          status: "success";
          data: {
            id: string;
            email: string;
            confirmed: number;
            confirmation_token: string | null;
            created_at: string;
          };
        }
      | {
          status: "error";
          data: string;
        } = await response.json();

    if (responseJson.status === "error") {
      Sentry.captureException(responseJson.data);
      throw new ActionError({
        code: "BAD_REQUEST",
        message: responseJson.data,
      });
    }

    return responseJson.data.id;
  },
});
