"use client"
import { DiscordSDK } from "@discord/embedded-app-sdk";
import { useState, useEffect } from "react";
import { Image, Container, Space, Flex, Group } from '@mantine/core';
import { channel } from "diagnostics_channel";

export default function Home() {
  type User = {
    username: string | null | undefined;
    avatarUrl: string | null | undefined;
    channelName: string | null | undefined;
    guildIconUrl: string | null | undefined;
  };

  const [User, setUser] = useState<User>({
    username: "Unknown",
    avatarUrl: "Unknown",
    channelName: "Unknown",
    guildIconUrl: "Unknown"
  });

  const [isDiscordActivity, setIsDiscordActivity] = useState(false);



  if (User.channelName !== "Unknown") {
    console.log("Channel Name:", User.channelName);
  }

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

        setUser(prev => ({
          ...prev,
          username: auth.user.username,
          avatarUrl: `https://cdn.discordapp.com/avatars/${auth.user.id}/${auth.user.avatar}.png`,

        }));


        if (discordSdk.channelId) {
          const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });

          setUser(prev => ({
            ...prev, channelName: channel.name
          }));
        }

        const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
          headers: { Authorization: `Bearer ${data.access_token}` },
        });
        const guilds = await guildRes.json();

        const currentGuild = guilds.find((g: any) => g.id === discordSdk.guildId);

        setUser(prev => ({
          ...prev, guildIconUrl: `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png`
        }));
      } catch (err) {
        console.error("Discord SDK setup failed:", err);
      }
    }

    setupDiscordSdk();
  }, []);

  const { username, avatarUrl, channelName, guildIconUrl } = User;
  return (


    <Group pl={40} pt={20} bg={"#a5d8ff"}>
      {isDiscordActivity ?
        (

          <Flex direction="row" align="center"
            justify="flex-start" gap={'lg'}>
            <Image src="/rocket.png" alt="Next.js logo" w={100} h={100} />
            <p>Activity Channel: {channelName}</p>
            <Space />
            <p>Server:</p>
            {guildIconUrl && (
              <Image src={guildIconUrl} alt="Guild icon" w={100} h={100} />
            )}
            <Space />
            <Space />
            <p>User: {username}</p>
            {avatarUrl && (
              <Image src={avatarUrl} alt="User avatar" w={100} h={100} />
            )}
            
            </Flex >

        ) : (
          <>
            <Image src="/rocket.png" alt="Next.js logo" h={160} w={160} />
            <p>Welcome to the normal webpage version 🚀</p>
            <p>Jacob Rocks 👾</p>
          </>
        )
      }
    </Group >





  );
}
