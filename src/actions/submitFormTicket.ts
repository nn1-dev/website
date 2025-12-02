import { defineAction, ActionError } from "astro:actions";
import { API_AUTH, API_URL } from "astro:env/server";
import { z } from "astro:schema";
import * as Sentry from "@sentry/astro";

export default defineAction({
  accept: "form",
  input: z
    .object({
      name: z.string().trim(),
      email: z.string().email().trim(),
      newsletter: z.optional(z.string().transform((value) => value === "on")),
      eventId: z.string().transform((value) => parseInt(value)),
      eventName: z.string(),
      eventDate: z.string(),
      eventLocation: z.string(),
      eventInviteUrlIcal: z.string().url(),
      eventInviteUrlGoogle: z.string().url(),
    })
    .strict(),
  handler: async ({
    name,
    email,
    eventId,
    eventName,
    eventLocation,
    eventDate,
    eventInviteUrlIcal,
    eventInviteUrlGoogle,
    newsletter,
  }) => {
    if (!API_URL || !API_AUTH) {
      Sentry.captureException("API_AUTH is not defined.");
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "API_URL or API_AUTH is not defined.",
      });
    }

    const response = await fetch(`${API_URL}/tickets`, {
      method: "POST",
      headers: { Authorization: `Bearer ${API_AUTH}` },
      body: JSON.stringify({
        name,
        email,
        eventId,
        eventName,
        eventDate,
        eventLocation,
        eventInviteUrlIcal,
        eventInviteUrlGoogle,
        subscribe: newsletter || false,
      }),
    });

    if (!response.ok) {
      Sentry.captureException("Failed to create a new ticket.");
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Failed to create a new ticket.",
      });
    }

    const responseJson:
      | {
          status: "success";
          data: {
            id: string;
            event_id: number;
            email: string;
            name: string;
            confirmed: number;
            confirmation_token: string;
            subscribe: number;
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
