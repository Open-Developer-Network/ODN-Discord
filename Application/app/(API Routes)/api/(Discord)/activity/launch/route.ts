// /api/discord/activity/launch?lfgId=123&game=r6
// This route is handled by the Discord Activity Service
// It launches a Discord activity for the specified LFG ID and game.
// Parameters:
// - lfgId: The ID of the LFG session
// - game: The game for which to launch the activity (e.g., r6 for Rainbow Six)
// returns a JSON response including the status of the launch operation App or Web.
// { "app": "discord://-/activity/123456789?game=r6&lfgId=abc123", "web": "https://discord.com/channels/@me?game=r6&lfgId=abc123" }


import { NextResponse } from "next/server";

const APP_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!;
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const game = searchParams.get("game");
    const lfgId = searchParams.get("lfgId");

    // Optional validation
    if (!game || !lfgId) {
        return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
        );
    }

    // Build deep links
    const query = `game=${game}&lfgId=${lfgId}`;

    const appLink = `discord://-/activities/${APP_ID}?${query}`;
    const webLink = `https://discord.com/channels/@me?${query}`;

    return NextResponse.json({
        app: appLink,
        web: webLink
    });
}
