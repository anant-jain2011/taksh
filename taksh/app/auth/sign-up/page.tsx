"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(`Signing up ${name || "user"} with ${email}`);
    // Replace this with your signup API call
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8 dark:bg-slate-100">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-[0_12px_34px_rgba(0,0,0,0.12)] p-8">
        <h1 className="m-0 text-3xl mb-4">Create an account</h1>
        <p className="mt-0 mb-6 text-slate-600">Sign up to access your dashboard and manage your profile.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block mb-2 font-semibold">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 rounded-[10px] border border-slate-300 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="block">
            <span className="block mb-2 font-semibold">Email address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-[10px] border border-slate-300 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <label className="block">
            <span className="block mb-2 font-semibold">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              required
              className="w-full px-4 py-3 rounded-[10px] border border-slate-300 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-[10px] bg-sky-600 text-white font-bold hover:bg-sky-700 transition-colors"
          >
            Sign up
          </button>
        </form>

        {message ? (
          <p className="mt-4 text-sky-600 font-semibold">{message}</p>
        ) : null}
      </section>
    </main>
  );
}
