"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Link from "next/link";
import { GoHome, GoIssueOpened } from "react-icons/go";
import { XMarkIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "Home", href: "/", Icon: GoHome },
  { name: "All issues", href: "/team", Icon: GoIssueOpened },
  { name: "Projects", href: "/projects", Icon: GoHome },
  { name: "Calendar", href: "/calendar", Icon: GoHome },
];

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (a: boolean) => void;
}) {
  return (
    <Dialog open={open} onClose={setOpen} className="absolute z-10 bg-black">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/45 transition-opacity duration-10 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
            <DialogPanel
              transition
              className="pointer-events-auto max-w-screen w-xs transform transition duration-100 ease-in data-closed:-translate-x-full sm:duration-100"
            >
              <div className="flex h-full flex-col overflow-y-auto bg-black border-r border-gray-500 shadow-xl rounded-r-xl">
                <div className="flex-1 overflow-y-auto px-4 py-4.5 sm:px-5.5">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Taksh - THE OG G.O.A.T
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col">
                    <ul>
                      {links.map((l, i) => (
                        <Link
                          href={l.href}
                          key={i}
                          className="w-full h-7 hover:bg-gray-800 text-base flex gap-1.75 items-center"
                        >
                          <l.Icon className="size-[18.5px]" />
                          <span className="text-[14px]">{l.name}</span>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Done
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
