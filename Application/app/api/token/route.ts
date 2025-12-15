// app/api/token/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code,
    }),
  });

  const tokenData = await tokenRes.json();
  return NextResponse.json(tokenData);
}
