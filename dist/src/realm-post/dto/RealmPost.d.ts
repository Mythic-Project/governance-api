import { RichTextDocument } from '@lib/types/RichTextDocument';
import { RealmMember } from '@src/realm-member/dto/RealmMember';
export declare class RealmPost {
    author: RealmMember;
    created: Date;
    document: RichTextDocument;
    id: string;
    title: string;
    updated: Date;
}
