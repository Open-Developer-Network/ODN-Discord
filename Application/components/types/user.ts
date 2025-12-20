export type GuestUser = {
    username: string | null | undefined;
    avatarUrl: string | null | undefined;
    channelName: string | null | undefined;
    guildIconUrl: string | null | undefined;
    isDiscordActivity: boolean;
};

export class AuthenticatedUser implements GuestUser {
    constructor() {
        this.username = null;
        this.avatarUrl = null;
    }
}

export default class AuthenticatedUser {
    //Discord AuthUser token
    private access_token: string;
    //Discord User Object
    private user: {
        username: string;
        discriminator: string;
        id: string;
        public_flags: number;
        avatar?: string | null | undefined;
        global_name?: string | null | undefined;
    };
    constructor(access_token: string, user: {
        username: string;
        discriminator: string;
        id: string;
        public_flags: number;
        avatar?: string | null | undefined;
        global_name?: string | null | undefined;
    }) {
        this.access_token = access_token;
        this.user = user;
    }
    getAccessToken(): string {
        return this.access_token;
    }
    getUser(): {
        username: string;
        discriminator: string;
        id: string;
        public_flags: number;
        avatar?: string | null | undefined;
        global_name?: string | null | undefined;
    } {
        return this.user;
    }
    setAccessToken(access_token: string): string {
        this.access_token = access_token;
        return this.access_token;
    }
    setUser(user: {
        username: string;
        discriminator: string;
        id: string;
        public_flags: number;
        avatar?: string | null | undefined;
        global_name?: string | null | undefined;
    }): {
        username: string;
        discriminator: string;
        id: string;
        public_flags: number;
        avatar?: string | null | undefined;
        global_name?: string | null | undefined;
    } {
        this.user = user;
        return this.user;
    }
}
