import LandingPage from "@/components/LandingPage";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (token) {
    return <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-2xl font-bold">Taksh Dashboard</h1>
      <p className="text-zinc-400 mt-2">
        Yoo! You are logged in successfully via API routing.{"user" + "email"}
      </p>
    </div>
  } else {
    return (
      <LandingPage />
    );
  }
}
