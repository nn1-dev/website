import path from "path"
import fs from "fs"

const getInviteUrls = ({
  id,
  name,
  description,
  location,
  dateStart,
  dateEnd,
}: {
  id: number;
  name: string;
  description: string;
  location: string;
  dateStart: Date;
  dateEnd: Date;
}) => {
  const getUtcParts = (date: Date) => ({
    year: date.getUTCFullYear().toString(),
    month: (date.getUTCMonth() + 1).toString().padStart(2, "0"),
    day: date.getUTCDate().toString().padStart(2, "0"),
    hour: date.getUTCHours().toString().padStart(2, "0"),
    minute: date.getUTCMinutes().toString().padStart(2, "0"),
    second: date.getUTCSeconds().toString().padStart(2, "0"),
  });

  // type Part = keyof ReturnType<typeof getUtcParts>;

  // const localFormat = new Intl.DateTimeFormat("en-GB", {
  //   timeZone: "Europe/London",
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  //   hour12: false,
  // });
  // const getLocalParts = (date: Date) =>
  //   (localFormat.formatToParts(date) as { type: Part; value: string }[]).reduce(
  //     (acc, part) => {
  //       if (
  //         ["year", "month", "day", "hour", "minute", "second"].includes(
  //           part.type,
  //         )
  //       ) {
  //         acc[part.type] = part.value;
  //       }
  //       return acc;
  //     },
  //     {} as Record<Part, string>,
  //   );

  const dateTimeStartPartsUtc = getUtcParts(dateStart);
  // const dateTimeStartPartsLocal = getLocalParts(dateStart);

  const dateTimeEndPartsUtc = getUtcParts(dateEnd);
  // const dateTimeEndPartsLocal = getLocalParts(dateEnd);

  const googleStart = `${dateTimeStartPartsUtc.year}${dateTimeStartPartsUtc.month}${dateTimeStartPartsUtc.day}T${dateTimeStartPartsUtc.hour}${dateTimeStartPartsUtc.minute}${dateTimeStartPartsUtc.second}Z`;
  const googleEnd = `${dateTimeEndPartsUtc.year}${dateTimeEndPartsUtc.month}${dateTimeEndPartsUtc.day}T${dateTimeEndPartsUtc.hour}${dateTimeEndPartsUtc.minute}${dateTimeEndPartsUtc.second}Z`;

  // const outlookStart = `${dateTimeStartPartsLocal.year}-${dateTimeStartPartsLocal.month}-${dateTimeStartPartsLocal.day}T${dateTimeStartPartsLocal.hour}%3A${dateTimeStartPartsLocal.minute}%3A${dateTimeStartPartsLocal.second}`;
  // const outlookEnd = `${dateTimeEndPartsLocal.year}-${dateTimeEndPartsLocal.month}-${dateTimeEndPartsLocal.day}T${dateTimeEndPartsLocal.hour}%3A${dateTimeEndPartsLocal.minute}%3A${dateTimeEndPartsLocal.second}`;

  const encodedName = encodeURIComponent(`NN1 Dev Club ${name}`);
  const encodedDescription = encodeURIComponent(description);
  const encodedLocation = encodeURIComponent(location);

  return {
    iCal: `https://nn1.dev/events/${id}/invite`,
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${googleStart}%2F${googleEnd}&details=${encodedDescription}&location=${encodedLocation}&text=${encodedName}`,
    // outlook: `https://outlook.live.com/calendar/0/action/compose?allday=false&body=${encodedDescription}&enddt=${outlookEnd}&location=${encodedLocation}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${outlookStart}&subject=${encodedName}`,
    // office365: `https://outlook.office.com/calendar/0/action/compose?allday=false&body=${encodedDescription}&enddt=${outlookEnd}&location=${encodedLocation}&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${outlookStart}&subject=${encodedName}`,
  };
};

export interface PostData {
  title: string;
  pubDate: Date;
  link: string;
  description: string;
}

const parseSpotlightPosts = (): PostData[] => {
  const spotlightRoot = path.resolve("./src/data/spotlight");
  if (!fs.existsSync(spotlightRoot)) {
    throw new Error(`Spotlight directory not found: ${spotlightRoot}`);
  }

  const folders = fs.readdirSync(spotlightRoot).filter((name) => {
    const fullPath = path.join(spotlightRoot, name);
    return fs.statSync(fullPath).isDirectory();
  });

  return folders
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
        const content = parts.slice(2).join("---").trim();
        
        if (!frontmatterRaw) {
          console.warn(`[RSS] Empty frontmatter in: ${slug}`);
          return null;
        }

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
        let found = false;

        for (const line of lines) {
          if (line.includes("Who are you and what do you do?")) {
            found = true;
            continue;
          }
          if (found) {
            if (line.trim() === "" || line.startsWith("#")) {
              if (whoAreYouContent.trim()) break;
            } else {
              whoAreYouContent += line + "\n";
            }
          }
        }

        const description = whoAreYouContent.trim() || "No description available.";

        // Parse date
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
}

export { getInviteUrls, parseSpotlightPosts };
