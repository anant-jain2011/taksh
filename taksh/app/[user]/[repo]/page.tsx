"use server";

import Link from "next/link";

interface FileFolder {
  name: string;
  files: Array<FileFolder | string>;
}

interface User {
  username: string;
  email: string;
  repos: Repository[];
}

interface Repository {
  name: string;
  description: string;
  folder_structure: {
    root: Array<FileFolder | string>;
  };
  owner: User;
  language: string;
  stars: number;
  forks: number;
}

// @ts-ignore
export default async function RepoPage({ params }) {
  const user = (await params.user) as string;
  const repon = (await params.repo) as string;

  const response = await fetch(
    `http://localhost:3001/repo/find?username=${user}&name=${repon}`,
  );
  if (!response.ok) throw new Error("Repository not found");

  const data = await response.json();

  let repo: Repository = {
    ...data[0],
    folder_structure: { root: ["index.html", "script.js", "style.css"] },
  };

  if (!repo) return <div className="p-8">Repository not found</div>;

  return (
    <div className="min-h-screen dark:bg-gray-950 bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto dark:bg-gray-800 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-2">{repo.name}</h1>
        <p className="text-gray-600 mb-6">{repo.owner.username || "joo"}</p>

        <div className="mb-4">
          {repo.folder_structure?.root.map((item, i) => {
            let a = typeof item == "string" ? item : item.name;
            return (
              <Link
                href={`/${repo.owner.username}/${repo.name}/tree/${a}`}
                className="text-blue-300 block"
                key={i}
              >
                {a}
              </Link>
            );
          })}
        </div>

        <a
          href={repo.description}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Commit
        </a>
      </div>
    </div>
  );
}
