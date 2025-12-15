"use client"
import { DiscordSDK } from "@discord/embedded-app-sdk";
import { useState, useEffect } from "react";
import { Image, Container, Space, Flex, Group, Button } from '@mantine/core';
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

  async function fetchUser() {
    try {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUser({
        username: data.username,
        avatarUrl: data.avatarUrl,
        channelName: data.channelName,
        guildIconUrl: data.guildIconUrl
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }


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
            <Button onClick={fetchUser()}></Button>
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