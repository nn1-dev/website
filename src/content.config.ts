import { z, defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/events" }),
  schema: ({ image }) =>
    z
      .object({
        id: z.number(),
        draft: z.boolean().default(false),
        ogImage: image(),
        name: z.string(),
        description: z.string(),
        dateStart: z.coerce.date(),
        dateEnd: z.coerce.date(),
        location: z.string(),
        locationUrl: z.string().url(),
        locatoinLatitude: z.string(),
        locatoinLongitude: z.string(),
        parking: z.string(),
        parkingUrl: z.string().url(),
        schedule: z.array(
          z
            .object({
              dateStart: z.coerce.date(),
              dateEnd: z.coerce.date(),
              title: z.string(),
              description: z.string().optional(),
            })
            .strict(),
        ),
        speakers: z.array(reference("member")),
        images: z
          .array(
            z
              .object({
                src: image(),
                caption: z.string(),
              })
              .strict(),
          )
          .optional(),
      })
      .strict(),
});

const member = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/members" }),
  schema: ({ image }) =>
    z
      .object({
        name: z.string(),
        role: z.string(),
        image: image(),
        bio: z.string().optional(),
        urlWebsite: z.string().url().optional(),
        urlGitHub: z.string().url().optional(),
        urlMastodon: z.string().url().optional(),
        urlBluesky: z.string().url().optional(),
        urlLinkedIn: z.string().url().optional(),
        urlInstagram: z.string().url().optional(),
        urlTwitter: z.string().url().optional(),
        urlHuggingFace: z.string().url().optional(),
      })
      .strict(),
});

const spotlight = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/spotlight" }),
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().default(false),
      name: z.string(),
      role: z.string(),
      image: image(),
      ogImage: image(),
      date: z.coerce.date(),
      urlWebsite: z.string().url().optional(),
      urlGitHub: z.string().url().optional(),
      urlMastodon: z.string().url().optional(),
      urlBluesky: z.string().url().optional(),
      urlLinkedIn: z.string().url().optional(),
      urlInstagram: z.string().url().optional(),
      urlTwitter: z.string().url().optional(),
      urlHuggingFace: z.string().url().optional(),
    }),
});

export const collections = { events, member, spotlight };
