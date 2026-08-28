import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
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
        locationUrl: z.url(),
        locationLatitude: z.string(),
        locationLongitude: z.string(),
        parking: z.string(),
        parkingUrl: z.url(),
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
        videos: z
          .array(
            z
              .object({
                youtubeId: z.string(),
                poster: image(),
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
        urlWebsite: z.url().optional(),
        urlGitHub: z.url().optional(),
        urlMastodon: z.url().optional(),
        urlBluesky: z.url().optional(),
        urlLinkedIn: z.url().optional(),
        urlInstagram: z.url().optional(),
        urlTwitter: z.url().optional(),
        urlHuggingFace: z.url().optional(),
        urlYouTube: z.url().optional(),
        urlNuGet: z.url().optional(),
        urlStackOverflow: z.url().optional(),
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
      interview: z.url().optional(),
      urlWebsite: z.url().optional(),
      urlGitHub: z.url().optional(),
      urlMastodon: z.url().optional(),
      urlBluesky: z.url().optional(),
      urlLinkedIn: z.url().optional(),
      urlInstagram: z.url().optional(),
      urlTwitter: z.url().optional(),
      urlHuggingFace: z.url().optional(),
      urlYouTube: z.url().optional(),
      urlNuGet: z.url().optional(),
    }),
});

const feedback = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/data/feedback" }),
  schema: ({ image }) =>
    z
      .object({
        id: z.number(),
        image: image(),
        name: z.string(),
        role: z.string().optional(),
        quote: z.string(),
      })
      .strict(),
});

export const collections = { events, member, spotlight, feedback };
