"use client";

import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import {
  BoltIcon,
  CommandLineIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import useStore from "@/app/strore";

const features = [
  {
    name: "Repositories",
    description: "Host and manage your code",
    href: "/repos",
    icon: CodeBracketIcon,
  },
  {
    name: "Sutra",
    description: "Code reviews and collaboration",
    href: "#",
    icon: CommandLineIcon,
  },
  {
    name: "Actions",
    description: "Automate workflows",
    href: "#",
    icon: BoltIcon,
  },
];

export default function LandingBar({ authButton }: { authButton: React.ReactNode }) {
  // @ts-ignore
  // const { user } = useStore();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          Taksh
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="text-sm font-medium text-zinc-300 hover:text-white">
                  Features
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition duration-200"
                  enterFrom="opacity-0 translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-2"
                >
                  <Popover.Panel className="absolute left-1/2 mt-4 w-125 -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-900/95 p-4 shadow-2xl backdrop-blur-xl">
                    <div className="grid gap-2">
                      {features.map((feature) => (
                        <Link
                          key={feature.name}
                          href={feature.href}
                          className="flex items-stsart items-center gap-4 rounded-xl p-3 hover:bg-white/5"
                        >
                          <feature.icon className="size-8 mr-2 text-orange-500" />

                          <div>
                            <h3 className="font-medium text-white">
                              {feature.name}
                            </h3>

                            <p className="text-sm text-zinc-400">
                              {feature.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          <Link
            href="/explore"
            className="text-sm font-medium text-zinc-300 hover:text-white"
          >
            Explore
          </Link>

          <Link
            href="/docs"
            className="text-sm font-medium text-zinc-300 hover:text-white"
          >
            Docs
          </Link>

          <Link
            href="/pricing"
            className="text-sm font-medium text-zinc-300 hover:text-white"
          >
            Pricing
          </Link>
        </nav>

        {/* Right Side */}
        {authButton}
      </div>
    </header>
  );
}
