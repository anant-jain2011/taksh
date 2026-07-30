import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.log({ err: "no_code" });
    return NextResponse.redirect(
      new URL("/auth/sign-in?error=no_code", request.url),
    );
  }

  try {
    // 2. Secretly exchange code for access token on the server
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
          code: code,
        }),
      },
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    let res = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    let user = await res.json();

    let eRes = await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    let emails = await eRes.json();
    const primaryEmailObj = emails.find((e: any) => e.primary === true);
    const email = primaryEmailObj ? primaryEmailObj.email : null;

    let resp = await fetch("http://localhost:3001/user/find?email=" + email);
    let userArr = await resp.json();

    console.log(email);

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
      response.cookies.set("token", accessToken, {
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }

    // 4. Securely set token in HTTP-only cookie so client components can use it later

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(
      new URL("/auth/sign-in?error=server_error", request.url),
    );
  }
}
