import { PublicKey } from '@solana/web3.js';
import * as TE from 'fp-ts/TaskEither';
import { Repository } from 'typeorm';
import { User } from '@lib/decorators/CurrentUser';
import * as errors from '@lib/errors/gql';
import { Environment } from '@lib/types/Environment';
import { RichTextDocument } from '@lib/types/RichTextDocument';
import { ConfigService } from '@src/config/config.service';
import { DialectService } from '@src/dialect/dialect.service';
import { RealmFeedItemComment } from '@src/realm-feed-item-comment/entities/RealmFeedItemComment.entity';
import { RealmFeedItemCommentService } from '@src/realm-feed-item-comment/realm-feed-item-comment.service';
import { RealmMemberService } from '@src/realm-member/realm-member.service';
import { RealmPost } from '@src/realm-post/entities/RealmPost.entity';
import { RealmPostService } from '@src/realm-post/realm-post.service';
import { RealmProposalService } from '@src/realm-proposal/realm-proposal.service';
import { RealmService } from '@src/realm/realm.service';
import { StaleCacheService } from '@src/stale-cache/stale-cache.service';
import { TaskDedupeService } from '@src/task-dedupe/task-dedupe.service';
import { RealmFeedItemPost, RealmFeedItemProposal } from './dto/RealmFeedItem';
import { RealmFeedItemVoteType } from './dto/RealmFeedItemVoteType';
import { RealmFeedItem as RealmFeedItemEntity } from './entities/RealmFeedItem.entity';
import { RealmFeedItemVote as RealmFeedItemVoteEntity } from './entities/RealmFeedItemVote.entity';
interface UserVoteMapping {
    [feedItem: string]: {
        [userId: string]: RealmFeedItemVoteType;
    };
}
export declare class RealmFeedItemService {
    private readonly realmFeedItemCommentRepository;
    private readonly realmFeedItemRepository;
    private readonly realmFeedItemVoteRepository;
    private readonly realmPostRepository;
    private readonly configService;
    private readonly dialectService;
    private readonly realmFeedItemCommentService;
    private readonly realmMemberService;
    private readonly realmPostService;
    private readonly realmProposalService;
    private readonly realmService;
    private readonly staleCacheService;
    private readonly taskDedupeService;
    private logger;
    constructor(realmFeedItemCommentRepository: Repository<RealmFeedItemComment>, realmFeedItemRepository: Repository<RealmFeedItemEntity>, realmFeedItemVoteRepository: Repository<RealmFeedItemVoteEntity>, realmPostRepository: Repository<RealmPost>, configService: ConfigService, dialectService: DialectService, realmFeedItemCommentService: RealmFeedItemCommentService, realmMemberService: RealmMemberService, realmPostService: RealmPostService, realmProposalService: RealmProposalService, realmService: RealmService, staleCacheService: StaleCacheService, taskDedupeService: TaskDedupeService);
    convertMixedFeedEntitiesToFeedItem(entities: RealmFeedItemEntity[], requestingUser: User | null, environment: Environment): Promise<{
        [id: string]: RealmFeedItemPost | RealmFeedItemProposal;
    }>;
    convertEntitiesToFeedItems(realmPublicKey: PublicKey, entities: RealmFeedItemEntity[], requestingUser: User | null, environment: Environment): TE.TaskEither<errors.Exception, {
        [id: string]: RealmFeedItemPost | RealmFeedItemProposal;
    }>;
    createPost(args: {
        crosspostTo?: null | PublicKey[];
        document: RichTextDocument;
        environment: Environment;
        realmPublicKey: PublicKey;
        requestingUser: User | null;
        title: string;
    }): Promise<RealmFeedItemPost>;
    deletePost(args: {
        environment: Environment;
        id: number;
        realmPublicKey: PublicKey;
        requestingUser: User;
    }): Promise<boolean>;
    groupEntitesByRealm(entities: RealmFeedItemEntity[]): {
        [realm: string]: RealmFeedItemEntity[];
    };
    getFeedItemEntity(realmPublicKey: PublicKey, id: RealmFeedItemEntity['id'], environment: Environment): TE.TaskEither<errors.Exception | errors.NotFound, RealmFeedItemEntity>;
    getFeedItem(realmPublicKey: PublicKey, id: RealmFeedItemEntity['id'], requestingUser: User | null, environment: Environment): TE.TaskEither<errors.Exception | errors.NotFound, RealmFeedItemPost | RealmFeedItemProposal>;
    getFeedItems(ids: RealmFeedItemEntity['id'][], requestingUser: User | null, environment: Environment): Promise<(RealmFeedItemPost | RealmFeedItemProposal)[]>;
    getPinnedFeedItems(realmPublicKey: PublicKey, requestingUser: User | null, environment: Environment): Promise<RealmFeedItemProposal[]>;
    getFeedItemVotes(realmPublicKey: PublicKey, feedItemIds: number[], userIds: string[], environment: Environment): TE.TaskEither<errors.Exception, UserVoteMapping>;
    sendVoteNotification(feedItem: RealmFeedItemPost | RealmFeedItemProposal, environment: Environment): Promise<void>;
    syncProposalsToFeedItems(realmPublicKey: PublicKey, environment: Environment): TE.TaskEither<unknown, RealmFeedItemEntity[]>;
    submitVote(realmPublicKey: PublicKey, id: RealmFeedItemEntity['id'], type: RealmFeedItemVoteType, requestingUser: User | null, environment: Environment): TE.TaskEither<errors.Exception | errors.NotFound, RealmFeedItemPost | RealmFeedItemProposal>;
    private convertEntityToFeedItem;
    private convertPostEntitiesToFeedItems;
    private convertProposalEntitiesToFeedItems;
    private organizeFeedItemsListIntoMap;
    private splitEntitiesIntoTypes;
}
export {};
