export default class Server {
    private name: string; //EX: "My Awesome Server"
    private serverId: number; //EX:1282475742344646696
    private iconUrl: string | Blob | undefined; //EX: "https://cdn.discordapp.com/icons/1282475742344646696/a_abcdef1234567890.gif?size=1024"
    // private widgetUrl: string | null; //EX: "https://discord.com/widget?id=1282475742344646696&theme=light"
    username: string;
    avatarUrl: string;
    channelName: string;
    guildIconUrl: string;

    constructor(name: string, serverId: number, iconUrl: string | Blob | undefined = undefined, username: string, avatarUrl: string, channelName: string, guildIconUrl: string) {
        this.name = name;
        this.serverId = serverId;
        this.iconUrl = iconUrl;
        this.username = username;
        this.avatarUrl = avatarUrl;
        this.channelName = channelName;
        this.guildIconUrl = guildIconUrl;
    }

    getName(): string {
        return this.name;
    }
    setName(name: string): string {
        this.name = name;
        return this.name;
    }
    getServerId(): number {
        return this.serverId;
    }
    setServerId(serverId: number): number {
        this.serverId = serverId;
        return this.serverId;
    }
    getIconUrl(): string | Blob | undefined {
        return this.iconUrl;
    }
    setIconUrl(iconUrl: string | Blob | undefined): string | Blob | undefined {
        this.iconUrl = iconUrl;
        return this.iconUrl;
    }

}