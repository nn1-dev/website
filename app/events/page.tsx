import Link from "next/link";
import Image from "next/image";
import events from "../../public/events.json";

export default function Example() {
  return (
    <div className="bg-zinc-950 py-24 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {events.map((event, index) => {
            const eventDate = new Date(event.date);

            const eventDateParsed = eventDate.toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Link
                href={`/events/${event.id}`}
                key={index}
                className="relative flex space-x-3 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-zinc-700"
              >
                {event.speakers.map((speaker, index) => (
                  <div className="flex-shrink-0" key={index}>
                    <Image
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                      src={speaker.image}
                      alt={speaker.name}
                    />
                  </div>
                ))}
                <div className="min-w-0 flex-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="truncate text-sm text-gray-400 mb-4">
                    {eventDateParsed}
                  </p>
                  <p className="font-medium text-zinc-100 mb-4">
                    {event.title}
                  </p>
                  <p className="text-zinc-400">{event.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
