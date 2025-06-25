// A fast, cached build-time only RSS.
// Currently returns title, pubDate, link, guid & description.
// Description is truncated to 200 chars.

import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

const STATIC_RSS_DATA = {
  title: "NN1 Dev Club - Spotlight",
  description: "Spotlight is our bi-weekly series of short-form interviews with community members. Same questions spark different perspectives, as we discover a new face and story every time. Let's get to know each other a little bit better, shall we?",
  site: "https://nn1.dev",
  customData: `<language>en-GB</language>`,
};

const HEADERS = {
  "Content-Type": "application/rss+xml; charset=utf-8",
  "Netlify-CDN-Cache-Control": "public, durable, s-maxage=86400, stale-while-revalidate=604800"
};

const MARKDOWN_PATTERNS = {
  headers: /^#+\s+.*$/gm,
  bold: /\*\*(.*?)\*\*/g,
  italic: /\*(.*?)\*/g,
  links: /\[(.*?)\]\(.*?\)/g,
  codeBlocks: /```[\s\S]*?```/g,
  inlineCode: /`(.*?)`/g,
};

let cachedXML: string | null = null;
type SpotlightEntry = CollectionEntry<"spotlight">;

function cleanMarkdown(text: string): string {
  return text
    .replace(MARKDOWN_PATTERNS.headers, '')
    .replace(MARKDOWN_PATTERNS.bold, '$1')
    .replace(MARKDOWN_PATTERNS.italic, '$1')
    .replace(MARKDOWN_PATTERNS.links, '$1')
    .replace(MARKDOWN_PATTERNS.codeBlocks, '')
    .replace(MARKDOWN_PATTERNS.inlineCode, '$1')
    .trim();
}

// Only truncate at end of word
function truncateAtWord(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const truncated = text.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 0) return truncated.slice(0, lastSpace) + '...';
  return truncated + '...';
}

function generateDescription(post: SpotlightEntry): string {
  const defaultDescription = `Spotlight interview with ${post.data.name}`

  if (!post.body) {
    return defaultDescription;
  }

  const cleanText = cleanMarkdown(post.body);
  const truncated = truncateAtWord(cleanText, 200);

  if (cleanText.length === 0) {
    return defaultDescription;
  }

  return truncated;
}

export const GET: APIRoute = async () => {
  if (cachedXML) {
    return new Response(cachedXML, {
      headers: HEADERS,
    });
  }
  try {
    const spotlights = await getCollection("spotlight", ({ data }) => data.draft !== true);

    // Newest to oldest
    spotlights.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

    const items = spotlights.map(post => ({
      title: post.data.name,
      pubDate: new Date(post.data.date),
      link: `/spotlight/${post.id}`,
      description: generateDescription(post),
      guid: `/spotlight/${post.id}`,
    }));

    const rssResponse = await rss({
      ...STATIC_RSS_DATA,
      items,
    });

    cachedXML = await rssResponse.text();
    return new Response(cachedXML, {
      headers: HEADERS,
    });
  } catch (error) {
    console.error("[RSS] Error generating RSS feed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};