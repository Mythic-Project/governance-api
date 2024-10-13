import { PublicKey } from '@solana/web3.js';
import * as EI from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { Environment } from '@lib/decorators/CurrentEnvironment';
import { User } from '@lib/decorators/CurrentUser';
import * as errors from '@lib/errors/gql';
import { RichTextDocument } from '@lib/types/RichTextDocument';
import { ConnectionArgs } from '@src/lib/gqlTypes/Connection';
import { RealmFeedItemCommentConnection } from '@src/realm-feed-item-comment/dto/pagination';
import { RealmFeedItemCommentSort } from '@src/realm-feed-item-comment/dto/pagination';
import { RealmFeedItemCommentService } from '@src/realm-feed-item-comment/realm-feed-item-comment.service';
import { Realm } from '@src/realm/dto/Realm';
import { RealmService } from '@src/realm/realm.service';
import { RealmFeedItemPost, RealmFeedItemProposal } from './dto/RealmFeedItem';
import { RealmFeedItemVoteType } from './dto/RealmFeedItemVoteType';
import { RealmFeedItemService } from './realm-feed-item.service';
export declare class RealmFeedItemPostResolver {
    private readonly realmService;
    private readonly realmFeedItemCommentService;
    constructor(realmService: RealmService, realmFeedItemCommentService: RealmFeedItemCommentService);
    clippedDocument(charLimit: number | undefined, attachmentLimit: number | undefined, post: RealmFeedItemPost): EI.Either<errors.Exception, {
        document: RichTextDocument;
        isClipped: boolean;
    }>;
    commentTree(args: ConnectionArgs, post: RealmFeedItemPost, environment: Environment, user: User, depth?: number, sort?: RealmFeedItemCommentSort): TE.TaskEither<Error | errors.Exception | errors.MalformedRequest, RealmFeedItemCommentConnection>;
    numComments(post: RealmFeedItemPost, environment: Environment): TE.TaskEither<errors.Exception, number>;
    realm(post: RealmFeedItemPost, environment: Environment): Promise<Realm>;
}
export declare class RealmFeedItemProposalResolver {
    private readonly realmService;
    private readonly realmFeedItemCommentService;
    constructor(realmService: RealmService, realmFeedItemCommentService: RealmFeedItemCommentService);
    clippedDocument(charLimit: number | undefined, attachmentLimit: number | undefined, proposal: RealmFeedItemProposal): EI.Either<errors.Exception, {
        document: RichTextDocument;
        isClipped: boolean;
    }>;
    commentTree(args: ConnectionArgs, proposal: RealmFeedItemProposal, environment: Environment, user: User, depth?: number, sort?: RealmFeedItemCommentSort): TE.TaskEither<Error | errors.Exception | errors.MalformedRequest, RealmFeedItemCommentConnection>;
    numComments(proposal: RealmFeedItemProposal, environment: Environment): TE.TaskEither<errors.Exception, number>;
    realm(proposal: RealmFeedItemProposal, environment: Environment): Promise<Realm>;
}
export declare class RealmFeedItemResolver {
    private readonly realmFeedItemService;
    constructor(realmFeedItemService: RealmFeedItemService);
    feedItem(realm: PublicKey, id: number, environment: Environment, user: User | null): TE.TaskEither<errors.Exception | errors.NotFound, RealmFeedItemPost | RealmFeedItemProposal>;
    feedItems(ids: number[], environment: Environment, user: User | null): Promise<(RealmFeedItemPost | RealmFeedItemProposal)[]>;
    pinnedFeedItems(realm: PublicKey, environment: Environment, user: User | null): Promise<RealmFeedItemProposal[]>;
    createPost(document: RichTextDocument, realm: PublicKey, title: string, environment: Environment, user: User | null, crosspostTo?: null | PublicKey[]): Promise<RealmFeedItemPost>;
    deletePost(realm: PublicKey, id: number, environment: Environment, user: User | null): Promise<boolean>;
    voteOnFeedItem(realm: PublicKey, id: number, vote: RealmFeedItemVoteType, environment: Environment, user: User | null): TE.TaskEither<errors.Exception | errors.NotFound, RealmFeedItemPost | RealmFeedItemProposal>;
}
