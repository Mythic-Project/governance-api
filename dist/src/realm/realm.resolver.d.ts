import { PublicKey } from '@solana/web3.js';
import { Environment } from '@lib/decorators/CurrentEnvironment';
import { User } from '@lib/decorators/CurrentUser';
import * as errors from '@lib/errors/gql';
import { ConnectionArgs } from '@lib/gqlTypes/Connection';
import { RealmFeedItemSort } from '@src/realm-feed-item/dto/pagination';
import { RealmFeedItemGQLService } from '@src/realm-feed-item/realm-feed-item.gql.service';
import { RealmFeedItemService } from '@src/realm-feed-item/realm-feed-item.service';
import { GovernanceRules } from '@src/realm-governance/dto/GovernanceRules';
import { RealmGovernanceService } from '@src/realm-governance/realm-governance.service';
import { RealmHubService } from '@src/realm-hub/realm-hub.service';
import { RealmMemberSort } from '@src/realm-member/dto/pagination';
import { RealmMemberService } from '@src/realm-member/realm-member.service';
import { RealmProposalSort } from '@src/realm-proposal/dto/pagination';
import { RealmProposalGQLService } from '@src/realm-proposal/realm-proposal.gql.service';
import { RealmTreasuryService } from '@src/realm-treasury/realm-treasury.service';
import { Realm } from './dto/Realm';
import { RealmFaqItem } from './dto/RealmFaqItem';
import { RealmTeamMember } from './dto/RealmTeamMember';
import { RealmTokenDetails } from './dto/RealmTokenDetails';
import { RealmInput } from './inputDto/RealmInput';
import { RealmService } from './realm.service';
export declare class RealmResolver {
    private readonly realmFeedItemGQLService;
    private readonly realmFeedItemService;
    private readonly realmGovernanceService;
    private readonly realmHubService;
    private readonly realmMemberService;
    private readonly realmProposalGqlService;
    private readonly realmService;
    constructor(realmFeedItemGQLService: RealmFeedItemGQLService, realmFeedItemService: RealmFeedItemService, realmGovernanceService: RealmGovernanceService, realmHubService: RealmHubService, realmMemberService: RealmMemberService, realmProposalGqlService: RealmProposalGQLService, realmService: RealmService);
    amAdmin(realm: Realm, environment: Environment, user: User | null): false | Promise<boolean>;
    clippedHeading(hub: Realm, charLimit?: number, attachmentLimit?: number): {
        document: import("../lib/types/RichTextDocument").RichTextDocument;
        isClipped: boolean;
    } | undefined;
    feed(args: ConnectionArgs, sort: RealmFeedItemSort | undefined, realm: Realm, environment: Environment, user: User | null): import("fp-ts/lib/TaskEither").TaskEither<unknown, {
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
    }> | import("fp-ts/lib/TaskEither").TaskEither<unknown, {
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
    }> | import("fp-ts/lib/TaskEither").TaskEither<unknown, {
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
    governance(governance: PublicKey, realm: Realm, environment: Environment): Promise<GovernanceRules>;
    pinnedFeedItems(realm: Realm, environment: Environment, user: User | null): Promise<import("@src/realm-feed-item/dto/RealmFeedItem").RealmFeedItemProposal[]>;
    members(args: ConnectionArgs, sort: RealmMemberSort | undefined, realm: Realm, environment: Environment): import("fp-ts/lib/TaskEither").TaskEither<Error, {
        edges: {
            node: import("../realm-member/dto/RealmMember").RealmMember;
            cursor: import("io-ts").Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: null;
            endCursor: import("io-ts").Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        };
    }> | import("fp-ts/lib/TaskEither").TaskEither<Error, {
        edges: {
            node: import("../realm-member/dto/RealmMember").RealmMember;
            cursor: import("io-ts").Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: import("io-ts").Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
            endCursor: null;
        };
    }> | import("fp-ts/lib/TaskEither").TaskEither<Error, {
        edges: {
            node: import("../realm-member/dto/RealmMember").RealmMember;
            cursor: import("io-ts").Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: import("io-ts").Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
            endCursor: import("io-ts").Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        };
    }>;
    membersCount(realm: Realm, environment: Environment): Promise<number>;
    proposals(args: ConnectionArgs, sort: RealmProposalSort | undefined, realm: Realm, environment: Environment, user: User | null): import("fp-ts/lib/TaskEither").TaskEither<errors.Exception, {
        edges: {
            node: import("../realm-proposal/dto/RealmProposal").RealmProposal;
            cursor: import("io-ts").Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: null;
            endCursor: import("io-ts").Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        };
    }> | import("fp-ts/lib/TaskEither").TaskEither<errors.Exception, {
        edges: {
            node: import("../realm-proposal/dto/RealmProposal").RealmProposal;
            cursor: import("io-ts").Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: import("io-ts").Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
            endCursor: null;
        };
    }> | import("fp-ts/lib/TaskEither").TaskEither<errors.Exception, {
        edges: {
            node: import("../realm-proposal/dto/RealmProposal").RealmProposal;
            cursor: import("io-ts").Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: import("io-ts").Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
            endCursor: import("io-ts").Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        };
    }>;
    treasury(realm: Realm): {
        belongsTo: PublicKey;
    };
    twitterFollowerCount(realm: Realm, environment: Environment): Promise<number>;
    canAssignSymbolToRealm(realm: PublicKey, symbol: string): Promise<boolean>;
    realm(publicKey: PublicKey, environment: Environment): Promise<Realm>;
    realmByUrlId(id: string, environment: Environment): Promise<Realm>;
    realmDropdownList(environment: Environment): Promise<Realm[]>;
    followRealm(realm: PublicKey, environment: Environment, user: User | null): Promise<{
        publicKey: PublicKey;
    }>;
    unfollowRealm(realm: PublicKey, environment: Environment, user: User | null): Promise<{
        publicKey: PublicKey;
    }>;
    updateRealmMetadata(publicKey: PublicKey, realm: RealmInput, environment: Environment, user: User | null): Promise<Realm>;
}
export declare class RealmFaqItemResolver {
    clippedAnswer(faqItem: RealmFaqItem, charLimit?: number, attachmentLimit?: number): {
        document: import("../lib/types/RichTextDocument").RichTextDocument;
        isClipped: boolean;
    };
}
export declare class RealmTokenDetailsResolver {
    private readonly realmTreasuryService;
    constructor(realmTreasuryService: RealmTreasuryService);
    price(token: RealmTokenDetails, environment: Environment): Promise<number>;
    symbol(token: RealmTokenDetails, environment: Environment): Promise<string>;
}
export declare class RealmTeamMemberResolver {
    private readonly realmHubService;
    constructor(realmHubService: RealmHubService);
    twitterFollowerCount(member: RealmTeamMember): 0 | Promise<number>;
}
