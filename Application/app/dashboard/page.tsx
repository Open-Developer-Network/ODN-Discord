"use client"
import { useState, useEffect } from "react";
import NextLink from "next/link";
import {
    Image, Heading, Container, Flex, Box, Center, Stack, VStack, HStack, Code, Button, Link as ChakraLink, SimpleGrid, useBreakpointValue, Avatar,
    Card
} from "@chakra-ui/react";
import Server from "@/components/types/server";
import DiscordClient from "@/components/types/client";

export default function Dashboard() {

    const current = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
        "2xl": "2xl",
    });




    const [user, setUser] = useState<DiscordClient | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleConnect = async () => {
        setIsLoading(true);
        const client = new DiscordClient();
        await client.init();
        const guilds = await client.fetchGuilds();
        client.data.guilds = guilds;
        const userProfile = await client.fetchCurrentUser();
        const userProfileStatus = await client.setCurrentUserStatus();
        client.data.profile = userProfile;
        setUser(client);
        // await client.authorizeClient();
        // if (user === null) setUser(client);
        // await client.verifyClient("/api/token");
        // await client.AuthenticateUser();
        // await client.IdentifyUserServer();
        setIsLoading(false);
    };

    // type AuthUser = {
    //   username: string | null | undefined;
    //   avatarUrl: string | null | undefined;
    //   channelName: string | null | undefined;
    //   guildIconUrl: string | null | undefined;
    //   isDiscordActivity: boolean;
    // };



    // // Create an instance
    // const myServer = new Server(
    //   "My Awesome Server",
    //   1282475742344646696,
    //   "https://cdn.discordapp.com/icons/1282475742344646696/a_abcdef1234567890.gif?size=1024",
    //   "DiscordUser",
    //   "https://cdn.discordapp.com/avatars/123456789012345678/abcdef1234567890.png",
    //   "general",
    //   "https://cdn.discordapp.com/icons/1282475742344646696/a_abcdef1234567890.gif?size=1024"
    // );
    // const [User, setServerUser] = useState<AuthUser | null>(null);
    // const { username, avatarUrl, channelName, guildIconUrl } = User;
    // const [serverData, setServerData] = useState<Server | null>(null);
    // async function FetchUser() {
    //   setIsLoading(true);
    //   try {
    //     // Example: simulate a fetch
    //     await new Promise(resolve => setTimeout(resolve, 1000));

    //     // Create your Server instance once "data" is ready
    //     const myServer = new Server(
    //       "Coding United Commons",
    //       1282475742344646696,
    //       "https://cdn.discordapp.com/icons/1282475742344646696/a_abcdef1234567890.gif?size=1024"
    //     );
    //     setServerData(myServer);
    //   } catch (err) {
    //     console.error("Failed to fetch server data:", err);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    let i = 0;
    return (
        <>

            {user?.isDiscordActivity ?
                // Load if Discord Activity
                (
                    <>
                        {
                            current !== "base" && current !== "sm" && current !== "md" ?
                                // Load if larger than md
                                (<>
                                    <VStack justifyContent={'space-between'} h={'100vh'} w={'100vw'} bg={"#a5d8ff"}>
                                        <Container>
                                            <HStack direction={'row'}>
                                                <Image src="/rocket.png" alt="Next.js logo" w={100} h={100} />
                                                <Stack direction={'row'}>
                                                    <Center></Center>
                                                </Stack>
                                                <Box></Box>
                                            </HStack>
                                        </Container>
                                        <Container bg={'black'} h={"100%"} fluid p={0}>
                                            <Stack direction={'column'} bg={'green'} w={"25vw"}>

                                                <Stack direction={'column'}>Search</Stack>
                                                <Stack direction="column" gap={4} align="center" pt={20}  >
                                                    <Stack direction='column' gap={4} align="center" pt={20}  >
                                                        <div >
                                                            {/* <Logo style={{ width: 120 }} /> */}
                                                            ODN
                                                            <Code w={700}>v3.1.2</Code>
                                                        </div>

                                                    </Stack>

                                                    <Button>
                                                        <ChakraLink asChild>
                                                            <NextLink href="/dashboard">
                                                                Click here
                                                            </NextLink>
                                                        </ChakraLink>
                                                    </Button>
                                                    <Button>
                                                        <ChakraLink asChild>
                                                            <NextLink href="/terms">
                                                                ToS
                                                            </NextLink>
                                                        </ChakraLink>
                                                    </Button>

                                                    <Button>
                                                        <ChakraLink asChild>
                                                            <NextLink href="/high">
                                                                High
                                                            </NextLink>
                                                        </ChakraLink>
                                                    </Button>
                                                </Stack>
                                                <Flex direction="row" align="center"
                                                    justify="flex-start" gap={'lg'}>
                                                    <Image src="/rocket.png" alt="Next.js logo" w={100} h={100} />
                                                    {/* <p>Activity Channel: {user.channelName}</p> */}
                                                    <br />
                                                    <p>Server:</p>
                                                    {/* {User.guildIconUrl && (
                              <Image src={User.guildIconUrl} alt="Guild icon" w={100} h={100} />
                            )} */}
                                                    <br />
                                                    <br />
                                                    {/* <p>User: {User.username}</p> */}
                                                    <Avatar.Root>
                                                        {/* <Avatar.Image src={User.avatarUrl} alt="User avatar" /> */}

                                                    </Avatar.Root>
                                                    {/* {User.avatarUrl && (
                              <Image src={User.avatarUrl} alt="User avatar" w={100} h={100} />
                            )} */}
                                                    {user.isDiscordActivity ? <p>Running inside Discord Activity</p> : <p>Running as a normal webpage</p>}
                                                    {user.data.guilds ? (<p>Fetched {user.data.guilds.length} Servers</p>) : (<p>No Servers Fetched</p>)}

                                                    <Box>{user.data.profile.avatar.png}</Box>
                                                    <SimpleGrid>{user.data.guilds?.map((server, index) => (
                                                        <Card.Root key={server.id} size={'sm'} w={"sm"}>
                                                            {/* {server.icon && (
                                <Image src={} alt="Guild icon" w={100} h={100} />
                              )} */}
                                                            <Card.Title>{server.name}</Card.Title>
                                                            <Card.Body>{index + 1}. {server.name}</Card.Body>
                                                        </Card.Root>
                                                    ))}</SimpleGrid>


                                                    {user.isDiscordActivity ? <p>Running inside Discord Activity</p> : <p>Running as a normal webpage</p>}
                                                    {!user && <Button onClick={handleConnect} loading={isLoading} loadingText="Saving...">Fetch Server Data</Button>}

                                                </Flex >
                                            </Stack>
                                        </Container>
                                    </VStack>

                                </>
                                ) : (
                                    <Flex direction="row" align="center"
                                        justify="flex-start" gap={'lg'}>
                                        <Image src="/rocket.png" alt="Next.js logo" w={100} h={100} />
                                        {/* <p>Activity Channel: {User.channelName}</p> */}
                                        <br />
                                        <p>Server:</p>
                                        {/* {User.guildIconUrl && (
                      <Image src={User.guildIconUrl} alt="Guild icon" w={100} h={100} />
                    )} */}
                                        <br />
                                        <br />
                                        {/* <p>User: {User.username}</p> */}
                                        {/* {User.avatarUrl && (
                      <Image src={User.avatarUrl} alt="User avatar" w={100} h={100} />
                    )} */}
                                    </Flex >)
                        }
                    </>
                ) :

                (
                    //  Load if NOT Discord Activity
                    <>
                        {
                            current !== "base" && current !== "sm" && current !== "md" ?
                                // Load if larger than md
                                (
                                    <>
                                        <HStack justifyContent={'space-between'} bg={"blue"} h={'15vh'} px={4}>
                                            <HStack>
                                                <Image src="/rocket.png" alt="Next.js logo" boxSize={"15vh"} />
                                                <Heading>ODN</Heading>
                                            </HStack>

                                            <HStack  >
                                                <Box bg={"orange"} h={12} w={24} />
                                                <Box bg={"orange"} h={12} w={24} />
                                                <Box bg={"orange"} h={12} w={24} />
                                            </HStack>
                                        </HStack>
                                        <Container>
                                            <p>Welcome to the normal webpage version🚀</p>
                                            <p>Jacob Rocks 👾</p>
                                            <Button onClick={handleConnect} loading={isLoading} loadingText="Saving...">Fetch Server Data</Button>

                                        </Container>



                                        {/* <p>Server Name: {serverData && serverData.getName()}</p> */}
                                        {/* <p>Server ID: {serverData && serverData.getServerId()}</p> */}
                                        {/* {serverData && serverData.getIconUrl() && (
                      <Image src={serverData && serverData.getIconUrl()} alt="Server icon" h={160} w={160} />
                    )} */}
                                        {/* <Button onClick={FetchUser} loading={isLoading} loadingText="Saving...">Fetch Server Data</Button> */}
                                    </>
                                ) : (
                                    <>
                                        <Image src="/rocket.png" alt="Next.js logo" h={160} w={160} />
                                        <p>Welcome to the normal webpage version 🚀</p>
                                        <p>Jacob Rocks 👾</p>
                                    </>
                                )
                        }
                    </>
                )
            }


        </>
    )
}