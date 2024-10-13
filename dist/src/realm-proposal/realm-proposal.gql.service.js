"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmProposalGQLService = exports.RealmProposalCursor = void 0;
const common_1 = require("@nestjs/common");
const web3_js_1 = require("@solana/web3.js");
const AR = require("fp-ts/Array");
const FN = require("fp-ts/function");
const OP = require("fp-ts/Option");
const TE = require("fp-ts/TaskEither");
const base64 = require("../lib/base64");
const brands_1 = require("../lib/brands");
const errors = require("../lib/errors/gql");
const realm_proposal_service_1 = require("./realm-proposal.service");
exports.RealmProposalCursor = (0, brands_1.BrandedString)('realm proposal cursor');
const PAGE_SIZE = 25;
let RealmProposalGQLService = class RealmProposalGQLService {
    constructor(realmProposalService) {
        this.realmProposalService = realmProposalService;
    }
    getFirstNProposals(realmPublicKey, requestingUser, n, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(TE.tryCatch(() => this.realmProposalService.getProposalsForRealmAndUser(realmPublicKey, requestingUser, sortOrder, environment), (e) => new errors.Exception(e)), TE.map(AR.takeLeft(n)));
    }
    getLastNProposals(realmPublicKey, requestingUser, n, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(TE.tryCatch(() => this.realmProposalService.getProposalsForRealmAndUser(realmPublicKey, requestingUser, sortOrder, environment), (e) => new errors.Exception(e)), TE.map(AR.takeRight(n)));
    }
    getNProposalsAfter(realmPublicKey, requestingUser, n, after, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        const parsedCursor = this.fromCursor(after);
        if (parsedCursor.sortOrder !== sortOrder) {
            return TE.left(new errors.MalformedRequest());
        }
        return FN.pipe(TE.tryCatch(() => this.realmProposalService.getProposalsForRealmAndUser(realmPublicKey, requestingUser, sortOrder, environment), (e) => new errors.Exception(e)), TE.map(AR.dropLeftWhile((proposal) => !proposal.publicKey.equals(parsedCursor.proposal))), TE.map(AR.tail), TE.map((remainder) => (OP.isNone(remainder) ? [] : AR.takeLeft(n)(remainder.value))));
    }
    getNProposalsBefore(realmPublicKey, requestingUser, n, before, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        const parsedCursor = this.fromCursor(before);
        if (parsedCursor.sortOrder !== sortOrder) {
            return TE.left(new errors.MalformedRequest());
        }
        return FN.pipe(TE.tryCatch(() => this.realmProposalService.getProposalsForRealmAndUser(realmPublicKey, requestingUser, sortOrder, environment), (e) => new errors.Exception(e)), TE.map(AR.takeLeftWhile((proposal) => !proposal.publicKey.equals(parsedCursor.proposal))), TE.map(AR.takeRight(n)));
    }
    getGQLProposalList(realmPublicKey, requestingUser, sortOrder, environment, after, before, first, last) {
        if (first) {
            return FN.pipe(this.getFirstNProposals(realmPublicKey, requestingUser, first, sortOrder, environment), TE.map((proposals) => {
                var _a;
                const edges = proposals.map((proposal) => this.buildEdge(proposal, sortOrder));
                return {
                    edges,
                    pageInfo: {
                        hasNextPage: edges.length > 0,
                        hasPreviousPage: false,
                        startCursor: null,
                        endCursor: (_a = edges[edges.length - 1]) === null || _a === void 0 ? void 0 : _a.cursor,
                    },
                };
            }));
        }
        if (last) {
            return FN.pipe(this.getLastNProposals(realmPublicKey, requestingUser, last, sortOrder, environment), TE.map((proposals) => {
                var _a;
                const edges = proposals.map((proposal) => this.buildEdge(proposal, sortOrder));
                return {
                    edges,
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: edges.length > 0,
                        startCursor: (_a = edges[0]) === null || _a === void 0 ? void 0 : _a.cursor,
                        endCursor: null,
                    },
                };
            }));
        }
        if (after) {
            return FN.pipe(this.getNProposalsAfter(realmPublicKey, requestingUser, PAGE_SIZE, after, sortOrder, environment), TE.map((proposals) => {
                var _a;
                const edges = proposals.map((proposal) => this.buildEdge(proposal, sortOrder));
                return {
                    edges,
                    pageInfo: {
                        hasNextPage: edges.length > 0,
                        hasPreviousPage: true,
                        startCursor: after,
                        endCursor: (_a = edges[edges.length - 1]) === null || _a === void 0 ? void 0 : _a.cursor,
                    },
                };
            }));
        }
        if (before) {
            return FN.pipe(this.getNProposalsBefore(realmPublicKey, requestingUser, PAGE_SIZE, before, sortOrder, environment), TE.map((proposals) => {
                var _a;
                const edges = proposals.map((proposal) => this.buildEdge(proposal, sortOrder));
                return {
                    edges,
                    pageInfo: {
                        hasNextPage: true,
                        hasPreviousPage: edges.length > 0,
                        startCursor: (_a = edges[0]) === null || _a === void 0 ? void 0 : _a.cursor,
                        endCursor: before,
                    },
                };
            }));
        }
        return TE.left(new errors.MalformedRequest());
    }
    toCursor(proposal, sortOrder) {
        return base64.encode(JSON.stringify({
            sortOrder,
            proposal: proposal.publicKey.toBase58(),
        }));
    }
    fromCursor(cursor) {
        const decoded = base64.decode(cursor);
        const parsed = JSON.parse(decoded);
        return {
            sortOrder: parsed.sortOrder,
            proposal: new web3_js_1.PublicKey(parsed.proposal),
        };
    }
    buildEdge(proposal, sort) {
        return {
            node: proposal,
            cursor: this.toCursor(proposal, sort),
        };
    }
};
RealmProposalGQLService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [realm_proposal_service_1.RealmProposalService])
], RealmProposalGQLService);
exports.RealmProposalGQLService = RealmProposalGQLService;
//# sourceMappingURL=realm-proposal.gql.service.js.map