import { PublicKey } from '@solana/web3.js';
import { BigNumber } from 'bignumber.js';
export declare enum GovernanceTokenType {
    Council = "Council",
    Community = "Community"
}
export declare enum GovernanceVoteTipping {
    Disabled = "Disabled",
    Early = "Early",
    Strict = "Strict"
}
export declare class TokenBasedGovernanceRules {
    canCreateProposal: boolean;
    canVeto: boolean;
    canVote: boolean;
    quorumPercent: number;
    tokenMintAddress: PublicKey;
    tokenMintDecimals: BigNumber;
    tokenType: GovernanceTokenType;
    totalSupply: BigNumber;
    vetoQuorumPercent: number;
    voteTipping: GovernanceVoteTipping;
    votingPowerToCreateProposals: BigNumber;
}
export declare class GovernanceRules {
    governanceAddress: PublicKey;
    version: number;
    coolOffHours: number;
    councilTokenRules: TokenBasedGovernanceRules | null;
    communityTokenRules: TokenBasedGovernanceRules;
    depositExemptProposalCount: number;
    maxVoteDays: number;
    minInstructionHoldupDays: number;
    walletAddress: PublicKey;
}
