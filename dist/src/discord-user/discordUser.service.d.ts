import { PublicKey } from '@solana/web3.js';
import { Repository } from 'typeorm';
import { ConfigService } from '@src/config/config.service';
import { DiscordUser } from './entities/DiscordUser.entity';
type WalletAge = {
    txId: string;
    slot: number;
    timestamp: number;
    date: string;
    numTransactions: number;
};
export declare class DiscordUserService {
    private readonly discordUserRepository;
    private readonly configService;
    private logger;
    constructor(discordUserRepository: Repository<DiscordUser>, configService: ConfigService);
    heliusUrlOptions(): string;
    heliusTxUrl(address: string): string;
    heliusBalancesUrl(address: string): string;
    heliusWebhookUrl(webhookId: string): string;
    heliusAddressesUrl(publicKey: string): string;
    getMostRecentTxTimestamp(publicKey: string): Promise<string | null>;
    getSolBalance(publicKey: string): Promise<boolean>;
    getMetadataForUser(publicKey: PublicKey, withDelay?: number): Promise<{
        first_wallet_transaction: string | null;
        has_minimum_sol: number;
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
    updateWebhookAddressList(): Promise<void>;
    createDiscordUser(authId: string, publicKey: PublicKey, refreshToken: string): Promise<import("typeorm").InsertResult>;
    getLargeAmountOfTransactions(address: string, maxCount: number): Promise<WalletAge | undefined>;
    getDiscordUserByPublicKey(publicKey: PublicKey): Promise<DiscordUser | null>;
    updateMetadataForUser(publicKey: PublicKey, _accessToken?: string | null, withDelay?: number): Promise<void>;
}
export {};
