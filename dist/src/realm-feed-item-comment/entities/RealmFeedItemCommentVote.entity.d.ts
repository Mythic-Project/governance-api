import { RealmFeedItemCommentVoteType } from '../dto/RealmFeedItemCommentVoteType';
export interface Data {
    type: RealmFeedItemCommentVoteType;
    relevanceWeight: number;
}
export declare class RealmFeedItemCommentVote {
    commentId: number;
    userId: string;
    realmPublicKeyStr: string;
    data: Data;
    created: Date;
    deleted: Date;
    updated: Date;
}
