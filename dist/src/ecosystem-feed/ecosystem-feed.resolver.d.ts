import { Environment } from '@lib/decorators/CurrentEnvironment';
import { User } from '@lib/decorators/CurrentUser';
import { ConnectionArgs } from '@lib/gqlTypes/Connection';
import { RealmFeedItemSort } from '@src/realm-feed-item/dto/pagination';
import { EcosystemFeedService } from './ecosystem-feed.service';
export declare class EcosystemFeedResolver {
    private readonly ecosystemFeedService;
    constructor(ecosystemFeedService: EcosystemFeedService);
    ecosystemFeed(args: ConnectionArgs, sort: RealmFeedItemSort | undefined, environment: Environment, user: User | null): Promise<{
        edges: {
            node: import("../realm-feed-item/dto/RealmFeedItem").RealmFeedItemPost | import("../realm-feed-item/dto/RealmFeedItem").RealmFeedItemProposal;
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
            node: import("../realm-feed-item/dto/RealmFeedItem").RealmFeedItemPost | import("../realm-feed-item/dto/RealmFeedItem").RealmFeedItemProposal;
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
            node: import("../realm-feed-item/dto/RealmFeedItem").RealmFeedItemPost | import("../realm-feed-item/dto/RealmFeedItem").RealmFeedItemProposal;
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
}
