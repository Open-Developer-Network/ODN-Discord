// import { DiscordSDK } from "@discord/embedded-app-sdk";
// import type { User } from "@/components/types/user";

export async function getDiscordUser(){ }
// export async function getDiscordUser(): Promise<User> { 
//     const discordSdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
//     await discordSdk.ready();

//     // Step 1: Authorize
//     const { code } = await discordSdk.commands.authorize({
//         client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
//         response_type: "code",
//         state: "",
//         prompt: "none",
//         scope: ["identify", "guilds", "applications.commands"],
//     });

//     // Step 2: Exchange code for token via API route
//     const tokenRes = await fetch("/api/token", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ code }),
//     });
//     const tokenData = await tokenRes.json();

//     // Step 3: Authenticate
//     const auth = await discordSdk.commands.authenticate({ access_token: tokenData.access_token });

//     // Step 4: Channel info
//     let channelName = "Unknown";
//     if (discordSdk.channelId) {
//         const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });
//         channelName = channel?.name ?? "Unknown";
//     }

//     // Step 5: Guild info
//     const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
//         headers: { Authorization: `Bearer ${tokenData.access_token}` },
//     });
//     const guilds = await guildRes.json();
//     const currentGuild = guilds.find((g: any) => g.id === discordSdk.guildId);

//     return {
//         username: auth.user.username ?? "Unknown",
//         avatarUrl: auth.user.avatar
//             ? `https://cdn.discordapp.com/avatars/${auth.user.id}/${auth.user.avatar}.png`
//             : null,
//         channelName,
//         guildIconUrl: currentGuild?.icon
//             ? `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png`
//             : null,
//         isDiscordActivity: true,
//     };
// }
