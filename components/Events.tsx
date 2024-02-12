import {
  MapPinIcon,
  CalendarIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import Profile from "./Profile";

export default function Events() {
  return (
    <div className="bg-zinc-950 py-24 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="inline-flex items-center rounded-md bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-200 ring-1 ring-inset ring-zinc-700/30 mb-8">
          Upcoming event
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl mb-8">
          #1: PJ Evans and Junade Ali
        </h2>
        <p className="text-lg leading-8 text-zinc-100 sm:max-w-md lg:max-w-none mb-8">
          Don&apos;t miss out on this inaugural gathering of local tech
          enthusiasts - mark your calendars and join us for an evening of
          networking and engaging talks by PJ Evans and Junade Ali.
        </p>
        <ul className="mb-16">
          <li>
            <div className="flex gap-x-3 mb-4 text-zinc-100">
              <MapPinIcon
                className="h-6 w-6 flex-none text-zinc-600"
                aria-hidden="true"
              />
              <a
                href="https://vulcanworks.co.uk"
                target="_blank"
                className="text-orange-200 hover:text-zinc-100"
              >
                Vulcan Works, 34-38 Guildhall Rd, Northampton, NN1 1EW
              </a>
            </div>
          </li>
          <li>
            <div className="flex gap-x-3 mb-4 text-zinc-100">
              <CalendarIcon
                className="h-6 w-6 flex-none text-zinc-600"
                aria-hidden="true"
              />
              2024.03.27, Wednesday, 06:00PM
            </div>
          </li>
          <li>
            <div className="flex gap-x-3 mb-4 text-zinc-100">
              <TicketIcon
                className="h-6 w-6 flex-none text-zinc-600"
                aria-hidden="true"
              />
              £0
            </div>
          </li>
        </ul>

        <div className="mb-16">
          <a
            href="#"
            className="rounded-md bg-orange-300 px-6 py-4 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get your free ticket at Eventbrite
          </a>
        </div>

        <h2 className="text-xl mt-6 font-bold tracking-tight text-zinc-100 sm:text-2xl mb-8">
          Schedule
        </h2>
        <div className="mb-16">
          <div className="flex flex-col gap-2 py-2 sm:gap-6 sm:flex-row sm:items-center border-b border-zinc-800">
            <p className="w-32 font-normal text-gray-500  dark:text-zinc-100 shrink-0">
              18:00 - 18:45
            </p>
            <h3 className="text-lg text-zinc-100 dark:text-white">
              &quot;Title of a talk&quot; by Authors name here
            </h3>
          </div>
          <div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center border-b border-zinc-800">
            <p className="w-32 font-normal text-gray-500  dark:text-zinc-100 shrink-0">
              18:45 - 19:00
            </p>
            <h3 className="text-lg text-zinc-100 dark:text-white">Break</h3>
          </div>
          <div className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center border-b border-zinc-800">
            <p className="w-32 font-normal text-gray-500  dark:text-zinc-100 shrink-0">
              19:00 - 19:45
            </p>
            <h3 className="text-lg text-zinc-100 dark:text-white">
              &quot;Title of a talk&quot; by Authors name here
            </h3>
          </div>
        </div>

        <h2 className="text-xl mt-6 font-bold tracking-tight text-zinc-100 sm:text-2xl mb-8">
          Special guests
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 text-zinc-100">
          <Profile
            name="PJ Evans"
            role="Senior Developer at Mindera UK"
            bio="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            image="/pj.jpg"
            urlLinkedIn="https://www.linkedin.com/in/mrpjevans/"
            urlMastodon="https://mastodon.social/@mrpjevans"
          />
          <Profile
            name="Junade Ali"
            role="Chief Executive Officer at Stealth Startup"
            bio="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            image="/junade.jpg"
            urlLinkedIn="https://www.linkedin.com/in/junade/"
          />
        </div>
      </div>
    </div>
  );
}
