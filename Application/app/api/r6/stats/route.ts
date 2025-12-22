import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { nameOnPlatform, platformType } = await req.json();

    const url = `https://api.r6data.eu/api/stats?type=seasonalStats&nameOnPlatform=${nameOnPlatform}&platformType=${platformType}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: "Failed to fetch R6 stats" },
            { status: res.status }
        );
    }

    const data = await res.json();
    return NextResponse.json(data);
}
