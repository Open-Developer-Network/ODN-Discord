import { NextResponse } from "next/server";
export async function POST(req: Request, context: { params: Promise<{ user: string }> }) {
    const { user } = await context.params;

    const mockSeasonalStats = {
        "data": {
            "history": {
                "metadata": {
                    "key": "RankPoints",
                    "name": "Rank Points",
                    "description": null
                },
                "data": [
                    [ //Ranked Match ELO last match
                        "2025-12-16T03:23:14.565+00:00",
                        {
                            "displayName": "Rank Points",
                            "metadata": {
                                "rank": "COPPER V",
                                "imageUrl": "https://r6data.eu/assets/img/r6_ranks_img/copper-5.webp",
                                "color": "#900201"
                            },
                            "value": 1092,
                            "displayValue": "1,092",
                            "displayType": "Number"
                        }
                    ],
                    [//Ranked Match ELO previous match
                        "2025-12-16T03:05:58.12+00:00",
                        {
                            "displayName": "Rank Points",
                            "metadata": {
                                "rank": "COPPER IV",
                                "imageUrl": "https://r6data.eu/assets/img/r6_ranks_img/copper-4.webp",
                                "color": "#900201"
                            },
                            "value": 1100,
                            "displayValue": "1,100",
                            "displayType": "Number"
                        }
                    ],
                    [
                        "2025-12-09T07:17:12.438+00:00",
                        {
                            "displayName": "Rank Points",
                            "metadata": {
                                "rank": "COPPER IV",
                                "imageUrl": "https://r6data.eu/assets/img/r6_ranks_img/copper-4.webp",
                                "color": "#900201"
                            },
                            "value": 1102,
                            "displayValue": "1,102",
                            "displayType": "Number"
                        }
                    ],
                    [
                        "2025-12-09T04:11:05.595+00:00",
                        {
                            "displayName": "Rank Points",
                            "metadata": {
                                "rank": "COPPER IV",
                                "imageUrl": "https://r6data.eu/assets/img/r6_ranks_img/copper-4.webp",
                                "color": "#900201"
                            },
                            "value": 1110,
                            "displayValue": "1,110",
                            "displayType": "Number"
                        }
                    ]
                ]
            },
            "leaderboard": null,
            "expiryDate": "0001-01-01T00:00:00+00:00",
            "bestMatches": null
        }
    }
    // Flatten to match your real API route
    return NextResponse.json({
        user,
        fetchedAt: Date.now(),
        ...mockSeasonalStats.data.history
    });
}