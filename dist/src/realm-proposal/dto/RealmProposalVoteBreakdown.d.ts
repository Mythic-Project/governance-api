import BigNumber from 'bignumber.js';
export declare class RealmProposalVoteBreakdown {
    percentThresholdMet?: number | null;
    threshold?: BigNumber | null;
    totalNoWeight: BigNumber;
    totalYesWeight: BigNumber;
    totalPossibleWeight?: BigNumber | null;
    voteThresholdPercentage?: number | null;
    votingEnd?: Date | null;
}
