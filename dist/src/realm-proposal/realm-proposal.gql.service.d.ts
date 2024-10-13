import { PublicKey } from '@solana/web3.js';
import * as TE from 'fp-ts/TaskEither';
import * as IT from 'io-ts';
import * as errors from '@lib/errors/gql';
import { Environment } from '@lib/types/Environment';
import { RealmProposalSort } from './dto/pagination';
import { RealmProposal } from './dto/RealmProposal';
import { RealmProposalService } from './realm-proposal.service';
export declare const RealmProposalCursor: IT.BrandC<IT.StringC, {
    readonly "realm proposal cursor": symbol;
}>;
export type RealmProposalCursor = IT.TypeOf<typeof RealmProposalCursor>;
export declare class RealmProposalGQLService {
    private readonly realmProposalService;
    constructor(realmProposalService: RealmProposalService);
    getFirstNProposals(realmPublicKey: PublicKey, requestingUser: PublicKey | null, n: number, sortOrder: RealmProposalSort, environment: Environment): TE.TaskEither<errors.Exception, RealmProposal[]>;
    getLastNProposals(realmPublicKey: PublicKey, requestingUser: PublicKey | null, n: number, sortOrder: RealmProposalSort, environment: Environment): TE.TaskEither<errors.Exception, RealmProposal[]>;
    getNProposalsAfter(realmPublicKey: PublicKey, requestingUser: PublicKey | null, n: number, after: RealmProposalCursor, sortOrder: RealmProposalSort, environment: Environment): TE.TaskEither<errors.Exception, RealmProposal[]>;
    getNProposalsBefore(realmPublicKey: PublicKey, requestingUser: PublicKey | null, n: number, before: RealmProposalCursor, sortOrder: RealmProposalSort, environment: Environment): TE.TaskEither<errors.Exception, RealmProposal[]>;
    getGQLProposalList(realmPublicKey: PublicKey, requestingUser: PublicKey | null, sortOrder: RealmProposalSort, environment: Environment, after?: RealmProposalCursor, before?: RealmProposalCursor, first?: number, last?: number): TE.TaskEither<errors.Exception, {
        edges: {
            node: RealmProposal;
            cursor: IT.Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: null;
            endCursor: IT.Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        };
    }> | TE.TaskEither<errors.Exception, {
        edges: {
            node: RealmProposal;
            cursor: IT.Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: IT.Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
            endCursor: null;
        };
    }> | TE.TaskEither<errors.Exception, {
        edges: {
            node: RealmProposal;
            cursor: IT.Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        }[];
        pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: IT.Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
            endCursor: IT.Branded<string, {
                readonly "realm proposal cursor": symbol;
            }>;
        };
    }>;
    toCursor<M extends {
        publicKey: PublicKey;
    }>(proposal: M, sortOrder: RealmProposalSort): IT.Branded<string, {
        readonly "realm proposal cursor": symbol;
    }>;
    fromCursor(cursor: RealmProposalCursor): {
        sortOrder: RealmProposalSort;
        proposal: PublicKey;
    };
    private buildEdge;
}
