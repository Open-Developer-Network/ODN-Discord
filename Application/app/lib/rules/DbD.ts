import { Mode } from "../builder/Mode";

export const DbDModes = {
  custom: new Mode("custom", [
    { name: "Killers", maxPlayers: 1 },
    { name: "Survivors", maxPlayers: 4 },
  ], "custom"),
};
