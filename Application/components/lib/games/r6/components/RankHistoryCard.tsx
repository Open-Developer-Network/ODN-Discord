"use client";
import { Image, Card } from "@chakra-ui/react"
import { NormalizeRank } from "@/components/lib/games/r6/utils/normalizeRank";


export function RankHistoryCard({ timestamp, info }: { timestamp: string; info: any; }) {
    const date = new Date(timestamp).toLocaleString();
    const { tier, division } = NormalizeRank(info.metadata.rank);
    const imagePath = division
        ? `/R6/ranks/${tier}/R6-${tier}${division}.webp`
        : `/R6/ranks/${tier}/R6-${tier}.webp`;

    return (
        <Card.Root style={{ padding: 16 }} size={'sm'} maxW={'xs'} h={'xs'}>
            <Card.Title style={{ marginBottom: 12 }}>
                Rank History
            </Card.Title>

            {/* {!stats?.data?.history?.data && (
                <p>No rank history available.</p>
            )} */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, marginBottom: 10, background: "#1a1a1a", borderRadius: 8, border: "1px solid #333" }} >
                {/* Rank Image */}
                <Image src={imagePath} alt={`${tier}`} width={50} height={50} style={{ borderRadius: 4 }} />
                {/* Rank Info */}
                <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 16 }}>
                        {info.metadata.rank}
                    </strong>
                    <div style={{ color: "#aaa", fontSize: 12 }}>
                        {date}
                    </div>
                </div>
                {/* RP Value */}
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, color: info.metadata.color }}> {info.displayValue}
                    </div>
                    <div style={{ fontSize: 12, color: "#888" }}>
                        RP
                    </div>
                </div>
            </div>
        </Card.Root >
    );
}