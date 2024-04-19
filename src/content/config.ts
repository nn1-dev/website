import { z, defineCollection } from "astro:content";

const eventsCollection = defineCollection({
  type: "data",
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date(),
    locationText: z.string(),
    locationUrl: z.string().url(),
    ticketText: z.string(),
    ticketUrl: z.string().url(),
    parkingText: z.string(),
    parkingUrl: z.string().url(),
    schedule: z.array(
      z.object({
        dateStart: z.coerce.date(),
        dateEnd: z.coerce.date(),
        title: z.string(),
        description: z.string().optional(),
      }),
    ),
    guests: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        image: z.string(),
        bio: z.string().optional(),
        urlWebsite: z.string().url().optional(),
        urlGitHub: z.string().url().optional(),
        urlMastodon: z.string().url().optional(),
        urlLinkedIn: z.string().url().optional(),
        urlInstagram: z.string().url().optional(),
        urlTwitter: z.string().url().optional(),
      }),
    ),
  }),
});

export const collections = { events: eventsCollection };
