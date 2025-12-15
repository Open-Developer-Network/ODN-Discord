"use client";
import { useState } from "react";
import { Image, Flex, Group, Button } from "@mantine/core";
import type { User } from "@/components/types/user";

export default function Home() {
  const [user, setUser] = useState<User>({
    username: "Unknown",
    avatarUrl: null,
    channelName: "Unknown",
    guildIconUrl: null,
    isDiscordActivity: false,
  });
  const [debug, setDebug] = useState("");

  async function fetchUser() {
    try {
      const res = await fetch("/api/user" + window.location.search);
      const data: User = await res.json();
      setUser(data);
      setDebug(JSON.stringify(data, null, 2));
    } catch (err) {
      setDebug("Error: " + (err as Error).message);
    }
  }

  return (
    <Group pl={40} pt={20} bg={"#a5d8ff"}>
      {user.isDiscordActivity ? (
        <Flex direction="row" align="center" gap="lg">
          <Image src="/rocket.png" alt="Next.js logo" w={100} h={100} />
          <p>Activity Channel: {user.channelName}</p>
          <p>Server:</p>
          {user.guildIconUrl && <Image src={user.guildIconUrl} alt="Guild icon" w={100} h={100} />}
          <p>User: {user.username}</p>
          {user.avatarUrl && <Image src={user.avatarUrl} alt="User avatar" w={100} h={100} />}
          <Button onClick={fetchUser}>Login</Button>
        </Flex>
      ) : (
        <>
          <Image src="/rocket.png" alt="Next.js logo" h={160} w={160} />
          <p>Welcome to the normal webpage version 🚀</p>
          <Button onClick={fetchUser}>Login</Button>
        </>
      )}
      <pre style={{ fontSize: "12px", background: "#eee", padding: "8px" }}>{debug}</pre>
    </Group>
  );
}
