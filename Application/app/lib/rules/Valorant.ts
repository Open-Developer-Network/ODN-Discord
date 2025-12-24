import { Mode } from "../builder/Mode";

export const ValorantModes = {
    quickMatch: new Mode("quickMatch", [
        { name: "Squad", maxPlayers: 5 }, // one team, all players
    ]),
    // unranked: new Mode("unranked", [
    //     { name: "Squad", maxPlayers: 5 },
    // ]),
    // ranked: new Mode("ranked", [
    //     { name: "Squad", maxPlayers: 5 },
    // ]),
    // dualFront: new Mode("dualFront", [
    //     { name: "Squad", maxPlayers: 6 },
    // ]),
    custom: new Mode("custom", [], "custom"),
};
