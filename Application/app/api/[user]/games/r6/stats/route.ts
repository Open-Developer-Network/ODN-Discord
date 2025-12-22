import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, context: { params: Promise<{ user: string }> }) {
    const { user } = await context.params; // ← this is the [user] segment
    if (!user) {
        return NextResponse.json({
            error: "Missing user parameter"
        }, {
            status: 400
        });
    }
    const body = await req.json();
    const { nameOnPlatform, platformType } = body;
    if (!nameOnPlatform || !platformType) {
        return NextResponse.json({
            error: "Missing nameOnPlatform or platformType"

        }, {
            status: 400
        });
    }

    const url = `https://api.r6data.eu/api/stats?type=seasonalStats&nameOnPlatform=${encodeURIComponent(
        nameOnPlatform
    )}&platformType=${platformType}`;

    const res = await fetch(url, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: "Failed to fetch R6 stats" },
            { status: res.status }
        );
    }

    const data = await res.json();
    return NextResponse.json({
        user,
        fetchedAt: Date.now(),
        ...data.data.history
    });
}
