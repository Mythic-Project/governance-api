import { Governance as RawGovernance, Proposal, VoteRecord, ProgramAccount, Realm } from '@solana/spl-governance';
import { MintInfo } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { Cache } from 'cache-manager';
import { Environment } from '@lib/types/Environment';
import { HeliusService } from '@src/helius/helius.service';
import { RealmGovernanceService } from '@src/realm-governance/realm-governance.service';
import { RealmMemberService } from '@src/realm-member/realm-member.service';
import { StaleCacheService } from '@src/stale-cache/stale-cache.service';
import { RealmProposalSort } from './dto/pagination';
import { RealmProposal } from './dto/RealmProposal';
export declare class RealmProposalService {
    private readonly cacheManager;
    private readonly heliusService;
    private readonly realmGovernanceService;
    private readonly realmMemberService;
    private readonly staleCacheService;
    constructor(cacheManager: Cache, heliusService: HeliusService, realmGovernanceService: RealmGovernanceService, realmMemberService: RealmMemberService, staleCacheService: StaleCacheService);
    getProposalByPublicKey(proposalPublicKey: PublicKey, environment: Environment): Promise<RealmProposal>;
    getProposalForUserByPublicKey(proposalPublicKey: PublicKey, requestingUser: PublicKey | null, environment: Environment): Promise<RealmProposal>;
    getProposalsForRealm(realmPublicKey: PublicKey, environment: Environment): Promise<RealmProposal[]>;
    getProposalAddressesForRealm(realmPublicKey: PublicKey, environment: Environment): Promise<{
        publicKey: PublicKey;
        updated: Date;
    }[]>;
    getProposalsForRealmAndUser(realmPublicKey: PublicKey, requestingUser: PublicKey | null, sortOrder: RealmProposalSort, environment: Environment): Promise<RealmProposal[]>;
    getProposalsForRealmAndUserByPublicKeys(realmPublicKey: PublicKey, publicKeys: PublicKey[], requestingUser: PublicKey | null, environment: Environment): Promise<{
        [publicKeyStr: string]: RealmProposal;
    }>;
    getGoverningTokenMintsForHolaplexProposals(proposals: ProgramAccount<Proposal>[], environment: Environment): Promise<{
        [address: string]: {
            publicKey: PublicKey;
            account: MintInfo;
        };
    }>;
    private buildProposalState;
    private buildPropsalUpdated;
    private buildProposalUserVote;
    buildVotingBreakdown(proposal: ProgramAccount<Proposal>, proposalVoteRecords: ProgramAccount<VoteRecord>[], governance: RawGovernance, realm: ProgramAccount<Realm>, mint?: MintInfo): {
        percentThresholdMet: number | null;
        voteThresholdPercentage: number;
        threshold: BigNumber | undefined;
        totalNoWeight: BigNumber;
        totalPossibleWeight: BigNumber;
        totalYesWeight: BigNumber;
        votingEnd: Date | null;
    };
    private sortAlphabetically;
    private sortRelevance;
    private sortTime;
}
