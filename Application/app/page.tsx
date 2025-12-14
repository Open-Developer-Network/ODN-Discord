'use client'

import { DiscordSDK } from "@discord/embedded-app-sdk";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import { Container, Image } from "@chakra-ui/react";

// import rocketLogo from "@/public/rocketLogo.png"

export default function Home() {
  const [channelName, setChannelName] = useState<string>("Unknown");
  const [guildIconUrl, setGuildIconUrl] = useState<string | null>(null);

  useEffect(() => {
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

        console.log("Authenticated user:", auth.user);

        if (discordSdk.channelId && discordSdk.guildId) {
          const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });
          console.log("Channel response:", channel);
          if (channel?.name) setChannelName(channel.name);
        }
      } catch (err) {
        console.error("Discord SDK setup failed:", err);
      }
    }

    setupDiscordSdk();
  }, []);

  return (
    <Container>
      <Image
        // className="dark:invert"
        src="/rocket.png"
        alt="Next.js logo"
        width={100}
        height={20}
      />


      Activity Channel: {channelName}
      Guild:
      Image
      <Image
        className="dark:invert"
        src={`${guildIconUrl}`}
        alt="Vercel logomark"
        width={16}
        height={16}
      /> </Container>


  );
}
