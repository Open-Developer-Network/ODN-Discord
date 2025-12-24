import { Mode } from "./Mode";

export class Party {
  id: string;
  game: string;
  mode: Mode;
  requiredPlayers: number;

  constructor(id: string, game: string, mode: Mode, requiredPlayers: number) {
    this.id = id;
    this.game = game;
    this.mode = mode;
    this.requiredPlayers = requiredPlayers;
  }

  addMember(teamIndex: number, userId: string): boolean {
    if (!this.mode.canAddPlayer(teamIndex)) return false;
    return this.mode.teams[teamIndex].addMember(userId);
  }

  isFull(): boolean {
    return this.mode.totalPlayers >= this.mode.totalMax;
  }

  isRequirementMet(): boolean {
    return this.mode.totalPlayers >= this.requiredPlayers;
  }
}