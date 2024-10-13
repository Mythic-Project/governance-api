import { RealmPost } from '@src/realm-post/entities/RealmPost.entity';
export interface Data {
    realmsFollowed?: string[];
}
export declare class User {
    id: string;
    data: Data;
    authId: string;
    publicKeyStr: string;
    posts: RealmPost[];
    created: Date;
    deleted: Date;
    updated: Date;
}
