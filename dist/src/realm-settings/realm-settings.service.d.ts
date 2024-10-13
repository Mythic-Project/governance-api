import { PublicKey } from '@solana/web3.js';
import { Environment } from '@lib/types/Environment';
import { ConfigService } from '@src/config/config.service';
import { StaleCacheService } from '@src/stale-cache/stale-cache.service';
export interface CodeCommittedSettings {
    bannerImage?: string;
    category?: string;
    displayName?: string;
    keywords?: string;
    ogImage?: string;
    programId: string;
    realmId?: string;
    sharedWalletId?: string;
    shortDescription?: string;
    sortRank?: number;
    symbol?: string;
    discord?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
}
export declare class RealmSettingsService {
    private readonly configService;
    private readonly staleCacheService;
    constructor(configService: ConfigService, staleCacheService: StaleCacheService);
    fetchAllCodeCommittedSettings: (environment: Environment) => Promise<CodeCommittedSettings[]>;
    getCodeCommittedSettingsForRealm(realmPublicKey: PublicKey, environment: Environment): Promise<CodeCommittedSettings>;
}
