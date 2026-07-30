"use server";

import React from "react";
import SecondNav from "@/components/SecondNav";
import Link from "next/link";

type User = {
  username?: string;
  name?: string;
  title?: string;
  location?: string;
  bio?: string;
  email?: string;
  repos?: Repo[];
  avatar_url: string;
};

type Repo = {
  name: string;
  folder_structure: object;
  owner: User;
  stars: User[];
};

const navigation = [
  { name: "Overview", href: "/profile" },
  { name: "Repos", href: "?tab=repos" },
  { name: "Projects", href: "?tab=projects" },
  { name: "Calendar", href: "?tab=calendar" },
];

// @ts-ignore
const getProfile = async function (uname) {
  let res = await fetch(
    // @ts-ignore
    "http://localhost:3001/user/find?showRepo=true&username=" + uname,
  );
  let data = (await res.json()) as User[];
  return data[0];
};

// @ts-ignore
const ProfilePage: React.FC = async ({ params }) => {
  const user = await getProfile((await params).user);
  console.log(params);

  return (
    <main className="h-screen bg-slate-50 font-sans text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SecondNav navigation={navigation} />
      <div className="flex w-full justify-center h-full bbg-green-400 mt-8 py-10 gap-6">
        {/* Left Section */}
        <div className="flex flex-col items-center gap-6 bbg-red-200 w-1/5 h-full">
          <img
            src={user.avatar_url}
            className="flex size-72 items-center justify-center rounded-full bg-indigo-100 text-4xl font-bold text-indigo-600 shadow-sm dark:bg-indigo-500/15 dark:text-indigo-400"
            alt="pp"
          />

          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold">{user?.username}</h1>
            <p className="mb-1 text-lg text-slate-600 dark:text-slate-300">
              {user.title}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {user.location}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <section className="w-3/5 h-full">
          <h1 className="text-6xl">Repositories</h1>
          <div className="flex flex-wrap justify-between gap-4 bbg-red-400 w-full mt-8">
            {(user.repos || []).map((repo, i) => (
              <div
                key={i}
                className="rounded-lg border border-red-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 w-2/5 h-18"
              >
                <Link href={`/${user.username}/${repo.name}`} key={i}>
                  {repo.name}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
