import * as EI from 'fp-ts/Either';
import * as errors from '@lib/errors/gql';
import { RealmPost } from './dto/RealmPost';
export declare class RealmPostResolver {
    clippedDocument(charLimit: number | undefined, attachmentLimit: number | undefined, post: RealmPost): EI.Either<errors.Exception, {
        document: import("../lib/types/RichTextDocument").RichTextDocument;
        isClipped: boolean;
    }>;
}
