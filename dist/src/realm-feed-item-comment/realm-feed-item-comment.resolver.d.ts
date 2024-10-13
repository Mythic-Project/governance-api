import { PublicKey } from '@solana/web3.js';
import * as TE from 'fp-ts/TaskEither';
import { Environment } from '@lib/decorators/CurrentEnvironment';
import { User } from '@lib/decorators/CurrentUser';
import * as errors from '@lib/errors/gql';
import { ConnectionArgs } from '@lib/gqlTypes/Connection';
import { RichTextDocument } from '@lib/types/RichTextDocument';
import { RealmFeedItemCommentSort, RealmFeedItemCommentConnection } from './dto/pagination';
import { RealmFeedItemComment } from './dto/RealmFeedItemComment';
import { RealmFeedItemCommentVoteType } from './dto/RealmFeedItemCommentVoteType';
import { RealmFeedItemCommentService } from './realm-feed-item-comment.service';
export declare class RealmFeedItemCommentResolver {
    private readonly realmFeedItemCommentService;
    constructor(realmFeedItemCommentService: RealmFeedItemCommentService);
    createFeedItemComment(document: RichTextDocument, feedItemId: number, parentCommentId: number | null, realm: PublicKey, environment: Environment, user: User): Promise<RealmFeedItemComment>;
    deleteComment(realm: PublicKey, id: number, environment: Environment, user: User | null): Promise<boolean>;
    feedItemComment(commentId: number, feedItemId: number, environment: Environment, user: User | null, depth?: number, sort?: RealmFeedItemCommentSort): TE.TaskEither<Error | errors.Exception | errors.NotFound, RealmFeedItemComment>;
    feedItemCommentTree(args: ConnectionArgs, feedItemId: number, environment: Environment, user: User | null, depth?: number, sort?: RealmFeedItemCommentSort): TE.TaskEither<Error | errors.Exception | errors.MalformedRequest, RealmFeedItemCommentConnection>;
    voteOnFeedItemComment(realm: PublicKey, id: number, vote: RealmFeedItemCommentVoteType, environment: Environment, user: User | null): TE.TaskEither<errors.Exception | errors.NotFound, {
        repliesCount: number;
        author?: import("../realm-member/dto/RealmMember").RealmMember | undefined;
        created: Date;
        document: RichTextDocument;
        feedItemId: number;
        id: number;
        myVote?: RealmFeedItemCommentVoteType | undefined;
        parentCommentId?: number | null | undefined;
        replies?: RealmFeedItemComment[] | null | undefined;
        score: number;
        updated: Date;
    }>;
}
