export type DailySummary = {
  date: string;
  totalParties: number;
  uniqueHosts: number;
  uniquePlayers: number;
  modeBreakdown: Record<string, number>;
  avgPartySize: number;
};

export function aggregateDaily(rawLines: string[], date: string): DailySummary {
  const hosts = new Set<string>();
  const players = new Set<string>();
  const modeBreakdown: Record<string, number> = {};
  let totalParties = 0;
  let totalPartySize = 0;

  for (const line of rawLines) {
    const parts = line.split("&");
    const hostId = parts[0].split("#")[0];
    const mode = parts[1];
    const members = parts.slice(2, parts.length - 1);

    totalParties++;
    hosts.add(hostId);
    players.add(hostId);
    members.forEach(m => players.add(m));

    modeBreakdown[mode] = (modeBreakdown[mode] || 0) + 1;
    totalPartySize += members.length + 1;
  }

  return {
    date,
    totalParties,
    uniqueHosts: hosts.size,
    uniquePlayers: players.size,
    modeBreakdown,
    avgPartySize: totalParties > 0 ? totalPartySize / totalParties : 0
  };
}