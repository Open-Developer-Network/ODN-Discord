"use client"
import { DiscordSDK } from "@discord/embedded-app-sdk";
import { useState, useEffect } from "react";
import { Image, Container, Space, Flex, Group, Button } from '@mantine/core';
import { channel } from "diagnostics_channel";
import type { User } from "@/components/types/user";
export default function Home() {


  const [User, setUser] = useState<User>({
    username: "Unknown",
    avatarUrl: "Unknown",
    channelName: "Unknown",
    guildIconUrl: "Unknown",
    isDiscordActivity: false,
  });
  const [debug, setDebug] = useState<string>("");
  async function fetchUser() {
    try {
      const res = await fetch("/api/user" + window.location.search);
      const data: User = await res.json();
      setUser(data);
      setDebug(JSON.stringify(data, null, 2)); // show raw response

    } catch (err) {
      console.error("Error fetching user data:", err);
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
