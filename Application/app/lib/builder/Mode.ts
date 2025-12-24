import { Team } from "./Team";

export class Mode {
    name: string;
    teams: Team[];
    category: "normal" | "event" | "custom";

    constructor(
        name: string,
        teamConfigs: { name: string; maxPlayers: number }[],
        category: "normal" | "event" | "custom" = "normal"
    ) {
        this.name = name;
        this.teams = teamConfigs.map(config => new Team(config.name, config.maxPlayers));
        this.category = category;
    }

    get totalPlayers(): number {
        return this.teams.reduce((sum, t) => sum + t.size, 0);
    }
    get totalMax(): number {
        return this.teams.reduce((sum, t) => sum + t.maxPlayers, 0);
    }
    canAddPlayer(teamIndex: number): boolean {
        const team = this.teams[teamIndex];
        return this.totalPlayers < this.totalMax && team.size < team.maxPlayers;
    }
    validateParty(requiredPlayers: number): boolean {
        return this.totalPlayers >= requiredPlayers
            && this.totalPlayers <= this.totalMax;
    }
}
