import Link from "next/link";

function Nav() {
  return (
    <header className="border-b bg-zinc-900 border-zinc-800">
      <div className="mx-auto max-w-7xl">
        <div className="px-6 py-6 lg:max-w-2xl lg:px-8">
          <nav className="flex items-center" aria-label="Global">
            <Link href="/" className="hover:opacity-75">
              <svg
                viewBox="0 0 45 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6"
              >
                <g clipPath="url(#clip0_1_2)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0V10H9V6L12 12H21V6L24 12H27H30H33L36 6V10H45V0H39H36L33 6V2H24V6L21 0H18H12V6L9 0H0ZM9 11H0V12H9V11ZM33 0H24V1H33V0ZM36 11H45V12H36V11Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="45" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <div className="ml-12 flex">
              <Link
                href="/events"
                className="text-sm font-base leading-6 text-zinc-100 hover:text-orange-200"
              >
                All events
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Nav;
