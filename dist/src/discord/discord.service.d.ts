import { ConfigService } from '@src/config/config.service';
export declare class DiscordService {
    private readonly configService;
    private readonly getClient;
    constructor(configService: ConfigService);
    getMessage(messageUrl: string): Promise<import("discord.js").Message<true> | null | undefined>;
}
