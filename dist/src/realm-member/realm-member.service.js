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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RealmMemberService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmMemberService = exports.RealmMemberCursor = void 0;
const namespaces_1 = require("@cardinal/namespaces");
const profile_1 = require("@civic/profile");
const common_1 = require("@nestjs/common");
const web3_js_1 = require("@solana/web3.js");
const date_fns_1 = require("date-fns");
const AR = require("fp-ts/Array");
const EI = require("fp-ts/Either");
const FN = require("fp-ts/function");
const OP = require("fp-ts/Option");
const TE = require("fp-ts/TaskEither");
const base64 = require("../lib/base64");
const brands_1 = require("../lib/brands");
const errors = require("../lib/errors/gql");
const abbreviateAddress_1 = require("../lib/textManipulation/abbreviateAddress");
const config_service_1 = require("../config/config.service");
const helius_service_1 = require("../helius/helius.service");
const stale_cache_service_1 = require("../stale-cache/stale-cache.service");
exports.RealmMemberCursor = (0, brands_1.BrandedString)('realm member cursor');
const ENDPOINT = 'http://realms-realms-c335.mainnet.rpcpool.com/258d3727-bb96-409d-abea-0b1b4c48af29/';
const PAGE_SIZE = 25;
let RealmMemberService = RealmMemberService_1 = class RealmMemberService {
    constructor(cacheManager, configService, heliusService, staleCacheService) {
        this.cacheManager = cacheManager;
        this.configService = configService;
        this.heliusService = heliusService;
        this.staleCacheService = staleCacheService;
        this.logger = new common_1.Logger(RealmMemberService_1.name);
        this.getCivicDetails = this.staleCacheService.dedupe(async (publicKey) => {
            var _a;
            const connection = new web3_js_1.Connection(ENDPOINT);
            const details = await profile_1.CivicProfile.get(publicKey.toBase58(), {
                solana: { connection },
            });
            if (details.name) {
                return {
                    handle: details.name.value,
                    avatarUrl: (_a = details.image) === null || _a === void 0 ? void 0 : _a.url,
                    isVerified: details.name.verified,
                };
            }
            return undefined;
        }, {
            dedupeKey: (publicKey) => publicKey.toBase58(),
            maxStaleAgeMs: (0, date_fns_1.hoursToMilliseconds)(1),
        });
        this.getTwitterDetails = this.staleCacheService.dedupe(async (publicKey, bearerToken) => {
            const connection = new web3_js_1.Connection(ENDPOINT);
            const namespace = await (0, namespaces_1.getNamespaceByName)(connection, 'twitter');
            const displayName = await (0, namespaces_1.nameForDisplay)(connection, publicKey, namespace.pubkey);
            const username = displayName.replace('@', '');
            return fetch(`https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            })
                .then((resp) => resp.json())
                .then((result) => { var _a; return (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.profile_image_url; })
                .then((url) => ({
                avatarUrl: url ? url.replace('_normal', '') : undefined,
                handle: displayName,
            }));
        }, {
            dedupeKey: (publicKey, bearerToken) => publicKey.toBase58() + bearerToken,
            maxStaleAgeMs: (0, date_fns_1.hoursToMilliseconds)(1),
        });
    }
    getCivicHandleForPublicKey(userPublicKey, environment) {
        const cacheKey = `civic-handle-${userPublicKey.toBase58()}`;
        return FN.pipe(TE.tryCatch(() => this.cacheManager.get(cacheKey), (e) => new errors.Exception(e)), TE.chainW((result) => result
            ? TE.right(result)
            : FN.pipe(TE.tryCatch(() => this.getCivicDetails(userPublicKey), (e) => new errors.Exception(e)), TE.chainW((result) => TE.tryCatch(() => this.cacheManager.set(cacheKey, result, 60 * 2), (e) => new errors.Exception(e))))));
    }
    getMembersForRealm(realmPublicKey, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return TE.of([]);
    }
    async getMembersCountForRealm(realmPublicKey, environment) {
        return 0;
    }
    getTwitterHandleForPublicKey(userPublicKey, environment) {
        const cacheKey = `twitter-handle-${userPublicKey.toBase58()}`;
        return FN.pipe(TE.tryCatch(() => this.cacheManager.get(cacheKey), (e) => new errors.Exception(e)), TE.chainW((result) => result
            ? TE.right(result)
            : FN.pipe(TE.tryCatch(() => this.getTwitterDetails(userPublicKey, this.configService.get('external.twitterBearerKey')), (e) => new errors.Exception(e)), TE.chainW((result) => TE.tryCatch(() => this.cacheManager.set(cacheKey, result, 60 * 2), (e) => new errors.Exception(e))))));
    }
    async getHandleName(userPublicKey, environment) {
        var _a, _b;
        const civicDetails = await this.getCivicHandleForPublicKey(userPublicKey, environment)();
        if (EI.isRight(civicDetails) && ((_a = civicDetails.right) === null || _a === void 0 ? void 0 : _a.handle)) {
            return (_b = civicDetails.right) === null || _b === void 0 ? void 0 : _b.handle;
        }
        const twitterDetails = await this.getTwitterHandleForPublicKey(userPublicKey, environment)();
        if (EI.isRight(twitterDetails) && twitterDetails.right.handle) {
            return twitterDetails.right.handle;
        }
        return (0, abbreviateAddress_1.abbreviateAddress)(userPublicKey);
    }
    getFirstNMembers(realmPublicKey, n, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(this.getMembersForRealm(realmPublicKey, environment), TE.map((members) => {
            switch (sortOrder) {
                default:
                    return members.sort(this.sortAlphabetically);
            }
        }), TE.map(AR.takeLeft(n)));
    }
    getLastNMembers(realmPublicKey, n, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(this.getMembersForRealm(realmPublicKey, environment), TE.map((members) => {
            switch (sortOrder) {
                default:
                    return members.sort(this.sortAlphabetically);
            }
        }), TE.map(AR.takeRight(n)));
    }
    getNMembersAfter(realmPublicKey, n, after, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        const parsedCursor = this.fromCursor(after);
        if (parsedCursor.sortOrder !== sortOrder) {
            return TE.left(new errors.MalformedData());
        }
        return FN.pipe(this.getMembersForRealm(realmPublicKey, environment), TE.map((members) => {
            switch (sortOrder) {
                default:
                    return members.sort(this.sortAlphabetically);
            }
        }), TE.map(AR.dropLeftWhile((member) => !member.publicKey.equals(parsedCursor.member))), TE.map(AR.tail), TE.map((remainder) => (OP.isNone(remainder) ? [] : AR.takeLeft(n)(remainder.value))));
    }
    getNMembersBefore(realmPublicKey, n, before, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        const parsedCursor = this.fromCursor(before);
        if (parsedCursor.sortOrder !== sortOrder) {
            return TE.left(new errors.MalformedData());
        }
        return FN.pipe(this.getMembersForRealm(realmPublicKey, environment), TE.map((members) => {
            switch (sortOrder) {
                default:
                    return members.sort(this.sortAlphabetically);
            }
        }), TE.map(AR.takeLeftWhile((member) => !member.publicKey.equals(parsedCursor.member))), TE.map(AR.takeRight(n)));
    }
    getGQLMemberList(realmPublicKey, sortOrder, environment, after, before, first, last) {
        if (first) {
            return FN.pipe(this.getFirstNMembers(realmPublicKey, first, sortOrder, environment), TE.map((members) => {
                var _a;
                const edges = members.map((member) => this.buildEdge(member, sortOrder));
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
            return FN.pipe(this.getLastNMembers(realmPublicKey, last, sortOrder, environment), TE.map((members) => {
                var _a;
                const edges = members.map((member) => this.buildEdge(member, sortOrder));
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
            return FN.pipe(this.getNMembersAfter(realmPublicKey, PAGE_SIZE, after, sortOrder, environment), TE.map((members) => {
                var _a;
                const edges = members.map((member) => this.buildEdge(member, sortOrder));
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
            return FN.pipe(this.getNMembersBefore(realmPublicKey, PAGE_SIZE, before, sortOrder, environment), TE.map((members) => {
                var _a;
                const edges = members.map((member) => this.buildEdge(member, sortOrder));
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
        return TE.left(new errors.MalformedData());
    }
    toCursor(member, sortOrder) {
        return base64.encode(JSON.stringify({
            sortOrder,
            member: member.publicKey.toBase58(),
        }));
    }
    fromCursor(cursor) {
        const decoded = base64.decode(cursor);
        const parsed = JSON.parse(decoded);
        return {
            sortOrder: parsed.sortOrder,
            member: new web3_js_1.PublicKey(parsed.member),
        };
    }
    buildEdge(member, sort) {
        return {
            node: member,
            cursor: this.toCursor(member, sort),
        };
    }
    sortAlphabetically(a, b) {
        if (a.name && b.name) {
            return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());
        }
        else if (a.name) {
            return -1;
        }
        else if (b.name) {
            return 1;
        }
        else {
            return a.publicKey.toBase58().localeCompare(b.publicKey.toBase58());
        }
    }
};
RealmMemberService = RealmMemberService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, config_service_1.ConfigService,
        helius_service_1.HeliusService,
        stale_cache_service_1.StaleCacheService])
], RealmMemberService);
exports.RealmMemberService = RealmMemberService;
//# sourceMappingURL=realm-member.service.js.map