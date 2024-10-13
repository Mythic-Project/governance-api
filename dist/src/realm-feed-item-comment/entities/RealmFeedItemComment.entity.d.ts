import { Environment } from '@lib/types/Environment';
import { RichTextDocument } from '@lib/types/RichTextDocument';
import { RealmFeedItem } from '@src/realm-feed-item/entities/RealmFeedItem.entity';
import { User } from '@src/user/entities/User.entity';
export interface Data {
    authorPublicKeyStr?: string;
    document: RichTextDocument;
}
export interface Metadata {
    relevanceScore: number;
    topAllTimeScore: number;
    rawScore: number;
}
export declare class RealmFeedItemComment {
    id: number;
    authorId: string;
    data: Data;
    feedItemId: number;
    environment: Environment;
    metadata: Metadata;
    parentCommentId?: number;
    realmPublicKeyStr: string;
    author: User;
    feedItem: RealmFeedItem;
    created: Date;
    deleted: Date;
    updated: Date;
}
