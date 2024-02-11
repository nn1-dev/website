import {
  MapPinIcon,
  CalendarIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import Profile from "./Profile";

export default function Events() {
  return (
    <div className="bg-zinc-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center rounded-md bg-orange-200 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            Upcoming event
          </span>
          <h2 className="text-3xl mt-6 font-bold tracking-tight text-zinc-100 sm:text-4xl">
            #1: PJ Evans and Junade Ali
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-100 sm:max-w-md lg:max-w-none">
            Don't miss out on this inaugural gathering of local tech enthusiasts
            - mark your calendars and join us for an evening of networking and
            engaging talks by PJ Evans and Junade Ali.
          </p>
        </div>
        <ul className="mb-16">
          <li>
            <div className="flex gap-x-3 mb-4 text-zinc-100">
              <MapPinIcon
                className="h-6 w-6 flex-none text-zinc-600"
                aria-hidden="true"
              />
              Vulcan Works, 34-38 Guildhall Rd, Northampton, NN1 1EW
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
          Speakers
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
