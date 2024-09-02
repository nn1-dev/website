import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import * as Sentry from "@sentry/astro";
import {
  API_HEADERS_NEWSLETTER,
  API_HEADERS_TICKETS,
  API_URL_NEWSLETTER,
  API_URL_TICKETS,
} from "../constants";

export default defineAction({
  accept: "form",
  input: z.object({
    name: z.string().trim(),
    email: z.string().email().trim(),
    newsletter: z.string().transform((value) => value === "on"),
    eventId: z.string().transform((value) => parseInt(value)),
    eventName: z.string(),
    eventDate: z.string(),
    eventLocation: z.string(),
    eventInviteUrlIcal: z.string().url(),
    eventInviteUrlGoogle: z.string().url(),
  }),
  handler: async ({
    name,
    email,
    newsletter,
    eventId,
    eventName,
    eventLocation,
    eventDate,
    eventInviteUrlIcal,
    eventInviteUrlGoogle,
  }) => {
    const [response] = await Promise.all([
      fetch(API_URL_TICKETS, {
        method: "POST",
        ...API_HEADERS_TICKETS,
        body: JSON.stringify({
          name,
          email,
          eventId,
          eventName,
          eventDate,
          eventLocation,
          eventInviteUrlIcal,
          eventInviteUrlGoogle,
        }),
      }),
      ...(newsletter
        ? [
            fetch(API_URL_NEWSLETTER, {
              method: "POST",
              ...API_HEADERS_NEWSLETTER,
              body: JSON.stringify({
                email,
              }),
            }),
          ]
        : []),
    ]);

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
          statusCode: number;
          data: {
            key: [string, number, string];
          };
          error: null;
        }
      | {
          status: "error";
          statusCode: number;
          data: null;
          error: string;
        } = await response.json();

    if (responseJson.status === "error") {
      Sentry.captureException(responseJson.error);
      throw new ActionError({
        code: "BAD_REQUEST",
        message: responseJson.error,
      });
    }

    return responseJson.data.key[2];
  },
});
