import { PublicKey } from '@solana/web3.js';
import { Cache } from 'cache-manager';
import * as TE from 'fp-ts/TaskEither';
import * as IT from 'io-ts';
import { Environment } from '@lib/decorators/CurrentEnvironment';
import * as errors from '@lib/errors/gql';
import { ConfigService } from '@src/config/config.service';
import { HeliusService } from '@src/helius/helius.service';
import { StaleCacheService } from '@src/stale-cache/stale-cache.service';
import { RealmMemberSort } from './dto/pagination';
import { RealmMember } from './dto/RealmMember';
export declare const RealmMemberCursor: IT.BrandC<IT.StringC, {
    readonly "realm member cursor": symbol;
}>;
export type RealmMemberCursor = IT.TypeOf<typeof RealmMemberCursor>;
export declare class RealmMemberService {
    private readonly cacheManager;
    private readonly configService;
    private readonly heliusService;
    private readonly staleCacheService;
    private logger;
    constructor(cacheManager: Cache, configService: ConfigService, heliusService: HeliusService, staleCacheService: StaleCacheService);
    getCivicHandleForPublicKey(userPublicKey: PublicKey, environment: Environment): TE.TaskEither<errors.Exception, {
        handle: string;
        avatarlUrl?: string | undefined;
        isVerified: boolean;
    } | undefined>;
    getMembersForRealm(realmPublicKey: PublicKey, environment: Environment): TE.TaskEither<Error, RealmMember[]>;
    getMembersCountForRealm(realmPublicKey: PublicKey, environment: Environment): Promise<number>;
    getTwitterHandleForPublicKey(userPublicKey: PublicKey, environment: Environment): TE.TaskEither<errors.Exception, {
        handle: string;
        avatarlUrl?: string | undefined;
    }>;
    getHandleName(userPublicKey: PublicKey, environment: Environment): Promise<string>;
    getFirstNMembers(realmPublicKey: PublicKey, n: number, sortOrder: RealmMemberSort, environment: Environment): TE.TaskEither<Error, RealmMember[]>;
    getLastNMembers(realmPublicKey: PublicKey, n: number, sortOrder: RealmMemberSort, environment: Environment): TE.TaskEither<Error, RealmMember[]>;
    getNMembersAfter(realmPublicKey: PublicKey, n: number, after: RealmMemberCursor, sortOrder: RealmMemberSort, environment: Environment): TE.TaskEither<Error, RealmMember[]>;
    getNMembersBefore(realmPublicKey: PublicKey, n: number, before: RealmMemberCursor, sortOrder: RealmMemberSort, environment: Environment): TE.TaskEither<Error, RealmMember[]>;
    getGQLMemberList(realmPublicKey: PublicKey, sortOrder: RealmMemberSort, environment: Environment, after?: RealmMemberCursor, before?: RealmMemberCursor, first?: number, last?: number): TE.TaskEither<Error, {
        edges: {
            node: RealmMember;
            cursor: IT.Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: null;
            endCursor: IT.Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        };
    }> | TE.TaskEither<Error, {
        edges: {
            node: RealmMember;
            cursor: IT.Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: IT.Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
            endCursor: null;
        };
    }> | TE.TaskEither<Error, {
        edges: {
            node: RealmMember;
            cursor: IT.Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: IT.Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
            endCursor: IT.Branded<string, {
                readonly "realm member cursor": symbol;
            }>;
        };
    }>;
    toCursor<M extends {
        publicKey: PublicKey;
    }>(member: M, sortOrder: RealmMemberSort): IT.Branded<string, {
        readonly "realm member cursor": symbol;
    }>;
    fromCursor(cursor: RealmMemberCursor): {
        sortOrder: RealmMemberSort;
        member: PublicKey;
    };
    private buildEdge;
    private getCivicDetails;
    private getTwitterDetails;
    private sortAlphabetically;
}
