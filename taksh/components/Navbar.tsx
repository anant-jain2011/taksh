"use client"; // Ensure this is at the very top of your file

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import Link from "next/link";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeButton from "./ThemeButton";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react"; // Added useEffect
import useStore from "@/app/strore";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Team", href: "/team", current: false },
  { name: "Projects", href: "/projects", current: false },
  { name: "Calendar", href: "/calendar", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // New mounting state
  
  // @ts-ignore
  const { user, setUser } = useStore();

  // Wait for the client-side hydration to finish before displaying user-specific items
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Disclosure
        as="nav"
        className="fixed z-20 h-14 w-full bg-gray-200/80 dark:bg-gray-900"
      >
        <div className="mx-auto px-5 pt-">
          <div className="relative flex h-14 bbg-amber-300 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center"></div>
              <Bars3Icon
                className="size-8 border border-gray-400 rounded-lg p-1 dark:text-gray-400 cursor-pointer"
                onClick={() => setOpen(true)}
              />
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white dark:bg-gray-950/50"
                          : "text-gray-300 hover:bg-white/5 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <ThemeButton className="" />

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              {/* Profile dropdown protected by hydration check */}
              {/* {user ? ( */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer overflow-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="User avatar"
                      src={user?.avatar_url}
                      className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                    />
                    {/* <div className="w-10 h-10 block bg-green-300">he</div> */}
                  </MenuButton>

                  <MenuItems
                    transition
                    modal={false}
                    className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-1 data-leave:ease-in"
                  >
                    <MenuItem>
                      <Link
                        href={"/"+user?.username}
                        className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                      >
                        Your profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                      >
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                      >
                        Sign out
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              {/* ) : (
                
                <div className="ml-3 size-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
               */}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white dark:bg-gray-950/50"
                    : "text-gray-300 hover:bg-white/5 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium",
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
