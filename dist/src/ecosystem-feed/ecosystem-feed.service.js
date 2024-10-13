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
exports.EcosystemFeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
const typeorm_2 = require("typeorm");
const base64 = require("../lib/base64");
const errors = require("../lib/errors/gql");
const config_service_1 = require("../config/config.service");
const exists_1 = require("../lib/typeGuards/exists");
const pagination_1 = require("../realm-feed-item/dto/pagination");
const RealmFeedItem_entity_1 = require("../realm-feed-item/entities/RealmFeedItem.entity");
const realm_feed_item_service_1 = require("../realm-feed-item/realm-feed-item.service");
const PAGE_SIZE = 25;
let EcosystemFeedService = class EcosystemFeedService {
    constructor(realmFeedItemRepository, configService, realmFeedItemService) {
        this.realmFeedItemRepository = realmFeedItemRepository;
        this.configService = configService;
        this.realmFeedItemService = realmFeedItemService;
    }
    async convertEntitiesToFeedItems(entities, requestingUser, environment) {
        return this.realmFeedItemService.convertMixedFeedEntitiesToFeedItem(entities, requestingUser, environment);
    }
    async getFirstNFeedItems(requestingUser, n, sortOrder, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const items = await this.realmFeedItemRepository
            .createQueryBuilder('feeditem')
            .where('feeditem.environment = :env', { env: environment })
            .orderBy(this.orderByClause('feeditem', sortOrder))
            .limit(n)
            .getMany();
        return items;
    }
    async getLastNFeedItems(requestingUser, n, sortOrder, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const items = await this.realmFeedItemRepository
            .createQueryBuilder('feeditem')
            .where('feeditem.environment = :env', { env: environment })
            .orderBy(this.orderByClause('feeditem', sortOrder, false))
            .limit(n)
            .getMany();
        return items.sort(this.sortEntities(sortOrder));
    }
    async getNFeedItemsAfter(requestingUser, n, after, sortOrder, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const parsedCursor = this.fromCursor(after);
        if (parsedCursor.sortOrder !== sortOrder) {
            throw new errors.MalformedRequest();
        }
        const afterClause = this.cursorClause(after, 'feeditem');
        const items = await this.realmFeedItemRepository
            .createQueryBuilder('feeditem')
            .where('feeditem.environment = :env', { env: environment })
            .andWhere(afterClause.clause, afterClause.params)
            .orderBy(this.orderByClause('feeditem', sortOrder))
            .limit(n)
            .getMany();
        return items;
    }
    async getNFeedItemsBefore(requestingUser, n, after, sortOrder, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const parsedCursor = this.fromCursor(after);
        if (parsedCursor.sortOrder !== sortOrder) {
            throw new errors.MalformedRequest();
        }
        const beforeClause = this.cursorClause(after, 'feeditem', false);
        const items = await this.realmFeedItemRepository
            .createQueryBuilder('feeditem')
            .where('feeditem.environment = :env', { env: environment })
            .andWhere(beforeClause.clause, beforeClause.params)
            .orderBy(this.orderByClause('feeditem', sortOrder, false))
            .limit(n)
            .getMany();
        return items.sort(this.sortEntities(sortOrder));
    }
    async getGQLFeedItemsList(requestingUser, sortOrder, environment, after, before, first, last) {
        var _a, _b, _c, _d;
        if (first) {
            const items = await this.getFirstNFeedItems(requestingUser, first, sortOrder, environment);
            const feedItems = await this.convertEntitiesToFeedItems(items, requestingUser, environment);
            const edges = items
                .map((entity) => feedItems[entity.id] ? this.buildEdge(entity, feedItems[entity.id], sortOrder) : null)
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
        }
        if (last) {
            const items = await this.getLastNFeedItems(requestingUser, last, sortOrder, environment);
            const feedItems = await this.convertEntitiesToFeedItems(items, requestingUser, environment);
            const edges = items
                .map((entity) => feedItems[entity.id] ? this.buildEdge(entity, feedItems[entity.id], sortOrder) : null)
                .filter(exists_1.exists);
            return {
                edges,
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: edges.length > 0,
                    startCursor: (_b = edges[0]) === null || _b === void 0 ? void 0 : _b.cursor,
                    endCursor: null,
                },
            };
        }
        if (after) {
            const items = await this.getNFeedItemsAfter(requestingUser, PAGE_SIZE, after, sortOrder, environment);
            const feedItems = await this.convertEntitiesToFeedItems(items, requestingUser, environment);
            const edges = items
                .map((entity) => feedItems[entity.id] ? this.buildEdge(entity, feedItems[entity.id], sortOrder) : null)
                .filter(exists_1.exists);
            return {
                edges,
                pageInfo: {
                    hasNextPage: edges.length > 0,
                    hasPreviousPage: true,
                    startCursor: after,
                    endCursor: (_c = edges[edges.length - 1]) === null || _c === void 0 ? void 0 : _c.cursor,
                },
            };
        }
        if (before) {
            const items = await this.getNFeedItemsBefore(requestingUser, PAGE_SIZE, before, sortOrder, environment);
            const feedItems = await this.convertEntitiesToFeedItems(items, requestingUser, environment);
            const edges = items
                .map((entity) => feedItems[entity.id] ? this.buildEdge(entity, feedItems[entity.id], sortOrder) : null)
                .filter(exists_1.exists);
            return {
                edges,
                pageInfo: {
                    hasNextPage: true,
                    hasPreviousPage: edges.length > 0,
                    startCursor: (_d = edges[0]) === null || _d === void 0 ? void 0 : _d.cursor,
                    endCursor: before,
                },
            };
        }
        throw new errors.MalformedRequest();
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
EcosystemFeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(RealmFeedItem_entity_1.RealmFeedItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_service_1.ConfigService,
        realm_feed_item_service_1.RealmFeedItemService])
], EcosystemFeedService);
exports.EcosystemFeedService = EcosystemFeedService;
//# sourceMappingURL=ecosystem-feed.service.js.map