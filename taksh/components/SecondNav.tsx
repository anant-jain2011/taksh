"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface link {
  name: string;
  href: string;
}

const SecondNav = ({ navigation }: { navigation: link[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <nav className="h-10 -mt-8 z-10 fixed flex justify-start items-end gap-3 px-4 bg-gray-200/80 dark:bg-gray-900 w-full">
      {navigation.map((item, i) => (
        <Link
          href={item.href}
          className="bbg-pink-400 px-3 py-1 h-10 grid place-items-center relative"
          key={i}
          onClick={() => setCurrent(i)}
        >
          {item.name}
          {current == i && (
            <div className="bg-amber-600 h-0.5 w-full rounded-lg absolute bottom-0"></div>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default SecondNav;
