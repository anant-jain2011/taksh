// import jwt from "jsonwebtoken";

import { NextResponse } from "next/server";

// const PORT = 3333;

// import { OAuth2Client } from "google-auth-library";
// import { NextResponse } from "next/server";

// const client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET
// );

export async function GET(request: Request) {
  // @ts-ignore
  // const {tokenId} = request.body;
  // const ticket = await client.verifyIdToken({
  //   idToken: tokenId.slice(7),
  //   audience: process.env.GOOGLE_CLIENT_ID,
  // });
  // const payload = ticket.getPayload();
  // console.log(payload);
  // if (payload?.aud != process.env.GOOGLE_CLIENT_ID)
  //   return NextResponse.json({"msg": "Unauthorised"});
  // // @ts-ignore
  // const { email, name } = payload;
  // // @ts-ignore
  // const authToken = jwt.sign({ email, name }, process.env.SECRET);

  //   const decoded = jwt.verify(authToken.slice(7), process.env.SECRET);
  // } catch (e) {
  //   return res.json({ data: "NOT Authorised" });
  // }
  return NextResponse.json({ data: "Authorised" });
}
