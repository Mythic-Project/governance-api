import { PublicKey } from '@solana/web3.js';
import * as TE from 'fp-ts/TaskEither';
import * as IT from 'io-ts';
import { Repository } from 'typeorm';
import { User } from '@lib/decorators/CurrentUser';
import * as errors from '@lib/errors/gql';
import { Environment } from '@lib/types/Environment';
import { ConfigService } from '@src/config/config.service';
import { DialectService } from '@src/dialect/dialect.service';
import { RichTextDocument } from '@src/lib/types/RichTextDocument';
import { RealmFeedItem } from '@src/realm-feed-item/entities/RealmFeedItem.entity';
import { RealmMemberService } from '@src/realm-member/realm-member.service';
import { RealmPost } from '@src/realm-post/entities/RealmPost.entity';
import { RealmService } from '@src/realm/realm.service';
import { RealmFeedItemCommentSort, RealmFeedItemCommentConnection } from './dto/pagination';
import { RealmFeedItemComment } from './dto/RealmFeedItemComment';
import { RealmFeedItemCommentVoteType } from './dto/RealmFeedItemCommentVoteType';
import { RealmFeedItemComment as RealmFeedItemCommentEntity } from './entities/RealmFeedItemComment.entity';
import { RealmFeedItemCommentVote as RealmFeedItemCommentVoteEntity } from './entities/RealmFeedItemCommentVote.entity';
export declare const RealmFeedItemCommentCursor: IT.BrandC<IT.StringC, {
    readonly "realm feed item comment cursor": symbol;
}>;
export type RealmFeedItemCommentCursor = IT.TypeOf<typeof RealmFeedItemCommentCursor>;
interface UserVoteMapping {
    [feedItem: string]: {
        [userId: string]: RealmFeedItemCommentVoteType;
    };
}
export declare class RealmFeedItemCommentService {
    private readonly realmFeedItemRepository;
    private readonly realmFeedItemCommentRepository;
    private readonly realmFeedItemCommentVoteRepository;
    private readonly realmPostRepository;
    private readonly configService;
    private readonly dialectService;
    private readonly realmMemberService;
    private readonly realmService;
    constructor(realmFeedItemRepository: Repository<RealmFeedItem>, realmFeedItemCommentRepository: Repository<RealmFeedItemCommentEntity>, realmFeedItemCommentVoteRepository: Repository<RealmFeedItemCommentVoteEntity>, realmPostRepository: Repository<RealmPost>, configService: ConfigService, dialectService: DialectService, realmMemberService: RealmMemberService, realmService: RealmService);
    createComment(args: {
        document: RichTextDocument;
        environment: Environment;
        feedItemId: number;
        parentCommentId?: number | null;
        realmPublicKey: PublicKey;
        requestingUser?: User | null;
    }): Promise<RealmFeedItemComment>;
    deleteComment(args: {
        environment: Environment;
        id: RealmFeedItemCommentEntity['id'];
        realmPublicKey: PublicKey;
        requestingUser: User;
    }): Promise<boolean>;
    getCommentCountForFeedItem(args: {
        environment: Environment;
        feedItemId: number;
    }): TE.TaskEither<errors.Exception, number>;
    getCommentEntity(args: {
        environment: Environment;
        id: RealmFeedItemCommentEntity['id'];
    }): TE.TaskEither<errors.Exception | errors.NotFound, RealmFeedItemCommentEntity>;
    getCommentTreeForComment(args: {
        commentId: number;
        depth: number;
        environment: Environment;
        feedItemId: number;
        requestingUser?: User | null;
        sort: RealmFeedItemCommentSort;
    }): TE.TaskEither<Error | errors.Exception | errors.NotFound, RealmFeedItemComment>;
    getCommentTreeForFeedItem(args: {
        after?: RealmFeedItemCommentCursor;
        before?: RealmFeedItemCommentCursor;
        depth: number;
        environment: Environment;
        feedItemId: number;
        first?: number;
        last?: number;
        requestingUser?: User | null;
        sort: RealmFeedItemCommentSort;
    }): TE.TaskEither<Error | errors.Exception | errors.MalformedRequest, RealmFeedItemCommentConnection>;
    getCommentVotes(args: {
        commentIds: number[];
        feedItemId: number;
        userIds: string[];
        environment: Environment;
    }): TE.TaskEither<errors.Exception, UserVoteMapping>;
    sendReplyNotification(comment: RealmFeedItemCommentEntity, environment: Environment): Promise<void>;
    sendVoteNotification(comment: RealmFeedItemComment, environment: Environment): Promise<void>;
    submitVote(args: {
        realmPublicKey: PublicKey;
        id: RealmFeedItemCommentEntity['id'];
        type: RealmFeedItemCommentVoteType;
        requestingUser?: User | null;
        environment: Environment;
    }): TE.TaskEither<errors.Exception | errors.NotFound, {
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
    toCursor(feedItem: RealmFeedItemCommentEntity, sortOrder: RealmFeedItemCommentSort): IT.Branded<string, {
        readonly "realm feed item comment cursor": symbol;
    }>;
    fromCursor(cursor: RealmFeedItemCommentCursor): {
        sortOrder: RealmFeedItemCommentSort.New;
        feedItem: Date;
    } | {
        sortOrder: RealmFeedItemCommentSort.Relevance;
        feedItem: number;
    } | {
        sortOrder: RealmFeedItemCommentSort.TopAllTime;
        feedItem: number;
    };
    private buildTree;
    private convertEntityToComment;
    private getCommentReplies;
    private getCommentTree;
    private getTopLevelComments;
    private getFirstNTopLevelComments;
    private getLastNTopLevelComments;
    private getNTopLevelCommentsAfter;
    private getNTopLevelCommentsBefore;
    private cursorClause;
    private orderByClause;
    private sortEntities;
}
export {};
