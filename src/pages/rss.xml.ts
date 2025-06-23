// A fast, cached build-time only RSS.
// Currently returns title, pubDate, link, guid & description.
// Description is truncated to 200 chars.
// Image support exists, just needed to figure out the fuckery of XML.

import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

const baseUrl = 'https://nn1.dev';

let cachedXML: string | null = null;
type SpotlightEntry = CollectionEntry<"spotlight">;

export const GET: APIRoute = async () => {
  if (cachedXML) {
    return new Response(cachedXML, {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  }
  try {
    const now = new Date();
    const spotlights: SpotlightEntry[] = await getCollection("spotlight");

    // Filter out future-dated posts
    const publishedSpotlights = spotlights.filter(spotlight =>
      new Date(spotlight.data.date) <= now
    );

    // Sort descending by date
    const sortedSpotlights = publishedSpotlights.sort(
      (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

    const items = sortedSpotlights.map((post) => {
      // Extract description from raw markdown body
      let description = `Spotlight interview with ${post.data.name}`;
      if (post.body) {
        // Remove markdown formatting and get first paragraph
        const cleanText = post.body
          .replace(/^#+\s+.*$/gm, '') // Remove headers
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
          .replace(/\*(.*?)\*/g, '$1') // Remove italic
          .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
          .replace(/```[\s\S]*?```/g, '') // Remove code blocks
          .replace(/`(.*?)`/g, '$1') // Remove inline code
          .trim();

        if (cleanText.length > 0) {
          description = cleanText.substring(0, 200) + (cleanText.length > 200 ? '...' : '');
        }
      }

      // Build custom data for the image (only logged, for now.)
      let customData = '';
      if (post.data.ogImage?.src) {
        // URLSearchParams for proper URL encoding
        const params = new URLSearchParams({
          href: post.data.ogImage.src,
          w: '1080',
          h: '1920',
          f: 'webp'
        });

        const imageUrl = `${baseUrl}/_image?${params.toString()}`;

        customData = `<enclosure url="${imageUrl}" type="${imageUrl}" length="0" />`;
        console.log(`[RSS] TBD: ${customData}`)
      }

      return {
        title: post.data.name,
        pubDate: new Date(post.data.date),
        link: `/spotlight/${post.id}`,
        description,
        guid: `/spotlight/${post.id}`,
      };
    });

    const rssResponse = await rss({
      title: "NN1 Dev Club - Spotlight",
      description:
        "Spotlight is our bi-weekly series of short-form interviews with community members. Same questions spark different perspectives, as we discover a new face and story every time. Let's get to know each other a little bit better, shall we?",
      site: baseUrl,
      items,
      xmlns: {
        content: "http://purl.org/rss/1.0/modules/content/",
      },
      customData: `<language>en-gb</language>`,
    });

    cachedXML = await rssResponse.text();
    return new Response(cachedXML, {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  } catch (error) {
    console.error("[RSS] Error generating RSS feed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};