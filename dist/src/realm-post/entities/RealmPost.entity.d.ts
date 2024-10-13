import { Environment } from '@lib/types/Environment';
import { RichTextDocument } from '@lib/types/RichTextDocument';
import { User } from '@src/user/entities/User.entity';
export interface Data {
    document: RichTextDocument;
    title: string;
}
export declare class RealmPost {
    id: string;
    authorId: string;
    data: Data;
    environment: Environment;
    realmPublicKeyStr: string;
    author: User;
    created: Date;
    deleted: Date;
    updated: Date;
}
