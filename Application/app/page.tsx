'use client'

import { DiscordSDK } from "@discord/embedded-app-sdk";
import { useState, useEffect } from "react";
import { Container, Image } from "@chakra-ui/react";

export default function Home() {
  const [channelName, setChannelName] = useState("Unknown");
  const [guildIconUrl, setGuildIconUrl] = useState<string | null>(null);
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState("Unknown");
  const [isDiscordActivity, setIsDiscordActivity] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const frameId = params.get("frame_id");

    if (!frameId) {
      console.log("Running as a normal webpage");
      setIsDiscordActivity(false);
      return;
    }

    setIsDiscordActivity(true);
    const discordSdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);

    async function setupDiscordSdk() {
      try {
        await discordSdk.ready();

        const { code } = await discordSdk.commands.authorize({
          client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
          response_type: "code",
          state: "",
          prompt: "none",
          scope: ["identify", "guilds", "applications.commands"],
        });

        const response = await fetch("/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();
        if (!data.access_token) {
          console.error("Token exchange failed:", data);
          return;
        }

        const auth = await discordSdk.commands.authenticate({ access_token: data.access_token });
        if (!auth) throw new Error("Authenticate command failed");

        setUsername(auth.user.username);
        setUserAvatarUrl(
          `https://cdn.discordapp.com/avatars/${auth.user.id}/${auth.user.avatar}.png`
        );

        if (discordSdk.channelId) {
          const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });
          if (channel?.name) setChannelName(channel.name);
        }

        const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });
        const guilds = await guildRes.json();

        const currentGuild = guilds.find((g: any) => g.id === discordSdk.guildId);
        if (currentGuild?.icon) {
          setGuildIconUrl(
            `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png`
          );
        }
      } catch (err) {
        console.error("Discord SDK setup failed:", err);
      }
    }

    setupDiscordSdk();
  }, []);

  return (
    <Container>
      <Image src="/rocket.png" alt="Next.js logo" width={100} height={20} />

      {isDiscordActivity ? (
        <>
          <p>Activity Channel: {channelName}</p>
          <p>Guild:</p>
          {guildIconUrl && (
            <Image src={guildIconUrl} alt="Guild icon" width={32} height={32} />
          )}
          <p>User: {username}</p>
          {userAvatarUrl && (
            <Image src={userAvatarUrl} alt="User avatar" width={32} height={32} />
          )}
        </>
      ) : (
        <p>Welcome to the normal webpage version 🚀</p>
      )}
    </Container>
  );
}
