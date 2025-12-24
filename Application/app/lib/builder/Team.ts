export class Team {
  name: string;
  maxPlayers: number;
  members: string[];

  constructor(name: string, maxPlayers: number) {
    this.name = name;
    this.maxPlayers = maxPlayers;
    this.members = [];
  }

  addMember(userId: string): boolean {
    if (this.members.length >= this.maxPlayers) return false;
    this.members.push(userId);
    return true;
  }
}
