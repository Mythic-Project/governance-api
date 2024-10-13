import BigNumber from 'bignumber.js';
export declare enum RealmProposalUserVoteType {
    Abstain = "Abstain",
    No = "No",
    Veto = "Veto",
    Yes = "Yes"
}
export declare class RealmProposalUserVote {
    type: RealmProposalUserVoteType;
    weight: BigNumber;
}
