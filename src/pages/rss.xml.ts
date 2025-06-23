// A fast, cached build-time only RSS

// Scans each subfolder of src/data/spotlight
// Reads index.md from each
// Extracts frontmatter + first "Who are you" paragraph for description
// Build RSS XML once at build
// Caches it in memory using a closure var
// Sorts in descending chronological order (latest first, oldest last)

// Currently, an item (spotlight entry) currently returns: <PostData> + guid.

// Note: All standard RSS parsers expects full RFC-1123 timestamps. Omitting the time on pubDate causes RSS readers to reject this.
// TODO: Reparse & recache on file change? Get images.

import { parseSpotlightPosts } from "../utils";
import rss from "@astrojs/rss";

let cachedXML: string | null = null;

export async function GET() {
  if (cachedXML) {
    return new Response(cachedXML, {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  }

  try {
    const posts = parseSpotlightPosts();

    const rssResponse = await rss({
      title: "NN1 Dev Club - Spotlight",
      description:
        "Spotlight is our bi-weekly series of short-form interviews with community members. Same questions spark different perspectives, as we discover a new face and story every time. Let's get to know each other a little bit better, shall we?",
      site: "https://nn1.dev",
      items: posts,
      xmlns: {
        content: "http://purl.org/rss/1.0/modules/content/",
      },
      customData: `<language>en-gb</language>`,
    });

    const xml = await rssResponse.text();
    cachedXML = xml;

    return new Response(xml, {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  } catch (error) {
    console.error("[RSS] Error generating RSS feed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
