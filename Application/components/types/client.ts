import { DiscordSDK } from "@discord/embedded-app-sdk";
export default class DiscordClient {
    // Discord SDK Instance
    private discordSdk: DiscordSDK;
    private auth: any | null = null;

    // Custom Tokens and Response
    private auth_token: string | null = null;
    private access_token: string | null = null;
    private response: Response | null;
    private params: URLSearchParams;
    private frameId: string | null;
    isDiscordActivity: boolean;
    verifyClientToken: string | null = null;
    data: {
        auth_token: string | null;
        access_token: string | null;
        profile: any | null;
        guilds: any[] | null;
    }

    constructor() {
        this.discordSdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
        this.auth_token = null;
        this.access_token = null;
        this.params = new URLSearchParams(window.location.search);
        this.frameId = this.params.get("frame_id");
        this.isDiscordActivity = this.frameId !== null;
        this.isDiscordActivity ? console.log("Running inside Discord Activity") : console.log("Running as a normal webpage");
        this.response = null;
        this.verifyClientToken = null;
        this.data = {
            auth_token: null,
            access_token: null,
            profile: null,
            guilds: null,
        };
    }

    async init() {
        await this.discordSdk.ready();
        console.log("Discord SDK is ready");
        const { code } = await this.discordSdk.commands.authorize({
            client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
            response_type: "code",
            state: "",
            prompt: "none",
            scope: ["identify", "guilds", "applications.commands"],
        });

        const response = await fetch(
            "/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                { code }
            ),
        });
        const { access_token } = await response.json();

        this.auth = await this.discordSdk.commands.authenticate(
            { access_token, }
        );
        if (!this.auth) { throw new Error("Authenticate command failed"); }
        console.log("Discord SDK is authenticated");
    }

    //   Get the authenticated user object
    getAuth() {
        return this.auth;
    }

    // Example helper: make API calls after authentication
    async fetchGuilds() {
        if (!this.auth) {
            throw new Error("Client is not authenticated");
        }
        try {
            const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
                headers: {
                    Authorization: `Bearer ${this.auth.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch guilds");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching guilds:", error);
            throw error;
        }
    }

    // Example helper: make API calls after authentication
    async fetchCurrentUser() {
        if (!this.auth) {
            throw new Error("Client is not authenticated");
        }
        try {
            const response = await fetch("https://discord.com/api/v10/users/@me", {
                headers: {
                    Authorization: `Bearer ${this.auth.access_token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch current user");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching current user:", error);
            throw error;
        }
    }
    async setCurrentUserStatus() {
        
        // type: number;
        // name: string;

        // details ?: string | null | undefined;
        // await this.discordSdk.ready();
        // console.log("Discord SDK is ready");

        // const { type,
        //     name,
        //     details
        // } = await this.discordSdk.commands.setActivity({
        //     activity: {
        //         type: 0,
        //         name: "ODN-Discord Activity",
        //         details: "Using ODN-Discord in an Activity",
        //     }
        // });

        // const response = await fetch(
        //     "/api/token", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(
        //         { code }
        //     ),
        // });
        // const { access_token } = await response.json();

        // this.auth = await this.discordSdk.commands.authenticate(
        //     { access_token, }
        // );
        // if (!this.auth) { throw new Error("Authenticate command failed"); }
        // console.log("Discord SDK is authenticated");



    }


    setAuthToken(auth_token: string | null): string | null {
        this.auth_token = auth_token;
        this.data.auth_token = auth_token;
        return this.auth_token;
    }

    //Step 1: Authorize Client and get auth_token
    async authorizeClient(): Promise<string> {
        await this.discordSdk.ready();
        const { code } = await this.discordSdk.commands.authorize({
            client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
            response_type: "code",
            state: "",
            prompt: "none",
            scope: ["identify", "guilds", "applications.commands"],
        });
        this.setAuthToken(code);
        return code;
    }
    //Step 2: Exchange auth_token for access_token
    setAccessToken(access_token: string | null): string | null {
        this.access_token = access_token;
        this.data.access_token = access_token;
        return this.access_token;
    }
    //Step 3: Store response from token exchange
    setResponse(response: Response | null): Response | null {
        this.response = response;
        return this.response;
    }
    //Step 4: Verify Client by sending auth_token to backend
    async verifyClient(route: string): Promise<Response | null> {
        // To be changed if needed.. current should be: "/api/token"
        const auth_token = this.auth_token
        route = "/api/token";
        const response = await fetch(route,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ auth_token }),
            });
        const data = await response.json();
        this.setAccessToken(data.access_token);
        this.setResponse(response);
        this.data.access_token = data.access_token; // keep data in sync
        return Promise.resolve(this.response);
    }


    //Step 5: Authenticate User with access_token
    async AuthenticateUser(): Promise<boolean> {
        if (!this.access_token) return false;

        try {
            const response = await fetch("https://discord.com/api/users/@me", {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            });
            if (response.ok) {
                this.data.profile = await response.json();
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Token verification failed:", error);
            return false;
        }
    }
    //Step 6: Identify User's Server with access_token
    async IdentifyUserServer(): Promise<boolean> {
        if (!this.access_token) return false;

        try {
            const response = await fetch("https://discord.com/api/users/@me/guilds", {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            });
            if (response.ok) {
                this.data.guilds = await response.json();
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Token verification failed:", error);
            return false;
        }
    }

    //Step 7: Verify Token validity
    async verifyToken(route: string): Promise<boolean> {

        try {
            const response = await fetch("https://discord.com/api/users/@me", {
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                },
            });
            return response.ok;
        }
        catch (error) {
            console.error("Token verification failed:", error);
            return false;
        }
    }
}

// const sample = async () => {
//     await discordSdk.ready();
//     console.log("Discord SDK is ready");

//     // Authorize with Discord Client
//     const { code } = await discordSdk.commands.authorize({
//         client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
//         response_type: "code",
//         state: "",
//         prompt: "none",
//         scope: [
//             "identify",
//             "guilds",
//             "applications.commands"
//         ],
//     });

//     // Retrieve an access_token from your activity's server
//     const response = await fetch("/api/token", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             code,
//         }),
//     });
//     const { access_token } = await response.json();

//     // Authenticate with Discord client (using the access_token)
//     auth = await discordSdk.commands.authenticate({
//         access_token,
//     });

//     if (auth == null) {
//         throw new Error("Authenticate command failed");
//     }
// }