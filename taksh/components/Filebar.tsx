"use client";

import Link from "next/link";
import { useState } from "react";
import { GoHome, GoIssueOpened } from "react-icons/go";
import { XMarkIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "Home", href: "/", Icon: GoHome },
  { name: "All issues", href: "/team", Icon: GoIssueOpened },
  { name: "Projects", href: "/projects", Icon: GoHome },
  { name: "Calendar", href: "/calendar", Icon: GoHome },
];

// @ts-ignore
export default function Filebar(props) {
  const [open, setOpen] = useState(true);

  return (
    <div
      className="block overflow-y-auto bg-black border-r border-gray-500 shadow-xl fixed left-0 h-full w-1/4"
      hidden={!open}
    >
      <div className="h-[0.4px] bg-[#7e7e7e] w-full mt-2 fixed" />
      <div className="flex-1 overflow-y-auto px-4 py-4.5 sm:px-5.5">
        <div className="flex items-start justify-between">
          <h1 className="text-lg font-medium text-white">
            Taksh - THE OG G.O.A.T
          </h1>
          <div className="ml-3 flex h-7 items-center">
            {/* This custom button is now the ONLY thing that triggers a close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
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
              <li key={i}>
                <Link
                  href={l.href}
                  className="w-full h-7 hover:bg-gray-800 text-base flex gap-1.75 items-center text-gray-300 rounded px-2"
                >
                  <l.Icon className="size-[18.5px]" />
                  <span className="text-[14px]">{l.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
