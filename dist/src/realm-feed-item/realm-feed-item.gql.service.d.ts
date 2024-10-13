import { PublicKey } from '@solana/web3.js';
import * as TE from 'fp-ts/TaskEither';
import * as IT from 'io-ts';
import { Repository } from 'typeorm';
import { User } from '@lib/decorators/CurrentUser';
import { Environment } from '@lib/types/Environment';
import { ConfigService } from '@src/config/config.service';
import { RealmFeedItemSort } from './dto/pagination';
import { RealmFeedItem as RealmFeedItemEntity } from './entities/RealmFeedItem.entity';
import { RealmFeedItemService } from './realm-feed-item.service';
export declare const RealmFeedItemCursor: IT.BrandC<IT.StringC, {
    readonly "realm feed item cursor": symbol;
}>;
export type RealmFeedItemCursor = IT.TypeOf<typeof RealmFeedItemCursor>;
export declare class RealmFeedItemGQLService {
    private readonly configService;
    private readonly realmFeedItemService;
    private readonly realmFeedItemRepository;
    constructor(configService: ConfigService, realmFeedItemService: RealmFeedItemService, realmFeedItemRepository: Repository<RealmFeedItemEntity>);
    getFirstNFeedItems(realmPublicKey: PublicKey, requestingUser: User | null, n: number, sortOrder: RealmFeedItemSort, environment: Environment): TE.TaskEither<unknown, RealmFeedItemEntity[]>;
    getLastNFeedItems(realmPublicKey: PublicKey, requestingUser: User | null, n: number, sortOrder: RealmFeedItemSort, environment: Environment): TE.TaskEither<unknown, RealmFeedItemEntity[]>;
    getNFeedItemsAfter(realmPublicKey: PublicKey, requestingUser: User | null, n: number, after: RealmFeedItemCursor, sortOrder: RealmFeedItemSort, environment: Environment): TE.TaskEither<unknown, RealmFeedItemEntity[]>;
    getNFeedItemsBefore(realmPublicKey: PublicKey, requestingUser: User | null, n: number, after: RealmFeedItemCursor, sortOrder: RealmFeedItemSort, environment: Environment): TE.TaskEither<unknown, RealmFeedItemEntity[]>;
    getGQLFeedItemsList(realmPublicKey: PublicKey, requestingUser: User | null, sortOrder: RealmFeedItemSort, environment: Environment, after?: RealmFeedItemCursor, before?: RealmFeedItemCursor, first?: number, last?: number): TE.TaskEither<unknown, {
        edges: {
            node: import("./dto/RealmFeedItem").RealmFeedItemPost | import("./dto/RealmFeedItem").RealmFeedItemProposal;
            cursor: IT.Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: null;
            endCursor: IT.Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        };
    }> | TE.TaskEither<unknown, {
        edges: {
            node: import("./dto/RealmFeedItem").RealmFeedItemPost | import("./dto/RealmFeedItem").RealmFeedItemProposal;
            cursor: IT.Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: IT.Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
            endCursor: null;
        };
    }> | TE.TaskEither<unknown, {
        edges: {
            node: import("./dto/RealmFeedItem").RealmFeedItemPost | import("./dto/RealmFeedItem").RealmFeedItemProposal;
            cursor: IT.Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: IT.Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
            endCursor: IT.Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        };
    }>;
    toCursor(feedItem: RealmFeedItemEntity, sortOrder: RealmFeedItemSort): IT.Branded<string, {
        readonly "realm feed item cursor": symbol;
    }>;
    fromCursor(cursor: RealmFeedItemCursor): {
        sortOrder: RealmFeedItemSort.New;
        feedItem: Date;
    } | {
        sortOrder: RealmFeedItemSort.Relevance;
        feedItem: number;
    } | {
        sortOrder: RealmFeedItemSort.TopAllTime;
        feedItem: number;
    };
    private buildEdge;
    private sortEntities;
    private cursorClause;
    private orderByClause;
}
