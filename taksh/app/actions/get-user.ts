import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function getUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      // @ts-ignore
      let user = verify(token, process.env.JWT_SECRET);
      return user;
    } catch (_) {
      return null;
    }
  } else {
    return null;
  }
}
