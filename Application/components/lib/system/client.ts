import { DiscordSDK, patchUrlMappings } from "@discord/embedded-app-sdk";

type Scopes = "applications.builds.upload" | "applications.builds.read" | "applications.store.update" | "applications.entitlements" | "bot" | "identify" | "connections" | "email" | "gdm.join" | "guilds" | "guilds.join" | "guilds.members.read" | "messages.read" | "relationships.read" | 'rpc.activities.write' | "rpc.notifications.read" | "rpc.voice.write" | "rpc.voice.read" | "webhook.incoming"

export default class DiscordClient {
    // Step 1: Create a client
    sdk: DiscordSDK;
    accessToken: null | string = null;
    authScopes: Scopes[] | null = ["identify", "guilds"];
    sessionSecret = crypto.randomUUID();
    joinSecret = crypto.randomUUID();


    constructor() {
        this.sdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!)
    }

    async init() {
        await this.sdk.ready()
        // this.sdk.subscribe("ACTIVITY_JOIN_REQUEST", ({ user }) => {
        //     console.log("Join request from:", user);
        //     if (this.onJoinRequest) this.onJoinRequest(user);
        // });

        return true;
    }
    async authorize(scopes?: Scopes[]) {
        const requiredScopes = scopes ?? this.authScopes ?? [];
        const mergedScopes = [...new Set(requiredScopes)];
        const { code } = await this.sdk.commands.authorize({
            client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
            response_type: "code",
            state: "Awesome",
            prompt: "none",
            scope: mergedScopes,
        })
        this.authScopes = mergedScopes
        return code;
    }

    async exchangeAuth(code: string) {
        const res = await fetch("/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });
        const data = await res.json();
        return data.access_token;
    }

    async authenticate(scopes?: Scopes[]) {
        const requiredScopes = scopes ?? this.authScopes ?? [];
        if (!this.accessToken) {
            const code = await this.authorize(requiredScopes)
            this.accessToken = await this.exchangeAuth(code);
        }
        return await this.sdk.commands.authenticate({
            access_token: this.accessToken
        })
    }
    async log(message: string) {
        if (!this.accessToken) {
            const code = await this.authorize()
            this.accessToken = await this.exchangeAuth(code);
        }
        return await this.sdk.commands.captureLog({
            level: "log",
            message,
        });
    }

    async launch() {
        const search = this.sdk._getSearch();
        const params = new URLSearchParams(search);
        return {
            game: params.get("game"),
            lfgId: params.get("lfgId"),
            platform: params.get("platform"),
            action: params.get("action")
        };
    }
    // TO USE IN THE FUTURE
    // async joinActivity() {
    //     // Accept automatically:
    //     this.sdk.commands.sendActivityJoinInvite({
    //         user_id: user.id
    //     });
    //     return await this.sdk.subscribe("ACTIVITY_JOIN", ({ secret }) => {
    //         console.log("Joining activity with secret:", secret);
    //     });
    // }

    // async acceptActivityJoinRequest(userId: string) {
    //     return await this.sdk.commands.sendActivityJoinInvite({
    //         user_id: userId
    //     });
    // }

    // async rejectActivityJoinRequest(userId: string) {
    //     return await this.sdk.commands.closeActivityJoinRequest({
    //         user_id: userId
    //     });
    // }

    // async leaveActivity() {
    //     return await this.sdk.subscribe("ACTIVITY_JOIN", ({ secret }) => {
    //         console.log("Leaving activity with secret:", secret);
    //     });
    // }

    async ActivityInfo({ status, state, currentParty, maxParty, startStamp, endStamp }: { status: string, state: string, currentParty: number, maxParty: number, startStamp: number, endStamp?: number }) {
        // Require rpc.activities.write
        if (!this.authScopes?.includes("rpc.activities.write",)) {
            console.warn(`Missing required scope: rpc.activities.write\n
                Reauth required to use this feature.\n
                Please restart activity...`);
            // , "identify", "guilds", "rpc.voice.read", "rpc.voice.write", "rpc.notifications.read"
            const newScopes: Scopes[] = [...(this.authScopes ?? []), "rpc.activities.write"];
            // Remove duplicates
            const mergedScopes = [...new Set(newScopes)];

            this.authScopes = mergedScopes
            const code = await this.authorize(mergedScopes)
            this.accessToken = await this.exchangeAuth(code)
            await this.authenticate(mergedScopes)
            return;
        }
        // Generate unique secrets for party and join secrets

        return await this.sdk.commands.setActivity({
            activity: {
                type: 0,
                // state_url: "https://www.twitch.tv/discord",
                details: status || "Test 1",
                // details_url: "https://opendevelopernetwork.com",
                state,
                // state_url: "https://github.com/Open-Developer-Network",
                timestamps: {
                    start: startStamp, //? startStamp : 1734652312,
                    end: endStamp, //? endStamp : startStamp + 1, //endStamp
                },
                // TO USE WHEN IMPLEMENTING LFG
                party: {
                    id: `odn-session-${this.sessionSecret}`,
                    size: [currentParty, maxParty]
                },
                secrets: {
                    join: `join-odn-session-${this.joinSecret}`
                }
            }
        });
    }


    // Step 2: Client needs to connect to Discord API
    // Step 3: Authenticate/Authorize/Verify client
    // Step 4: Populate a User, Servers, and 
}