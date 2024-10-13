import { PublicKey } from '@solana/web3.js';
import { Environment } from '@lib/decorators/CurrentEnvironment';
import { User } from '@lib/decorators/CurrentUser';
import { ConnectionArgs } from '@lib/gqlTypes/Connection';
import { RealmFeedItemSort } from '@src/realm-feed-item/dto/pagination';
import { RealmFeedItemGQLService } from '@src/realm-feed-item/realm-feed-item.gql.service';
import { RealmFeedService } from './realm-feed.service';
export declare class RealmFeedResolver {
    private readonly realmFeedService;
    private readonly realmFeedItemGQLService;
    constructor(realmFeedService: RealmFeedService, realmFeedItemGQLService: RealmFeedItemGQLService);
    feed(args: ConnectionArgs, realm: PublicKey, sort: RealmFeedItemSort | undefined, environment: Environment, user: User | null): import("fp-ts/lib/TaskEither").TaskEither<unknown, {
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
    }> | import("fp-ts/lib/TaskEither").TaskEither<unknown, {
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
    }> | import("fp-ts/lib/TaskEither").TaskEither<unknown, {
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
