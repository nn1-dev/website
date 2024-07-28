import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

const formatDate = (date: Date) =>
  `${date.toISOString().replaceAll("-", "").replaceAll(":", "").replaceAll(".", "").slice(0, 15)}Z`;

export const GET: APIRoute = async ({ params, redirect }) => {
  const { eventId } = params;
  if (eventId === undefined) {
    return redirect("/404");
  }

  const entry = await getEntry("events", eventId);
  if (entry === undefined) {
    return redirect("/404");
  }

  return new Response(
    `BEGIN:VCALENDAR
VERSION:2.0
PRODID:nn1.dev
BEGIN:VEVENT
DTSTART:${formatDate(entry.data.dateStart)}
DTEND:${formatDate(entry.data.dateEnd)}
DTSTAMP:${formatDate(new Date())}
SUMMARY:NN1 Dev Club ${entry.data.name}
DESCRIPTION:${entry.data.description}
URL:https://nn1.dev/events/${eventId}
LOCATION:${entry.data.locationText.replaceAll(", ", "\\n")}
GEO:${entry.data.locatoinLatitude};${entry.data.locatoinLongitude}
UID:${entry.data.id}
ORGANIZER;CN=NN1 Dev Club:MAILTO:club@nn1.dev
END:VEVENT
END:VCALENDAR
`,
  );
};

export async function getStaticPaths() {
  const allEvents = await getCollection("events");

  return allEvents.map(({ data }) => ({
    params: { eventId: data.id },
  }));
}
