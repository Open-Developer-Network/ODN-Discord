import { DiscordSDK, patchUrlMappings } from "@discord/embedded-app-sdk";

type Scopes = "applications.builds.upload" | "applications.builds.read" | "applications.store.update" | "applications.entitlements" | "bot" | "identify" | "connections" | "email" | "gdm.join" | "guilds" | "guilds.join" | "guilds.members.read" | "messages.read" | "relationships.read" | 'rpc.activities.write' | "rpc.notifications.read" | "rpc.voice.write" | "rpc.voice.read" | "webhook.incoming"

export default class DiscordClient {
    // Step 1: Create a client
    sdk: DiscordSDK;
    accessToken: null | string = null;
    authScopes: Scopes[] | null = null;

    constructor() {
        this.sdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!)
    }
    async init() {
        return await this.sdk.ready()
    }
    async authorize(scopes?: Scopes[]) {
        const mergedScopes = scopes ?? this.authScopes ?? ["identify", "guilds"];
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
        if (!this.accessToken) {
            const code = await this.authorize(scopes)
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
    async ActivityInfo({ status, state, currentParty, maxParty, startStamp, endStamp }: { status: string, state: string, currentParty: number, maxParty: number, startStamp: number, endStamp?: number }) {
        // Require rpc.activities.write
        if (!this.authScopes?.includes("rpc.activities.write")) {
            console.warn(`Missing required scope: rpc.activities.write\n
                Reauth required to use this feature.\n
                Please restart activity...`);

            const newScopes: Scopes[] = [...(this.authScopes ?? []), "rpc.activities.write"];
            this.authScopes = newScopes
            const code = await this.authorize(this.authScopes)
            this.accessToken = await this.exchangeAuth(code)
            await this.authenticate()
            return;
        }
        return await this.sdk.commands.setActivity({
            activity: {
                type: 0,

                // state_url: "https://www.twitch.tv/discord",
                details: status ? status : "Test 1",
                state,
                timestamps: {
                    start: startStamp, //? startStamp : 1734652312,
                    end: endStamp, //? endStamp : startStamp + 1, //endStamp
                },
                // TO USE WHEN IMPLEMENTING LFG
                party: {
                    size: [currentParty, maxParty]
                }
            }
        });
    }


    // Step 2: Client needs to connect to Discord API
    // Step 3: Authenticate/Authorize/Verify client
    // Step 4: Populate a User, Servers, and 
}