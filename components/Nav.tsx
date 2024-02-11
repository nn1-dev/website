"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [{ name: "All Events", href: "/events" }];

function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl">
        <div className="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
          <nav
            className="flex items-center justify-between lg:justify-start"
            aria-label="Global"
          >
            <a href="/">
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
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-zinc-100 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="hidden lg:ml-12 lg:flex lg:gap-x-14">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-zinc-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-zinc-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 ml-auto rounded-md p-2.5 text-zinc-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-100 hover:bg-zinc-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Nav;
