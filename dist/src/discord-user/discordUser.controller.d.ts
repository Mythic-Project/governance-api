import { Request } from 'express';
import { ConfigService } from '@src/config/config.service';
import { DiscordUserService } from './discordUser.service';
import { DiscordInteractionPayload } from './dto/DiscordInteractionPayload';
import { HeliusWebhookPayload } from './dto/HeliusWebhookPayload';
export declare class DiscordUserController {
    private readonly discordUserService;
    private readonly configService;
    private logger;
    constructor(discordUserService: DiscordUserService, configService: ConfigService);
    verifyCommand(body: DiscordInteractionPayload, headers: any, req: Request, res: any): Promise<any>;
    getHello(body: HeliusWebhookPayload[], headers: any): Promise<{
        publicKeys: string[];
    }>;
    updateHeliusWebhookAddresses(): Promise<{}>;
}
