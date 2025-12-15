"use client"
import { DiscordSDK } from "@discord/embedded-app-sdk";
import { useState } from "react";
import { Image, Container, Space, Flex, Group, Button } from '@mantine/core';
import type { User } from "@/components/types/user";
export default function Home() {


  const [User, setUser] = useState<User>({
    username: "Unknown",
    avatarUrl: null,
    channelName: "Unknown",
    guildIconUrl: null,
    isDiscordActivity: false,
  });
  const [debug, setDebug] = useState("");
  async function fetchUser() {
    try {
      const discordSdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
      await discordSdk.ready();

      const { code } = await discordSdk.commands.authorize({
        client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify", "guilds", "applications.commands"],
      });
      // Exchange code for token via API route
      const tokenRes = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const tokenData = await tokenRes.json();

      const auth = await discordSdk.commands.authenticate({ access_token: tokenData.access_token });

      // Channel info
      let channelName = "Unknown";
      if (discordSdk.channelId) {
        const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });
        channelName = channel?.name ?? "Unknown";
      }

      // Guild info
      const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const guilds = await guildRes.json();
      const currentGuild = guilds.find((g: any) => g.id === discordSdk.guildId);

      const newUser: User = {
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

      setUser(newUser);
      setDebug(JSON.stringify(newUser, null, 2));
    } catch (err) {
      setDebug("Error: " + (err as Error).message);
    }
  }


  const { username, avatarUrl, channelName, guildIconUrl, isDiscordActivity } = User;
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
            <Button onClick={fetchUser}>Login</Button>
          </Flex >

        ) : (
          <>
            <Image src="/rocket.png" alt="Next.js logo" h={160} w={160} />
            <p>Welcome to the normal webpage version 🚀</p>
            <p>Jacob Rocks 👾</p>
            <Button onClick={fetchUser}>Login</Button>
          </>
        )
      }
      <pre style={{ fontSize: "12px", background: "#eee", padding: "8px" }}>
        {debug}
      </pre>
    </Group >
  );
}
