"use client";

import useStore from "@/app/strore";
import { useEffect } from "react";

// @ts-ignore
const Login = ({ user }) => {
  // @ts-ignore
  const { setUser } = useStore();
  useEffect(() => {
    console.log(user);
    setUser(user);
  }, []);

  return <></>;
};

export default Login;
