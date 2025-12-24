import { Team } from "./Team";

export class Mode {
  name: string;
  totalMax: number;
  teams: Team[];

  constructor(name: string, totalMax: number, teamMax: number, teamCount: number) {
    this.name = name;
    this.totalMax = totalMax;
    this.teams = Array.from({ length: teamCount }, (_, i) => new Team(`Team${i+1}`, teamMax));
  }

  get totalPlayers(): number {
    return this.teams.reduce((sum, t) => sum + t.members.length, 0);
  }

  canAddPlayer(teamIndex: number): boolean {
    return this.totalPlayers < this.totalMax &&
           this.teams[teamIndex].members.length < this.teams[teamIndex].maxPlayers;
  }
}
