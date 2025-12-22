// The platform types we support.
// Expandable later if we add Stadia, Luna, etc.
export type R6Platform =
    "uplay" //ubisoft
    | "steam" //steam
    | "xbl" //xbox
    | "psn"; //playstation

// A single linked account (one platform + one username) 
export interface R6LinkedAccount {
    platform: R6Platform;
    username: string;
}

// The core identity entry stored in each alphabetical blob.
// This is the canonical structure for a tracked user.
export interface R6UserEntry {
    // Discord ID is the permanent anchor for identity.
    claimedBy: string;

    // The user's current, authoritative username for a validated tracked account.
    primary: string;

    // All known R6 accounts linked to this Discord user, if its registered multiple accounts.
    // This is how we detect new "smurf accounts" with cross‑sheet identity.
    aka: string[];

    // All platform accounts linked to this user.
    accounts: R6LinkedAccount[];

    // Optional stats payload (seasonal, profile, etc.)
    // You can refine this later as you build your stats model.
    stats?: any;

    // Timestamp of last update (useful for staleness checks)
    updatedAt: number;
}
// The structure of each alphabetical blob file.
// Example: A.json, M.json, X.json
export interface R6BlobSheet {
    // A map of username → user entry
    // The key is ALWAYS the username as it appears in that sheet.
    [username: string]: R6UserEntry;
}