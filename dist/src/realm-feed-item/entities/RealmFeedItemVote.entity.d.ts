import { RealmFeedItemVoteType } from '../dto/RealmFeedItemVoteType';
export interface Data {
    type: RealmFeedItemVoteType;
    relevanceWeight: number;
}
export declare class RealmFeedItemVote {
    feedItemId: number;
    userId: string;
    realmPublicKeyStr: string;
    data: Data;
    created: Date;
    deleted: Date;
    updated: Date;
}
