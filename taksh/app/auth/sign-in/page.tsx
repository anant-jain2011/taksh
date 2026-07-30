"use client";

import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center px-8 py-8 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_30%),linear-gradient(135deg,#0f172a_0%,#111827_35%,#0f172a_100%)] text-slate-50">
      <div className="w-full max-w-260 grid gap-8 md:grid-cols-[1.3fr_1fr] items-center">
        <div className="p-12 sm:p-10 rounded-4xl bg-slate-950/90 shadow-[0_30px_80px_rgba(15,23,42,0.3)] backdrop-blur-[18px]">
          <p className="inline-block mb-4 text-indigo-200 text-sm tracking-[0.14em] uppercase">
            Welcome back
          </p>
          <h1 className="m-0 mb-4 text-[clamp(2.25rem,2.7vw,3rem)] leading-[1.05]">
            Sign in to your account
          </h1>
          <p className="m-0 max-w-2xl leading-8 text-slate-300">
            Access your dashboard, manage preferences, and stay connected with a
            beautiful and secure experience.
          </p>
        </div>

        <div className="p-10 sm:p-8 rounded-[28px] bg-slate-950/95 shadow-[0_30px_80px_rgba(15,23,42,0.45)] border border-slate-500/12">
          <div className="mb-7">
            <span className="inline-flex items-center justify-center w-max px-4 py-2 rounded-full bg-indigo-500/15 text-indigo-100 font-semibold tracking-[0.02em] mb-3">
              Sign in
            </span>
            <p className="m-0 text-slate-400">Enter your details to continue</p>
          </div>

          <form className="grid gap-4" action="#">
            <label className="grid gap-2 text-sm text-slate-100">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full px-4 py-4 rounded-2xl border border-slate-400/20 bg-slate-950/80 text-slate-50 outline-none transition focus:border-indigo-500/90 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
              />
            </label>

            <label className="grid gap-2 text-sm text-slate-100">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                autoComplete="current-password"
                required
                className="w-full px-4 py-4 rounded-2xl border border-slate-400/20 bg-slate-950/80 text-slate-50 outline-none transition focus:border-indigo-500/90 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-1">
              <label className="inline-flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 accent-indigo-500"
                />
                Remember me
              </label>
              <a href="#" className="text-sky-300 text-sm no-underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-4 rounded-full bg-linear-to-r from-indigo-500 to-emerald-500 text-white font-semibold tracking-[0.01em] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(99,102,241,0.18)]"
            >
              Sign in
            </button>

            <div className="flex items-center justify-center text-sm text-slate-400 my-3">
              <span className="h-px flex-1 bg-slate-500/20 mx-3"></span>
              or continue with
              <span className="h-px flex-1 bg-slate-500/20 mx-3"></span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="px-4 py-3 rounded-2xl border border-slate-500/20 bg-slate-950/80 text-slate-50 transition duration-200 hover:bg-slate-700/80 hover:-translate-y-0.5 cursor-pointer"
                onClick={() => {
                  location.replace(`/api/auth/google-signup`);
                }}
              >
                <FcGoogle className="inline w-fit text-2xl" />
              </button>
              <button
                type="button"
                className="px-4 py-3 rounded-2xl border border-slate-500/20 bg-slate-950/80 text-slate-50 transition duration-200 hover:bg-slate-700/80 hover:-translate-y-0.5 cursor-pointer"
                onClick={() => {
                  location.replace(`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI+"/github"}`);
                }}
              >
                  <FaGithub className="inline w-fit text-2xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
