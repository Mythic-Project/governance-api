import { PublicKey } from '@solana/web3.js';
import { RichTextDocument } from '@lib/types/RichTextDocument';
import { RealmMember } from '@src/realm-member/dto/RealmMember';
import { RealmProposalState } from './RealmProposalState';
import { RealmProposalUserVote } from './RealmProposalUserVote';
import { RealmProposalVoteBreakdown } from './RealmProposalVoteBreakdown';
export declare class RealmProposal {
    author?: RealmMember;
    created: Date;
    description: string;
    document: RichTextDocument;
    publicKey: PublicKey;
    myVote?: RealmProposalUserVote | null;
    state: RealmProposalState;
    title: string;
    updated: Date;
    voteBreakdown: RealmProposalVoteBreakdown;
}
