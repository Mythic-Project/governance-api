import { PublicKey } from '@solana/web3.js';
import { ConnectionArgs } from '@lib/gqlTypes/Connection';
import { Environment } from '@src/lib/decorators/CurrentEnvironment';
import { RealmMemberSort } from './dto/pagination';
import { RealmMember } from './dto/RealmMember';
import { RealmMemberService } from './realm-member.service';
export declare class RealmMemberResolver {
    private readonly realmMemberService;
    constructor(realmMemberService: RealmMemberService);
    civicInfo(member: RealmMember, environment: Environment): import("fp-ts/lib/TaskEither").TaskEither<import("../lib/errors/gql").Exception, {
        handle: string;
        avatarlUrl?: string | undefined;
        isVerified: boolean;
    } | undefined>;
    twitterInfo(member: RealmMember, environment: Environment): import("fp-ts/lib/TaskEither").TaskEither<import("../lib/errors/gql").Exception, {
        handle: string;
        avatarlUrl?: string | undefined;
    }>;
    members(args: ConnectionArgs, realm: PublicKey, sort: RealmMemberSort | undefined, environment: Environment): import("fp-ts/lib/TaskEither").TaskEither<Error, {
        edges: {
            node: RealmMember;
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
            node: RealmMember;
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
            node: RealmMember;
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
}
