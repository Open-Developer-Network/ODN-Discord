import { NextResponse } from "next/server";
import { DiscordSDK } from "@discord/embedded-app-sdk";
import type { User } from "@/components/types/user";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const frameId = url.searchParams.get("frame_id");
  const guildId = url.searchParams.get("guild_id");
  const channelId = url.searchParams.get("channel_id");

  if (!frameId) {
    const user: User = {
      username: "Unknown",
      avatarUrl: null,
      channelName: "Unknown",
      guildIconUrl: null,
      isDiscordActivity: false,
    };
    return NextResponse.json(user);
  }

  const discordSdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
  await discordSdk.ready();

  try {
    const { code } = await discordSdk.commands.authorize({
      client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: ["identify", "guilds", "applications.commands"],
    });

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
    if (!tokenData.access_token) {
      return NextResponse.json({ error: "Token exchange failed" }, { status: 400 });
    }

    const auth = await discordSdk.commands.authenticate({ access_token: tokenData.access_token });

    let channelName = "Unknown";
    if (channelId) {
      const channel = await discordSdk.commands.getChannel({ channel_id: channelId });
      channelName = channel?.name ?? "Unknown";
    }

    const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const guilds = await guildRes.json();
    const currentGuild = guilds.find((g: any) => g.id === guildId);

    const user: User = {
      username: auth.user.username ?? "Unknown",
      avatarUrl: auth.user.avatar
        ? `https://cdn.discordapp.com/avatars/${auth.user.id}/${auth.user.avatar}.png`
        : null,
      channelName,
      guildIconUrl: currentGuild?.icon
        ? `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png`
        : null,
      isDiscordActivity: true,
    };

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      {
        username: "Unknown",
        avatarUrl: null,
        channelName: "Unknown",
        guildIconUrl: null,
        isDiscordActivity: true,
        error: "Discord SDK setup failed",
      },
      { status: 500 }
    );
  }
}
