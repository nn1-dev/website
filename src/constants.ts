import {
  API_KEY_FEEDBACK,
  API_KEY_NEWSLETTER,
  API_KEY_TICKETS,
} from "astro:env/server";

export const API_URL_TICKETS = "https://tickets.nn1.dev";
export const API_URL_NEWSLETTER = "https://newsletter.nn1.dev";
export const API_URL_FEEDBACK = "https://feedback.nn1.dev";

export const API_HEADERS_TICKETS = {
  headers: { Authorization: `Bearer ${API_KEY_TICKETS}` },
};
export const API_HEADERS_NEWSLETTER = {
  headers: { Authorization: `Bearer ${API_KEY_NEWSLETTER}` },
};
export const API_HEADERS_FEEDBACK = {
  headers: { Authorization: `Bearer ${API_KEY_FEEDBACK}` },
};
