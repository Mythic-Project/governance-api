import { PublicKey } from '@solana/web3.js';
import { RichTextDocument } from '@lib/types/RichTextDocument';
import { RealmMember } from '@src/realm-member/dto/RealmMember';
import { RealmPost } from '@src/realm-post/dto/RealmPost';
import { RealmProposal } from '@src/realm-proposal/dto/RealmProposal';
import { RealmFeedItemType } from './RealmFeedItemType';
import { RealmFeedItemVoteType } from './RealmFeedItemVoteType';
export declare class RealmFeedItemPost {
    type: RealmFeedItemType.Post;
    author: RealmMember;
    created: Date;
    document: RichTextDocument;
    id: number;
    myVote?: RealmFeedItemVoteType;
    post: RealmPost;
    realmPublicKey: PublicKey;
    score: number;
    title: string;
    updated: Date;
}
export declare class RealmFeedItemProposal {
    type: RealmFeedItemType.Proposal;
    author?: RealmMember;
    created: Date;
    document: RichTextDocument;
    id: number;
    myVote?: RealmFeedItemVoteType;
    proposal: RealmProposal;
    realmPublicKey: PublicKey;
    score: number;
    title: string;
    updated: Date;
}
export declare const RealmFeedItem: RealmFeedItemPost | RealmFeedItemProposal;
