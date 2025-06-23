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

import rss from "@astrojs/rss";
import fs from "fs";
import path from "path";

let cachedXML: string | null = null;

interface PostData {
  title: string;
  pubDate: Date;
  link: string;
  description: string;
}

export async function GET() {
  if (cachedXML) {
    return new Response(cachedXML, {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  }

  const spotlightRoot = path.resolve("./src/data/spotlight");
  if (!fs.existsSync(spotlightRoot)) {
    throw new Error(`Spotlight directory not found: ${spotlightRoot}`);
  }

  const folders = fs.readdirSync(spotlightRoot).filter((name) => {
    const fullPath = path.join(spotlightRoot, name);
    return fs.statSync(fullPath).isDirectory();
  });

  const posts: PostData[] = folders
    .map((slug) => {
      const filePath = path.join(spotlightRoot, slug, "index.md");
      if (!fs.existsSync(filePath)) {
        console.warn(`[RSS] Missing index.md for spotlight: ${slug}`);
        return null;
      }

      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const parts = fileContent.split("---");
        if (parts.length < 3) {
          console.warn(`[RSS] Invalid frontmatter format in: ${slug}`);
          return null;
        }

        const frontmatterRaw = parts[1];
        if (!frontmatterRaw) {
          console.warn(`[RSS] Empty frontmatter in: ${slug}`);
          return null;
        }

        const content = parts.slice(2).join("---").trim();

        // Parse frontmatter
        const frontmatter: Record<string, string> = {};
        for (const line of frontmatterRaw.split("\n")) {
          const match = line.match(/^(\w+):\s*["']?(.+?)["']?$/);
          if (match && match[1] && match[2]) {
            frontmatter[match[1]] = match[2].replace(/^["']|["']$/g, "");
          }
        }

        // Extract "Who are you" section
        const lines = content.split("\n");
        let whoAreYouContent = "";
        let foundWhoAreYou = false;

        for (const line of lines) {
          if (line.includes("Who are you and what do you do?")) {
            foundWhoAreYou = true;
            continue;
          }
          if (foundWhoAreYou) {
            if (line.trim() === "" || line.startsWith("#")) {
              if (whoAreYouContent.trim()) break; // Stop at next section
            } else {
              whoAreYouContent += line + "\n";
            }
          }
        }

        const description = whoAreYouContent.trim() || "No description available.";

        // Handle dates
        const rawDate = frontmatter.date;
        let pubDate = new Date();
        if (rawDate) {
          const tempDate = new Date(rawDate);
          if (!isNaN(tempDate.getTime())) pubDate = tempDate;
        }

        return {
          title: frontmatter.name || slug,
          pubDate,
          link: `https://nn1.dev/spotlight/${slug}`,
          description,
        };
      } catch (error) {
        console.error(`[RSS] Error processing ${slug}:`, error);
        return null;
      }
    })
    .filter((post): post is PostData => post !== null)
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  try {
    const rssResponse = await rss({
      title: "NN1 Dev Club - Spotlight",
      description: "Spotlight is our bi-weekly series of short-form interviews with community members. Same questions spark different perspectives, as we discover a new face and story every time. Let's get to know each other a little bit better, shall we?",
      site: "https://nn1.dev",
      items: posts,
      xmlns: {
        content: "http://purl.org/rss/1.0/modules/content/",
      },
      customData: `<language>en-gb</language>`,
    });

    const xml = await rssResponse.text()
    cachedXML = xml;

    return new Response(xml, {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
  } catch (error) {
    console.error("[RSS] Error generating RSS feed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}