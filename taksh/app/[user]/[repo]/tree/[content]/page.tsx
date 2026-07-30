"use server";

import Link from "next/link";
import { v2 } from "cloudinary";
import CodeUI from "@/components/CodeUI";
import Filebar from "@/components/Filebar";
import SecondNav from "@/components/SecondNav";
import { GoCode, GoCopy } from "react-icons/go";

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

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number | null;
  height: number | null;
  format: string;
}

v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @ts-ignore
export default async function RepoPage({ params }) {
  const user = (await params).user as string;
  const repon = (await params).repo as string;

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

  const navigation = [
    { name: "Code", href: `/${user}/${repon}/`, icon: <GoCode /> },
    { name: "Issues", href: `/${user}/${repon}/issues`, icon: <GoCode /> },
    { name: "Sutras", href: `/${user}/${repon}/sutras`, icon: <GoCode /> },
    { name: "Settings", href: `/${user}/${repon}/settings`, icon: <GoCode /> },
  ];

  const filename = (await params).content as string;
  // let files = await v2.search.expression(`folder:taksh/${user}/${repon} AND filename:${filename}`).execute();
  let files = await v2.search.expression("folder:taksh").execute();

  // @ts-ignore
  let file: CloudinaryResource = files?.resources[0];

  let resp = await fetch(file.secure_url);
  let code = await resp.text();
  // console.log(code);

  return (
    <div className="min-h-screen dark:bg-gray-950 bg-gray-50 py-8">
      <SecondNav navigation={navigation} />
      <div className="h-[0.4px] bg-[#7e7e7e] w-full mt-2 fixed" />
      <Filebar />

      <div className="mb-4 mt-8 w-2/3 ml-auto mr-8 bbg-emerald-500">
        <nav
          className="mb-6 h-10 bbg-green-500 flex items-center"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-lg bbg-amber-400">
            <li className="inline-flex items-center">
              <Link
                href={navigation[0].href}
                className="inline-flex items-center font-medium text-body text-blue-500"
              >
                {repon}
              </Link>
            </li>
            {filename
              .trim()
              .split("/")
              .map((p, i, arr) =>
                i + 1 == arr.length ? (
                  <div className="flex items-center space-x-1.5" key={i}>
                    <span className="text-gray-500 text-lg">/</span>
                    <span className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">
                      {p}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5" key={i}>
                    <span className="text-gray-500 text-lg">/</span>
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
                    >
                      {p}
                    </a>
                  </div>
                ),
              )}
          </ol>

          <GoCopy className="ml-4" />
        </nav>

        <CodeUI code={code} language={file.format} />
      </div>

      <div className="max-w-2xl mx-auto dark:bg-gray-800 bg-white rounded-lg shadow-lg p-8 mt-10 ml-8">
        <h1 className="text-4xl font-bold mb-2">{repo.name}</h1>
        <p className="text-gray-600 mb-6">{user || "joo"}</p>

        <button
          rel="noopener noreferrer"
          disabled={true}
          className="inline-block bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition cursor-not-allowed"
        >
          Commit
        </button>
      </div>
    </div>
  );
}
