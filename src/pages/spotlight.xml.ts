import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';

export const GET: APIRoute = async (context) => {
  const spotlights = await getCollection(
    "spotlight",
    ({ data }) => !data.draft,
  );

  // Newest to oldest
  spotlights.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "NN1 Dev Club - Spotlight",
    description:
      "Spotlight is our bi-weekly series of short-form interviews with community members. Same questions spark different perspectives, as we discover a new face and story every time. Let's get to know each other a little bit better, shall we?",
    site: context?.site ?? "https://nn1.dev",
    items: spotlights.map((post) => ({
      title: post.data.name,
      pubDate: new Date(post.data.date),
      link: `/spotlight/${post.id}`,
      ...(post.rendered?.html && {
        description: sanitizeHtml(post.rendered.html)
      }),
      guid: `/spotlight/${post.id}`,
    })),
    customData: `<language>en-gb</language>`,
  });
};
