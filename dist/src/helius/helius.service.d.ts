import { Governance, VoteRecord } from '@solana/spl-governance';
import { AccountInfo, MintInfo } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { Environment } from '@lib/types/Environment';
import { ConfigService } from '@src/config/config.service';
import { RealmSettingsService } from '@src/realm-settings/realm-settings.service';
import { StaleCacheService } from '@src/stale-cache/stale-cache.service';
interface Account {
    mintInfo: {
        publicKey: PublicKey;
        account: MintInfo;
    };
    publicKey: PublicKey;
    account: AccountInfo;
    governancePublicKey: PublicKey;
    walletPublicKey: PublicKey;
}
export declare class HeliusService {
    private readonly configService;
    private readonly realmSettingsService;
    private readonly staleCacheService;
    constructor(configService: ConfigService, realmSettingsService: RealmSettingsService, staleCacheService: StaleCacheService);
    endpoint(environment: Environment): string;
    connection(environment: Environment): Connection;
    getAssetOwnersInRealm: (realmPublicKey: PublicKey, environment: Environment) => Promise<{
        wallet: PublicKey;
        governance: PublicKey;
    }[]>;
    getProgramId: (realmPublicKey: PublicKey, environment: Environment) => Promise<PublicKey>;
    getProposal: (proposalPublicKey: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<import("@solana/spl-governance").Proposal>>;
    getProposalsByGovernance: (programPublicKey: PublicKey, governancePublicKey: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<import("@solana/spl-governance").Proposal>[]>;
    getAllProposalsForRealm: (realmPublicKey: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<import("@solana/spl-governance").Proposal>[]>;
    getProgramVersion: (programPublicKey: PublicKey, environment: Environment) => Promise<number>;
    getGovernances: (realmPublicKey: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<Governance>[]>;
    getGovernance: (governancePublicKey: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<Governance>>;
    getRealm: (realmPublicKey: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<import("@solana/spl-governance").Realm>>;
    getAuxiliaryTokenAccountsInRealm: (realmPublicKey: PublicKey, environment: Environment) => Promise<Account[]>;
    getTokenAccountsInRealm: (realmPublicKey: PublicKey, environment: Environment) => Promise<any[]>;
    getTokenMintInfo: (mintPublicKey: PublicKey, environment: Environment) => Promise<{
        publicKey: PublicKey;
        account: MintInfo;
    }>;
    getTokenOwnerRecord: (userPublicKey: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<import("@solana/spl-governance").TokenOwnerRecord>>;
    getTokenOwnerRecordForRealm: (programId: PublicKey, realm: PublicKey, governingTokenMint: PublicKey, governingTokenOwner: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<import("@solana/spl-governance").TokenOwnerRecord>>;
    getVoteRecordsByVoter: (programPublicKey: PublicKey, voterPublicKey: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<VoteRecord>[]>;
    getVoteRecordsByProposal: (proposalPublicKey: PublicKey, programId: PublicKey, environment: Environment) => Promise<import("@solana/spl-governance").ProgramAccount<VoteRecord>[]>;
    private convertRawTokenAssets;
}
export {};
