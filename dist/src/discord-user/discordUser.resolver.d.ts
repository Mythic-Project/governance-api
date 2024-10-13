import { User } from '@lib/decorators/CurrentUser';
import { ConfigService } from '@src/config/config.service';
import { DiscordUserService } from './discordUser.service';
import { DiscordApplication } from './dto/VerifyWallet';
import { MatchdayDiscordUserService } from './matchdayDiscordUser.service';
export declare class DiscordUserResolver {
    private readonly discordUserService;
    private readonly matchdayDiscordUserService;
    private readonly configService;
    constructor(discordUserService: DiscordUserService, matchdayDiscordUserService: MatchdayDiscordUserService, configService: ConfigService);
    verifyWallet(code: string, application: DiscordApplication, user: User | null): Promise<User>;
}
