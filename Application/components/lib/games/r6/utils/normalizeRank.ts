export function NormalizeRank(rank: string) {
    const romanMap: Record<string, number> = {
        "I": 1,
        "II": 2,
        "III": 3,
        "IV": 4,
        "V": 5
    };
    if (!rank) { return { tier: null, division: null }; }
    // Example: "COPPER IV"
    const parts = rank.trim().split(" ");
    // Champion has no numeral
    if (parts.length === 1) {
        // "champion"
        return {
            tier: parts[0].toLowerCase(),
            division: null

        };
    }
    // Normal ranks like "COPPER IV"
    const tier = parts[0].toLowerCase();
    const roman = parts[1];
    const division = romanMap[roman] ?? null;
    return { tier, division };
}