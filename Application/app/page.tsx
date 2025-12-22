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
  IconButton
} from "@chakra-ui/react";
import Server from "@/components/types/server";
import DiscordClient from "@/components/lib/system/client";
import FrameIdReader from "@/components/lib/system/frameReader";
import { LuMinus, LuPlus } from "react-icons/lu";
import { NormalizeRank } from "@/components/lib/games/r6/utils/normalizeRank";
import { RankHistoryCard } from "@/components/lib/games/r6/components/RankHistoryCard";

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

  useEffect(() => {
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

  return (
    <><Suspense fallback={null}>
      <FrameIdReader onValue={setFrameId} />
    </Suspense>
      <HStack bg="blue" h={'10vh'} px={4} alignItems={'center'} pt={4}>Hi</HStack>
      < Button onClick={handleEnter}>Enter</Button >

      <Button onClick={() => { client?.log("Hello from the Activity!") }}>
        Discord Log
      </Button>

      <Card.Root maxW={'md'}>
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Card.Title><Fieldset.Legend>Activity details</Fieldset.Legend></Card.Title>
            <Card.Description><Fieldset.HelperText>
              Please provide your activity details below.
            </Fieldset.HelperText></Card.Description>

          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Title</Field.Label>
              <Input name="Title" value={fields.title}
                onChange={(e) =>
                  setFields((fields) => ({
                    ...fields,
                    title: e.target.value,
                  }))} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Details</Field.Label>
              <Input name="Details" value={fields.details}
                onChange={(e) =>
                  setFields((fields) => ({
                    ...fields,
                    details: e.target.value,
                  }))} />
            </Field.Root>

            <Field.Root>
              <Field.Label>State</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name="State" onChange={(e) => setFields((fields) => ({
                  ...fields,
                  state: e.target.value,
                }))}>
                  <For each={["Testing ODN", "Using ODN", "Developing ODN"]}>
                    {(item) => (
                      <option key={item} value={item} >
                        {item}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
            <Field.Root>
              <Field.Label>Status</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name="Status" onChange={(e) => setFields((fields) => ({
                  ...fields,
                  status: e.target.value,
                }))}>
                  <For each={["Waiting in Queue", "Starting Soon", "Looking for group"]}>
                    {(item) => (
                      <option key={item} value={item} >
                        {item}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
            <Field.Root>
              <Field.Label>Current Participants</Field.Label>
              <NumberInput.Root defaultValue="1" unstyled spinOnPress={false} onValueChange={(e: { value: string; valueAsNumber: number }) => setFields((fields) => ({
                ...fields,
                currentParty: Number(e.valueAsNumber),
              }))}>
                <HStack gap="2">
                  <NumberInput.DecrementTrigger asChild >
                    <IconButton variant="outline" size="sm">
                      <LuMinus />
                    </IconButton>
                  </NumberInput.DecrementTrigger>
                  <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                  <NumberInput.IncrementTrigger asChild>
                    <IconButton variant="outline" size="sm">
                      <LuPlus />
                    </IconButton>
                  </NumberInput.IncrementTrigger>
                </HStack>
              </NumberInput.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label>Max Participants</Field.Label>
              <NumberInput.Root defaultValue="4" unstyled spinOnPress={false} onValueChange={(e: { value: string; valueAsNumber: number }) => setFields((fields) => ({
                ...fields,
                maxParty: Number(e.valueAsNumber),
              }))}>
                <HStack gap="2">
                  <NumberInput.DecrementTrigger asChild>
                    <IconButton variant="outline" size="sm">
                      <LuMinus />
                    </IconButton>
                  </NumberInput.DecrementTrigger>
                  <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                  <NumberInput.IncrementTrigger asChild>
                    <IconButton variant="outline" size="sm">
                      <LuPlus />
                    </IconButton>
                  </NumberInput.IncrementTrigger>
                </HStack>
              </NumberInput.Root>
            </Field.Root>
          </Fieldset.Content>
          {/* 'A new LFG Platform. Click here to [signup](https://localhost:3000).' */}
          <Text>{fields.state}</Text>
          <Text>{fields.status}</Text>
          <Text>{fields.title}</Text>
          <Text>{fields.details}</Text>
          <Text>{fields.currentParty}</Text>
          <Text>{fields.maxParty}</Text>
          <Button alignSelf="flex-start" onClick={() => {
            // action: string, message?: string, maxParticipants?: number, timestamp?: number, status?: string
            client?.ActivityInfo({
              status: fields.status,
              state: fields.state,
              currentParty: fields.currentParty,
              maxParty: fields.maxParty,
              startStamp: fields.startStamp,
              endStamp: fields.endStamp,
            })
          }}>
            Update Discord Activity
          </Button>
        </Fieldset.Root>
      </Card.Root>
      {loading && <p>Loading...</p>}
      {stats && (
        <SimpleGrid columns={1} gap={4} mt={4}>

          {stats?.data?.map(([timestamp, info]: [string, any], index: number) => {
            return <RankHistoryCard key={index} timestamp={timestamp} info={info} />
          })}

        </SimpleGrid >)
      }
      <Button
        onClick={fetchStats}
      >
        Get Seasonal Stats
      </Button>


      <Button onClick={() => (console.log("Discord SDK is ready"))} >Log Me</Button >
    </>
  )
}