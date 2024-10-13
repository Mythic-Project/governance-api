import { PublicKey } from '@solana/web3.js';
import * as TE from 'fp-ts/TaskEither';
import { Repository } from 'typeorm';
import * as errors from '@lib/errors/gql';
import { Environment } from '@lib/types/Environment';
import { RichTextDocument } from '@lib/types/RichTextDocument';
import { User } from '@src/lib/decorators/CurrentUser';
import { RealmPost } from './dto/RealmPost';
import { RealmPost as RealmPostEntity } from './entities/RealmPost.entity';
export declare class RealmPostService {
    private readonly realmPostRepository;
    constructor(realmPostRepository: Repository<RealmPostEntity>);
    createPost(realmPublicKey: PublicKey, title: string, document: RichTextDocument, requestingUser: User, environment: Environment): TE.TaskEither<errors.Exception | errors.MalformedRequest, {
        author: {
            publicKey: PublicKey;
        };
        created: Date;
        document: RichTextDocument;
        id: string;
        title: string;
        updated: Date;
    }>;
    getPostsForRealmByIds(realmPublicKey: PublicKey, ids: string[], requestingUser: PublicKey | null, environment: Environment): TE.TaskEither<errors.Exception, {
        [id: string]: RealmPost;
    }>;
}
