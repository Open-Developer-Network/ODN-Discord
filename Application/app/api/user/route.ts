// app/api/user/route.ts
import { NextResponse } from "next/server";
import { DiscordSDK } from "@discord/embedded-app-sdk";

export async function GET(req: Request) {
  const discordSdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);

  await discordSdk.ready();

  const { code } = await discordSdk.commands.authorize({
    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: ["identify", "guilds", "applications.commands"],
  });

  const tokenRes = await fetch(`${process.env.DISCORD_API}/oauth2/token`, {
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
  const auth = await discordSdk.commands.authenticate({ access_token: tokenData.access_token });

  // Fetch guilds
  const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const guilds = await guildRes.json();
  const currentGuild = guilds.find((g: any) => g.id === discordSdk.guildId);

  // Fetch channel
  let channelName = "Unknown";
  if (discordSdk.channelId) {
    const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });
    channelName = channel?.name ?? "Unknown";
  }

  return NextResponse.json({
    username: auth.user.username,
    avatarUrl: `https://cdn.discordapp.com/avatars/${auth.user.id}/${auth.user.avatar}.png`,
    channelName,
    guildIconUrl: currentGuild?.icon
      ? `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png`
      : null,
  });
}
