// app/api/token/route.ts
export async function POST(req: Request) {
  const { code } = await req.json();

  if (!code) {
    return new Response(JSON.stringify({ error: "Missing code" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    client_secret: process.env.DISCORD_CLIENT_SECRET!,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
  });

  const discordRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const text = await discordRes.text();
  console.log("Discord token response:", text);

  try {
    const data = JSON.parse(text);
    return new Response(JSON.stringify(data), {
      status: discordRes.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON", raw: text }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}