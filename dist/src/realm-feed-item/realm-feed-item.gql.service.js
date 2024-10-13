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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemGQLService = exports.RealmFeedItemCursor = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
const FN = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const typeorm_2 = require("typeorm");
const base64 = require("../lib/base64");
const brands_1 = require("../lib/brands");
const errors = require("../lib/errors/gql");
const config_service_1 = require("../config/config.service");
const exists_1 = require("../lib/typeGuards/exists");
const pagination_1 = require("./dto/pagination");
const RealmFeedItem_entity_1 = require("./entities/RealmFeedItem.entity");
const realm_feed_item_service_1 = require("./realm-feed-item.service");
exports.RealmFeedItemCursor = (0, brands_1.BrandedString)('realm feed item cursor');
const PAGE_SIZE = 25;
let RealmFeedItemGQLService = class RealmFeedItemGQLService {
    constructor(configService, realmFeedItemService, realmFeedItemRepository) {
        this.configService = configService;
        this.realmFeedItemService = realmFeedItemService;
        this.realmFeedItemRepository = realmFeedItemRepository;
    }
    getFirstNFeedItems(realmPublicKey, requestingUser, n, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(this.realmFeedItemService.syncProposalsToFeedItems(realmPublicKey, environment), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemRepository
            .createQueryBuilder('feeditem')
            .where('feeditem.environment = :env', { env: environment })
            .andWhere('((feeditem.realmPublicKeyStr = :pk) OR ((feedItem."crosspostedRealms" IS NOT NULL) AND (:pk = ANY(feedItem."crosspostedRealms"))))', {
            pk: realmPublicKey.toBase58(),
        })
            .orderBy(this.orderByClause('feeditem', sortOrder))
            .limit(n)
            .getMany(), (e) => new errors.Exception(e))));
    }
    getLastNFeedItems(realmPublicKey, requestingUser, n, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(this.realmFeedItemService.syncProposalsToFeedItems(realmPublicKey, environment), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemRepository
            .createQueryBuilder('feeditem')
            .where('feeditem.environment = :env', { env: environment })
            .andWhere('((feeditem.realmPublicKeyStr = :pk) OR ((feedItem."crosspostedRealms" IS NOT NULL) AND (:pk = ANY(feedItem."crosspostedRealms"))))', { pk: realmPublicKey.toBase58() })
            .orderBy(this.orderByClause('feeditem', sortOrder, false))
            .limit(n)
            .getMany(), (e) => new errors.Exception(e))), TE.map((entities) => entities.sort(this.sortEntities(sortOrder))));
    }
    getNFeedItemsAfter(realmPublicKey, requestingUser, n, after, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        const parsedCursor = this.fromCursor(after);
        if (parsedCursor.sortOrder !== sortOrder) {
            return TE.left(new errors.MalformedRequest());
        }
        const afterClause = this.cursorClause(after, 'feeditem');
        return FN.pipe(this.realmFeedItemService.syncProposalsToFeedItems(realmPublicKey, environment), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemRepository
            .createQueryBuilder('feeditem')
            .where('feeditem.environment = :env', { env: environment })
            .andWhere('((feeditem.realmPublicKeyStr = :pk) OR ((feedItem."crosspostedRealms" IS NOT NULL) AND (:pk = ANY(feedItem."crosspostedRealms"))))', { pk: realmPublicKey.toBase58() })
            .andWhere(afterClause.clause, afterClause.params)
            .orderBy(this.orderByClause('feeditem', sortOrder))
            .limit(n)
            .getMany(), (e) => new errors.Exception(e))));
    }
    getNFeedItemsBefore(realmPublicKey, requestingUser, n, after, sortOrder, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        const parsedCursor = this.fromCursor(after);
        if (parsedCursor.sortOrder !== sortOrder) {
            return TE.left(new errors.MalformedRequest());
        }
        const beforeClause = this.cursorClause(after, 'feeditem', false);
        return FN.pipe(this.realmFeedItemService.syncProposalsToFeedItems(realmPublicKey, environment), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemRepository
            .createQueryBuilder('feeditem')
            .where('feeditem.environment = :env', { env: environment })
            .andWhere('((feeditem.realmPublicKeyStr = :pk) OR ((feedItem."crosspostedRealms" IS NOT NULL) AND (:pk = ANY(feedItem."crosspostedRealms"))))', { pk: realmPublicKey.toBase58() })
            .andWhere(beforeClause.clause, beforeClause.params)
            .orderBy(this.orderByClause('feeditem', sortOrder, false))
            .limit(n)
            .getMany(), (e) => new errors.Exception(e))), TE.map((entities) => entities.sort(this.sortEntities(sortOrder))));
    }
    getGQLFeedItemsList(realmPublicKey, requestingUser, sortOrder, environment, after, before, first, last) {
        if (first) {
            return FN.pipe(this.getFirstNFeedItems(realmPublicKey, requestingUser, first, sortOrder, environment), TE.bindTo('entities'), TE.bindW('feedItems', ({ entities }) => TE.tryCatch(() => this.realmFeedItemService.convertMixedFeedEntitiesToFeedItem(entities, requestingUser, environment), (e) => new errors.Exception(e))), TE.map(({ entities, feedItems }) => {
                var _a;
                const edges = entities
                    .map((entity) => {
                    const data = feedItems[entity.id];
                    if (!data) {
                        return null;
                    }
                    return this.buildEdge(entity, data, sortOrder);
                })
                    .filter(exists_1.exists);
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
            return FN.pipe(this.getLastNFeedItems(realmPublicKey, requestingUser, last, sortOrder, environment), TE.bindTo('entities'), TE.bindW('feedItems', ({ entities }) => TE.tryCatch(() => this.realmFeedItemService.convertMixedFeedEntitiesToFeedItem(entities, requestingUser, environment), (e) => new errors.Exception(e))), TE.map(({ entities, feedItems }) => {
                var _a;
                const edges = entities
                    .map((entity) => {
                    const data = feedItems[entity.id];
                    if (!data) {
                        return null;
                    }
                    return this.buildEdge(entity, data, sortOrder);
                })
                    .filter(exists_1.exists);
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
            return FN.pipe(this.getNFeedItemsAfter(realmPublicKey, requestingUser, PAGE_SIZE, after, sortOrder, environment), TE.bindTo('entities'), TE.bindW('feedItems', ({ entities }) => TE.tryCatch(() => this.realmFeedItemService.convertMixedFeedEntitiesToFeedItem(entities, requestingUser, environment), (e) => new errors.Exception(e))), TE.map(({ entities, feedItems }) => {
                var _a;
                const edges = entities
                    .map((entity) => {
                    const data = feedItems[entity.id];
                    if (!data) {
                        return null;
                    }
                    return this.buildEdge(entity, data, sortOrder);
                })
                    .filter(exists_1.exists);
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
            return FN.pipe(this.getNFeedItemsBefore(realmPublicKey, requestingUser, PAGE_SIZE, before, sortOrder, environment), TE.bindTo('entities'), TE.bindW('feedItems', ({ entities }) => TE.tryCatch(() => this.realmFeedItemService.convertMixedFeedEntitiesToFeedItem(entities, requestingUser, environment), (e) => new errors.Exception(e))), TE.map(({ entities, feedItems }) => {
                var _a;
                const edges = entities
                    .map((entity) => {
                    const data = feedItems[entity.id];
                    if (!data) {
                        return null;
                    }
                    return this.buildEdge(entity, data, sortOrder);
                })
                    .filter(exists_1.exists);
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
    toCursor(feedItem, sortOrder) {
        let id;
        switch (sortOrder) {
            case pagination_1.RealmFeedItemSort.New: {
                id = feedItem.updated.getTime().toString();
                break;
            }
            case pagination_1.RealmFeedItemSort.Relevance: {
                const updatedAsNumber = parseInt((0, date_fns_1.format)(feedItem.updated, 'yyyyMMddHHmm'), 10);
                const score = feedItem.metadata.relevanceScore +
                    updatedAsNumber / this.configService.get('constants.timeValue');
                id = score.toString();
                break;
            }
            case pagination_1.RealmFeedItemSort.TopAllTime: {
                id = feedItem.metadata.topAllTimeScore.toString();
                break;
            }
        }
        return base64.encode(JSON.stringify({
            sortOrder,
            feedItem: id,
        }));
    }
    fromCursor(cursor) {
        const decoded = base64.decode(cursor);
        const parsed = JSON.parse(decoded);
        const sortOrder = parsed.sortOrder;
        switch (sortOrder) {
            case pagination_1.RealmFeedItemSort.New:
                return {
                    sortOrder,
                    feedItem: new Date(parseInt(parsed.feedItem, 10)),
                };
            case pagination_1.RealmFeedItemSort.Relevance:
                return {
                    sortOrder,
                    feedItem: parseFloat(parsed.feedItem),
                };
            case pagination_1.RealmFeedItemSort.TopAllTime:
                return {
                    sortOrder,
                    feedItem: parseFloat(parsed.feedItem),
                };
        }
    }
    buildEdge(entity, feedItem, sort) {
        return {
            node: feedItem,
            cursor: this.toCursor(entity, sort),
        };
    }
    sortEntities(sortOrder) {
        return (a, b) => {
            switch (sortOrder) {
                case pagination_1.RealmFeedItemSort.New: {
                    return (0, date_fns_1.compareDesc)(a.updated, b.updated);
                }
                case pagination_1.RealmFeedItemSort.Relevance: {
                    if (a.metadata.relevanceScore === b.metadata.relevanceScore) {
                        return this.sortEntities(pagination_1.RealmFeedItemSort.New)(a, b);
                    }
                    return b.metadata.relevanceScore - a.metadata.relevanceScore;
                }
                case pagination_1.RealmFeedItemSort.TopAllTime: {
                    if (a.metadata.topAllTimeScore === b.metadata.topAllTimeScore) {
                        return this.sortEntities(pagination_1.RealmFeedItemSort.New)(a, b);
                    }
                    return b.metadata.topAllTimeScore - a.metadata.topAllTimeScore;
                }
            }
        };
    }
    cursorClause(cursor, name, forwards = true) {
        const parsedCursor = this.fromCursor(cursor);
        const { sortOrder, feedItem } = parsedCursor;
        if (sortOrder === pagination_1.RealmFeedItemSort.New) {
            return {
                clause: `${name}.updated ${forwards ? '<' : '>'} :date`,
                params: { date: feedItem },
            };
        }
        else if (sortOrder === pagination_1.RealmFeedItemSort.Relevance) {
            return {
                clause: `((${name}.metadata->'relevanceScore')::decimal + ((to_char(${name}.updated, 'YYYYMMDDHH24MI')::decimal) / ${this.configService.get('constants.timeValue')})) ${forwards ? '<' : '>'} :score`,
                params: { score: feedItem },
            };
        }
        else {
            return {
                clause: `${name}.metadata->'topAllTimeScore' ${forwards ? '<' : '>'} :score`,
                params: { score: feedItem },
            };
        }
    }
    orderByClause(name, sortOrder, forwards = true) {
        const desc = forwards ? 'DESC' : 'ASC';
        switch (sortOrder) {
            case pagination_1.RealmFeedItemSort.New:
                return {
                    [`${name}.updated`]: desc,
                };
            case pagination_1.RealmFeedItemSort.Relevance:
                return {
                    [`((${name}.metadata->'relevanceScore')::decimal + ((to_char(${name}.updated, 'YYYYMMDDHH24MI')::decimal) / ${this.configService.get('constants.timeValue')}))`]: desc,
                };
            case pagination_1.RealmFeedItemSort.TopAllTime:
                return {
                    [`${name}.metadata->'topAllTimeScore'`]: desc,
                };
        }
    }
};
RealmFeedItemGQLService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(RealmFeedItem_entity_1.RealmFeedItem)),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        realm_feed_item_service_1.RealmFeedItemService,
        typeorm_2.Repository])
], RealmFeedItemGQLService);
exports.RealmFeedItemGQLService = RealmFeedItemGQLService;
//# sourceMappingURL=realm-feed-item.gql.service.js.map