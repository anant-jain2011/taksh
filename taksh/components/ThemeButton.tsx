"use client";

import { useTheme } from "@teispace/next-themes";
import { DetailedHTMLProps, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeButton(props: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 💡 useEffect only executes on the client side after hydration completes
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    
    console.log(theme);
  };

  // 💡 Render a fallback layout during SSR so server HTML perfectly matches client HTML
  if (!mounted) {
    return <></>;
  }

  return (
    <div {...props}>
      <button className="text-2xl text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 p-2.5 rounded-md" type="button" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
}
