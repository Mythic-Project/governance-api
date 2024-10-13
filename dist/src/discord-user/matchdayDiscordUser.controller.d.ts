import { Request } from 'express';
import { ConfigService } from '@src/config/config.service';
import { DiscordInteractionPayload } from './dto/DiscordInteractionPayload';
import { HeliusWebhookPayload } from './dto/HeliusWebhookPayload';
import { MatchdayDiscordUserService } from './matchdayDiscordUser.service';
export declare class MatchdayDiscordUserController {
    private readonly matchdayDiscordUserService;
    private readonly configService;
    private logger;
    constructor(matchdayDiscordUserService: MatchdayDiscordUserService, configService: ConfigService);
    verifyCommand(body: DiscordInteractionPayload, headers: any, req: Request, res: any): Promise<any>;
    getHello(body: HeliusWebhookPayload[], headers: any): Promise<{
        publicKeys: string[];
    }>;
}
