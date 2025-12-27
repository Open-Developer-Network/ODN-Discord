"use client"
import { useState, useEffect, Suspense } from "react";
import NextLink from "next/link";
import {
  Image, Heading, Container, Flex, Box, Center, Stack, VStack, HStack, Code, Button, Link as ChakraLink, SimpleGrid, useBreakpointValue, Avatar,
  Card, Field,
  Fieldset,
  For,
  Input,
  NativeSelect, Text, NumberInput,
  IconButton, Strong,
  Presence,
  useDisclosure,
  ScrollArea
} from "@chakra-ui/react";
import Server from "@/components/types/server";
import DiscordClient from "@/components/lib/system/client";
import FrameIdReader from "@/components/lib/system/frameReader";
import { LuCheck, LuMinus, LuPlus, LuX } from "react-icons/lu";
import { NormalizeRank } from "@/components/lib/games/r6/utils/normalizeRank";
import { RankHistoryCard } from "@/components/lib/games/r6/components/RankHistoryCard";
import Privacy from "./(Pages)/privacy/page";
import Terms from "./(Pages)/terms/page";


import { getLaunchParams } from "@/app/lib/(Discord)/launch";
export default function Home() {

  const current = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  const [frameid, setFrameId] = useState<string | null>(null);
  const [client, setClient] = useState<DiscordClient | null>(null);
  async function handleEnter() {
    const instance = new DiscordClient();

    await instance.init();   // runs sdk.ready()
    setClient(instance);

    console.log("SDK initialized");
  }

  let [defaultCaptureTime, setDefaultCaptureTime] = useState<number>(1)
  const defaultAlloted = 5 * 60;
  let [defaultCountdownTime] = useState(() => (defaultCaptureTime + defaultAlloted))


  const [fields, setFields] = useState(
    {
      // status: string, state: string, startStamp: number, currentParty: number, maxParty: number, endStamp?: number
      status: 'Developing ODN', //Developing  | playing <Game Name>
      state: 'In Mainframe',  //Waiting in Queue | Starting Soon| Looking for group
      startStamp: defaultCaptureTime,    //Right now
      endStamp: defaultCountdownTime,    //Timer end
      title: '',  //Game Name
      details: '',
      currentParty: 1,
      maxParty: 4,
    })

  type LaunchContext = {
    game: string | null;
    lfgId: string | null;
    platform: string | null;
    action: string | null;
  };
  const [launch, setLaunch] = useState<LaunchContext | null>(null);
  const [deepLinkParams, setDeepLinkParams] = useState({});

  useEffect(() => {
    async function init() {
      const instance = new DiscordClient();
      instance.sdk.subscribe("DEEP_LINK" as any, ({ args }) => {
        console.log("DEEP_LINK params:", args);
        setDeepLinkParams(args || {});
      });
      await instance.init();   // runs sdk.ready()
      setClient(instance);
      const launchContext = await getLaunchParams();
      setLaunch(launchContext);
      console.log("Launch params:", launchContext);
    }
    init();

    const captureTime = Date.now() / 1000;
    setDefaultCaptureTime(captureTime)
  }, []);

  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const discordID = 123456789012345678; // Replace with dynamic Discord ID as needed
  const [exampleStat, setExampleStat] = useState<{ nameOnPlatform: string; platformType: string }>({
    nameOnPlatform: "MB_FRAG",
    platformType: "steam"
  });

  async function fetchStats() {
    setLoading(true);
    const res = await fetch(`/api/${discordID}/games/r6/stats/playerinfo/mock`,
      {
        method: "POST",
        body: JSON.stringify({
          nameOnPlatform: exampleStat.nameOnPlatform,
          platformType: exampleStat.platformType
        }),
        headers: { "Content-Type": "application/json" }
      });
    const data = await res.json();
    setStats(data);
    setLoading(false);
  }

  const { open, onToggle } = useDisclosure()



  return (
    <>
      <Suspense fallback={null}>
        <FrameIdReader onValue={setFrameId} />
      </Suspense>
      <HStack bg="blue" h={'10vh'} px={4} alignItems={'center'} pt={4}>Hi</HStack>

      <Center alignItems={'center'} justifyContent={'center'}>
        <Card.Root minH={"100vh"}>
          <Card.Body>
            <Card.Title textAlign={'center'}>Welcome to ODN LFG</Card.Title>
            <Center>
              <VStack>
                <Avatar.Root size={'2xl'}>
                  <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
                  <Avatar.Fallback name="MB_FRAG" />
                </Avatar.Root>
                <Stack gap="0">
                  <Text fontWeight="bold" textStyle="lg" textAlign={'center'}>
                    MB_FRAG
                  </Text>
                  <Text color="fg.muted" textStyle="md" textAlign={'center'}>
                    @mb_frag
                  </Text>
                </Stack>
              </VStack>
            </Center>

            <Button onClick={() => {
              const systemParams = Object.fromEntries(
                new URLSearchParams(window.location.search));
              const allParams = { ...systemParams, ...deepLinkParams, };
              const debugUrl = "https://example.com/debug?" + new URLSearchParams(allParams).toString();
              console.log("DEBUG URL:", debugUrl);
              window.location.href = debugUrl;
            }} >
              Debug Launch Params </Button>
            {launch &&
              (<Box mt={6} p={4} bg="gray.800" borderRadius="md">
                <Text fontWeight="bold">Launch Params</Text>
                <Text>Game: {launch.game}</Text>
                <Text>LFG ID: {launch.lfgId}</Text>
                <Text>Platform: {launch.platform}</Text>
                <Text>Action: {launch.action}</Text>
              </Box>
              )}

            <Card.Description textAlign={'center'} asChild>
              <Stack gap="4">

                <br /> Please read and accept our terms and conditions to use our platform.


                <Button alignSelf='center' onClick={onToggle} bg={'transparent'} color={'white'}>
                  Terms and Conditions
                </Button>

                <Presence
                  present={open}
                  animationName={{ _open: "fade-in", _closed: "fade-out" }}
                  animationDuration="moderate"
                >
                  <Center p="10" layerStyle="fill.muted">

                    <ScrollArea.Root height="15rem" maxW="xs">
                      <ScrollArea.Viewport>
                        <ScrollArea.Content spaceX="4" textAlign={'left'}>
                          <Terms />
                          <Privacy />
                        </ScrollArea.Content>
                      </ScrollArea.Viewport>
                      <ScrollArea.Scrollbar>
                        <ScrollArea.Thumb />
                      </ScrollArea.Scrollbar>
                      <ScrollArea.Corner />
                    </ScrollArea.Root>
                  </Center>
                </Presence>
              </Stack>
              <br />he
              <Text textAlign={'center'}>You can approve or decline below.</Text>

            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Button variant="subtle" colorPalette="red" flex="1">
              <LuX />
              Decline
            </Button>
            <Button variant="subtle" colorPalette="blue" flex="1">
              <LuCheck />
              Approve
            </Button>
          </Card.Footer>
        </Card.Root>
      </Center>

    </>
  )
}

