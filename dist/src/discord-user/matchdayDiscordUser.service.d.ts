import { PublicKey } from '@solana/web3.js';
import { Repository } from 'typeorm';
import { ConfigService } from '@src/config/config.service';
import { MatchdayDiscordUser } from './entities/MatchdayDiscordUser.entity';
export declare class MatchdayDiscordUserService {
    private readonly matchdayDiscordUserRepository;
    private readonly configService;
    private logger;
    constructor(matchdayDiscordUserRepository: Repository<MatchdayDiscordUser>, configService: ConfigService);
    getChallengePassesForUser(publicKey: PublicKey): Promise<{
        numChallengePasses: any;
        oldestChallengePass: any;
    } | {
        numChallengePasses: number;
        oldestChallengePass?: undefined;
    }>;
    getMatchdayMetadata(accessToken: string): Promise<{
        matchdayUsername: string;
        socialFollow: boolean;
    }>;
    getMetadataForUser(publicKey: PublicKey, accessToken: string): Promise<{
        platform_username: string;
        metadata: {
            num_challenge_passes: any;
            challenge_pass_held_since: any;
            following_on_twitter: number;
        };
    }>;
    getAccessTokenWithRefreshToken(refreshToken: string): Promise<{
        accessToken: any;
        refreshToken: any;
    }>;
    getDiscordApplicationCredentials(): {
        client_id: string;
        client_secret: string;
        public_key: string;
    };
    createDiscordUser(authId: string, publicKey: PublicKey, refreshToken: string): Promise<import("typeorm").InsertResult>;
    getDiscordUserByPublicKey(publicKey: PublicKey): Promise<MatchdayDiscordUser | null>;
    updateMetadataForUser(publicKey: PublicKey, _accessToken?: string | null, delayDuration?: number): Promise<void>;
}
