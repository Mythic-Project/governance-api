import { RealmFeedItemType } from '../dto/RealmFeedItemType';
import { Environment } from '@lib/types/Environment';
import { RealmFeedItemComment } from '@src/realm-feed-item-comment/entities/RealmFeedItemComment.entity';
export interface Data {
    type: RealmFeedItemType;
    ref: string;
}
export interface Metadata {
    relevanceScore: number;
    topAllTimeScore: number;
    rawScore: number;
}
export declare class RealmFeedItem {
    id: number;
    data: Data;
    environment: Environment;
    metadata: Metadata;
    realmPublicKeyStr: string;
    crosspostedRealms?: null | string[];
    comments: RealmFeedItemComment[];
    created: Date;
    deleted: Date;
    updated: Date;
}
