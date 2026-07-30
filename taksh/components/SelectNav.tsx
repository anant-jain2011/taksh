"use client";

import React from "react";
import LandingBar from "./LandingBar";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

// @ts-ignore
const SelectNav: React.FC = ({ authButton, user }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/home") || (pathname.startsWith("/") && !user)) return <LandingBar authButton={authButton} />;
  // @ts-ignore
  else return <Navbar />;
};

export default SelectNav;
