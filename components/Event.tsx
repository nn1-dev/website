import {
  MapPinIcon,
  CalendarIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import Profile from "./Profile";
import { ProfileProps } from "./Profile";

interface EventProps {
  id: number;
  title: string;
  description: string;
  location: string;
  locationUrl: string;
  date: string;
  price: string;
  ticketingSystemUrl: string;
  schedule: {
    time: string;
    talk: string;
    summary?: string;
  }[];
  speakers: ProfileProps[];
}

function Event({
  title,
  description,
  location,
  locationUrl,
  date,
  price,
  ticketingSystemUrl,
  schedule,
  speakers,
}: EventProps) {
  const eventDate = new Date(date);
  const eventDateIsUpcoming = eventDate.getTime() > Date.now();
  const eventDateParsed = eventDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <span className="inline-flex items-center rounded-md bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-200 ring-1 ring-inset ring-zinc-700/30 mb-8">
        {eventDateIsUpcoming ? "Upcoming event" : "Past event"}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl mb-8">
        {title}
      </h2>
      <div className="max-w-3xl">
        <p className="text-lg leading-8 text-zinc-100 sm:max-w-md lg:max-w-none mb-8">
          {description}
        </p>
      </div>
      <ul className="mb-16">
        <li>
          <div className="flex gap-x-3 mb-4 text-zinc-100">
            <MapPinIcon
              className="h-6 w-6 flex-none text-zinc-600"
              aria-hidden="true"
            />
            <a
              href={locationUrl}
              className="text-orange-200 hover:text-zinc-100"
            >
              {location}
            </a>
          </div>
        </li>
        <li>
          <div className="flex gap-x-3 mb-4 text-zinc-100">
            <CalendarIcon
              className="h-6 w-6 flex-none text-zinc-600"
              aria-hidden="true"
            />
            {eventDateParsed}
          </div>
        </li>
        <li>
          <div className="flex gap-x-3 mb-4 text-zinc-100">
            <TicketIcon
              className="h-6 w-6 flex-none text-zinc-600"
              aria-hidden="true"
            />
            {price}
          </div>
        </li>
      </ul>
      {eventDateIsUpcoming && (
        <div className="mb-16">
          <a
            href={ticketingSystemUrl}
            className="rounded-md bg-orange-300 px-6 py-4 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get your free ticket at Eventbrite
          </a>
        </div>
      )}

      <h2 className="text-xl mt-6 font-bold tracking-tight text-zinc-100 sm:text-2xl mb-8">
        Schedule
      </h2>
      <div className="mb-16">
        {schedule.map((scheduleItem, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row border-b border-zinc-800"
          >
            <p className="w-32 font-normal text-gray-500  dark:text-zinc-100 shrink-0">
              {scheduleItem.time}
            </p>

            <div className=" flex flex-col gap-4">
              <h3 className=" font-semibold text-zinc-100 dark:text-white">
                {scheduleItem.talk}
              </h3>

              {scheduleItem.summary && (
                <p className="text-zinc-100 dark:text-white">
                  {scheduleItem.summary}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl mt-6 font-bold tracking-tight text-zinc-100 sm:text-2xl mb-8">
        Special guests
      </h2>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 text-zinc-100">
        {speakers.map((speaker, index) => (
          <Profile key={index} {...speaker} />
        ))}
      </div>
    </>
  );
}

export default Event;
