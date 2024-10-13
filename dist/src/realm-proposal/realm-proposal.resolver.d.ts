import { PublicKey } from '@solana/web3.js';
import * as EI from 'fp-ts/Either';
import { Environment } from '@lib/decorators/CurrentEnvironment';
import { User } from '@lib/decorators/CurrentUser';
import * as errors from '@lib/errors/gql';
import { ConnectionArgs } from '@lib/gqlTypes/Connection';
import { RealmProposalSort } from './dto/pagination';
import { RealmProposal } from './dto/RealmProposal';
import { RealmProposalGQLService } from './realm-proposal.gql.service';
export declare class RealmProposalResolver {
    private readonly realmProposalGQLService;
    constructor(realmProposalGQLService: RealmProposalGQLService);
    clippedDocument(charLimit: number | undefined, attachmentLimit: number | undefined, proposal: RealmProposal): EI.Either<errors.Exception, {
        document: import("../lib/types/RichTextDocument").RichTextDocument;
        isClipped: boolean;
    }>;
    proposals(args: ConnectionArgs, realm: PublicKey, sort: RealmProposalSort | undefined, environment: Environment, user: User | null): import("fp-ts/lib/TaskEither").TaskEither<errors.Exception, {
        edges: {
            node: RealmProposal;
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
            node: RealmProposal;
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
            node: RealmProposal;
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
}
