import { MintMaxVoteWeightSourceType } from '@solana/spl-governance';
import { PublicKey } from '@solana/web3.js';
import { BigNumber } from 'bignumber.js';
import { Environment } from '@lib/types/Environment';
import { HeliusService } from '@src/helius/helius.service';
import { StaleCacheService } from '@src/stale-cache/stale-cache.service';
import { GovernanceRules } from './dto/GovernanceRules';
export interface Governance {
    address: PublicKey;
    communityMint: PublicKey | null;
    councilMint: PublicKey | null;
    communityMintMaxVoteWeight: BigNumber | null;
    communityMintMaxVoteWeightSource: MintMaxVoteWeightSourceType | null;
}
export declare class RealmGovernanceService {
    private readonly staleCacheService;
    private readonly heliusService;
    constructor(staleCacheService: StaleCacheService, heliusService: HeliusService);
    getGovernancesForRealm(realmPublicKey: PublicKey, environment: Environment): Promise<Governance[]>;
    getGovernanceRules(programPublicKey: PublicKey, governanceAddress: PublicKey, environment: Environment): Promise<GovernanceRules>;
}
