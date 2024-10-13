import { Repository } from 'typeorm';
import { User } from '@lib/decorators/CurrentUser';
import { Environment } from '@lib/types/Environment';
import { ConfigService } from '@src/config/config.service';
import { RealmFeedItemSort } from '@src/realm-feed-item/dto/pagination';
import { RealmFeedItem as RealmFeedItemEntity } from '@src/realm-feed-item/entities/RealmFeedItem.entity';
import { RealmFeedItemCursor } from '@src/realm-feed-item/realm-feed-item.gql.service';
import { RealmFeedItemService } from '@src/realm-feed-item/realm-feed-item.service';
export declare class EcosystemFeedService {
    private readonly realmFeedItemRepository;
    private readonly configService;
    private readonly realmFeedItemService;
    constructor(realmFeedItemRepository: Repository<RealmFeedItemEntity>, configService: ConfigService, realmFeedItemService: RealmFeedItemService);
    convertEntitiesToFeedItems(entities: RealmFeedItemEntity[], requestingUser: User | null, environment: Environment): Promise<{
        [id: string]: import("@src/realm-feed-item/dto/RealmFeedItem").RealmFeedItemPost | import("@src/realm-feed-item/dto/RealmFeedItem").RealmFeedItemProposal;
    }>;
    getFirstNFeedItems(requestingUser: User | null, n: number, sortOrder: RealmFeedItemSort, environment: Environment): Promise<RealmFeedItemEntity[]>;
    getLastNFeedItems(requestingUser: User | null, n: number, sortOrder: RealmFeedItemSort, environment: Environment): Promise<RealmFeedItemEntity[]>;
    getNFeedItemsAfter(requestingUser: User | null, n: number, after: RealmFeedItemCursor, sortOrder: RealmFeedItemSort, environment: Environment): Promise<RealmFeedItemEntity[]>;
    getNFeedItemsBefore(requestingUser: User | null, n: number, after: RealmFeedItemCursor, sortOrder: RealmFeedItemSort, environment: Environment): Promise<RealmFeedItemEntity[]>;
    getGQLFeedItemsList(requestingUser: User | null, sortOrder: RealmFeedItemSort, environment: Environment, after?: RealmFeedItemCursor, before?: RealmFeedItemCursor, first?: number, last?: number): Promise<{
        edges: {
            node: import("@src/realm-feed-item/dto/RealmFeedItem").RealmFeedItemPost | import("@src/realm-feed-item/dto/RealmFeedItem").RealmFeedItemProposal;
            cursor: import("io-ts").Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: null;
            endCursor: import("io-ts").Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        };
    } | {
        edges: {
            node: import("@src/realm-feed-item/dto/RealmFeedItem").RealmFeedItemPost | import("@src/realm-feed-item/dto/RealmFeedItem").RealmFeedItemProposal;
            cursor: import("io-ts").Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: import("io-ts").Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
            endCursor: null;
        };
    } | {
        edges: {
            node: import("@src/realm-feed-item/dto/RealmFeedItem").RealmFeedItemPost | import("@src/realm-feed-item/dto/RealmFeedItem").RealmFeedItemProposal;
            cursor: import("io-ts").Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: import("io-ts").Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
            endCursor: import("io-ts").Branded<string, {
                readonly "realm feed item cursor": symbol;
            }>;
        };
    }>;
    toCursor(feedItem: RealmFeedItemEntity, sortOrder: RealmFeedItemSort): import("io-ts").Branded<string, {
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
