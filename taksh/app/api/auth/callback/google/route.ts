import { google } from "googleapis";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_REDIRECT_URI + "/google",
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/auth/sign-in?error=no_code", request.url),
    );
  }

  const { tokens } = await client.getToken(code);
  const idToken = tokens.id_token;
  if (!idToken) {
    return NextResponse.redirect(
      new URL("/auth/sign-in?error=invalid_token", request.url),
    );
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  console.log(payload);

  if (payload?.aud != process.env.GOOGLE_CLIENT_ID)
    return NextResponse.json({ msg: "Unauthorised" });
  else {
    let resp = await fetch("http://localhost:3001/user/find?email=" + payload?.email);
    let userArr = await resp.json();

    let response;

    // @ts-ignore
    if (userArr.length) {
      response = NextResponse.redirect(new URL("/", request.url));
      // @ts-ignore
      let token = sign(JSON.stringify(userArr[0]), process.env.JWT_SECRET);
      console.log(token);
      response.cookies.set("token", token, {
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    } else {
      response = NextResponse.redirect(
        new URL("/auth/sign-up?pane=details", request.url),
      );
      response.cookies.set("token", "token", {
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }

    return response;
  }
}
