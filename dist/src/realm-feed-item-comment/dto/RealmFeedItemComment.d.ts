import { RichTextDocument } from '@lib/types/RichTextDocument';
import { RealmMember } from '@src/realm-member/dto/RealmMember';
import { RealmFeedItemCommentVoteType } from './RealmFeedItemCommentVoteType';
export declare class RealmFeedItemComment {
    author?: RealmMember;
    created: Date;
    document: RichTextDocument;
    feedItemId: number;
    id: number;
    myVote?: RealmFeedItemCommentVoteType;
    parentCommentId?: number | null;
    replies?: RealmFeedItemComment[] | null;
    repliesCount: number;
    score: number;
    updated: Date;
}
