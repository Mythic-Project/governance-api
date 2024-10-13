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
exports.RealmFeedItemCommentService = exports.RealmFeedItemCommentCursor = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const web3_js_1 = require("@solana/web3.js");
const date_fns_1 = require("date-fns");
const FN = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const typeorm_2 = require("typeorm");
const base64 = require("../lib/base64");
const brands_1 = require("../lib/brands");
const errors = require("../lib/errors/gql");
const enhanceRichTextDocument_1 = require("../lib/textManipulation/enhanceRichTextDocument");
const config_service_1 = require("../config/config.service");
const dialect_service_1 = require("../dialect/dialect.service");
const exists_1 = require("../lib/typeGuards/exists");
const RealmFeedItemType_1 = require("../realm-feed-item/dto/RealmFeedItemType");
const RealmFeedItem_entity_1 = require("../realm-feed-item/entities/RealmFeedItem.entity");
const realm_member_service_1 = require("../realm-member/realm-member.service");
const RealmPost_entity_1 = require("../realm-post/entities/RealmPost.entity");
const realm_service_1 = require("../realm/realm.service");
const pagination_1 = require("./dto/pagination");
const RealmFeedItemCommentVoteType_1 = require("./dto/RealmFeedItemCommentVoteType");
const RealmFeedItemComment_entity_1 = require("./entities/RealmFeedItemComment.entity");
const RealmFeedItemCommentVote_entity_1 = require("./entities/RealmFeedItemCommentVote.entity");
exports.RealmFeedItemCommentCursor = (0, brands_1.BrandedString)('realm feed item comment cursor');
const PAGE_SIZE = 25;
let RealmFeedItemCommentService = class RealmFeedItemCommentService {
    constructor(realmFeedItemRepository, realmFeedItemCommentRepository, realmFeedItemCommentVoteRepository, realmPostRepository, configService, dialectService, realmMemberService, realmService) {
        this.realmFeedItemRepository = realmFeedItemRepository;
        this.realmFeedItemCommentRepository = realmFeedItemCommentRepository;
        this.realmFeedItemCommentVoteRepository = realmFeedItemCommentVoteRepository;
        this.realmPostRepository = realmPostRepository;
        this.configService = configService;
        this.dialectService = dialectService;
        this.realmMemberService = realmMemberService;
        this.realmService = realmService;
    }
    async createComment(args) {
        if (args.environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const { requestingUser } = args;
        if (!requestingUser) {
            throw new errors.Unauthorized();
        }
        const enhancedDocument = await (0, enhanceRichTextDocument_1.enhanceRichTextDocument)(args.document, {
            twitterBearerToken: this.configService.get('external.twitterBearerKey'),
        });
        const comment = this.realmFeedItemCommentRepository.create({
            authorId: requestingUser.id,
            data: {
                authorPublicKeyStr: requestingUser.publicKey.toBase58(),
                document: enhancedDocument,
            },
            environment: args.environment,
            feedItemId: args.feedItemId,
            metadata: { relevanceScore: 0, topAllTimeScore: 0, rawScore: 0 },
            parentCommentId: args.parentCommentId || undefined,
            realmPublicKeyStr: args.realmPublicKey.toBase58(),
        });
        const entity = await this.realmFeedItemCommentRepository.save(comment);
        this.sendReplyNotification(entity, args.environment);
        return this.convertEntityToComment({
            entity,
            environment: args.environment,
            requestingUser: args.requestingUser,
            votes: { [entity.id]: {} },
        });
    }
    async deleteComment(args) {
        if (args.environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const canDelete = await this.realmService.userIsAdminMember(args.realmPublicKey, args.requestingUser.publicKey, args.environment);
        if (!canDelete) {
            throw new errors.Unauthorized();
        }
        const comment = await this.realmFeedItemCommentRepository.findOne({ where: { id: args.id } });
        if (!comment) {
            throw new errors.NotFound();
        }
        await this.realmFeedItemCommentRepository.delete(comment.id);
        return true;
    }
    getCommentCountForFeedItem(args) {
        if (args.environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return TE.tryCatch(() => this.realmFeedItemCommentRepository.count({
            where: { feedItemId: args.feedItemId },
        }), (e) => new errors.Exception(e));
    }
    getCommentEntity(args) {
        return FN.pipe(TE.tryCatch(() => this.realmFeedItemCommentRepository.findOne({
            where: {
                id: args.id,
                environment: args.environment,
            },
        }), (e) => new errors.Exception(e)), TE.chainW((entity) => {
            if (entity) {
                return TE.right(entity);
            }
            return TE.left(new errors.NotFound());
        }));
    }
    getCommentTreeForComment(args) {
        return FN.pipe(this.getCommentEntity({ environment: args.environment, id: args.commentId }), TE.bindTo('entity'), TE.bindW('commentTreeData', ({ entity }) => this.getCommentTree({
            commentIds: [entity.id],
            currentDepth: 1,
            currentTree: { map: {}, replies: {}, ids: [] },
            environment: args.environment,
            feedItemId: args.feedItemId,
            requestingUser: args.requestingUser,
            sort: args.sort,
            targetDepth: args.depth,
        })), TE.bindW('userVotes', ({ commentTreeData, entity }) => this.getCommentVotes({
            commentIds: [entity.id].concat(commentTreeData.ids),
            feedItemId: args.feedItemId,
            userIds: args.requestingUser ? [args.requestingUser.id] : [],
            environment: args.environment,
        })), TE.map(({ commentTreeData, entity, userVotes }) => this.buildTree({
            entity,
            currentDepth: 1,
            environment: args.environment,
            requestingUser: args.requestingUser,
            targetDepth: args.depth,
            tree: commentTreeData,
            votes: userVotes,
        })));
    }
    getCommentTreeForFeedItem(args) {
        return FN.pipe(this.getTopLevelComments(args), TE.bindTo('topLevelComments'), TE.bindW('commentTreeData', ({ topLevelComments }) => this.getCommentTree({
            commentIds: topLevelComments.map((comment) => comment.id),
            currentDepth: 1,
            currentTree: { map: {}, replies: {}, ids: [] },
            environment: args.environment,
            feedItemId: args.feedItemId,
            requestingUser: args.requestingUser,
            sort: args.sort,
            targetDepth: args.depth,
        })), TE.bindW('userVotes', ({ commentTreeData, topLevelComments }) => this.getCommentVotes({
            commentIds: commentTreeData.ids.concat(topLevelComments.map((c) => c.id)),
            feedItemId: args.feedItemId,
            userIds: args.requestingUser ? [args.requestingUser.id] : [],
            environment: args.environment,
        })), TE.map(({ commentTreeData, topLevelComments, userVotes }) => topLevelComments.map((entity) => ({
            node: this.buildTree({
                entity,
                currentDepth: 1,
                environment: args.environment,
                requestingUser: args.requestingUser,
                targetDepth: args.depth,
                tree: commentTreeData,
                votes: userVotes,
            }),
            cursor: this.toCursor(entity, args.sort),
        }))), TE.chainW((edges) => {
            var _a, _b, _c, _d;
            if (args.first) {
                return TE.right({
                    edges,
                    pageInfo: {
                        hasNextPage: edges.length > 0,
                        hasPreviousPage: false,
                        startCursor: null,
                        endCursor: (_a = edges[edges.length - 1]) === null || _a === void 0 ? void 0 : _a.cursor,
                    },
                });
            }
            if (args.last) {
                return TE.right({
                    edges,
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: edges.length > 0,
                        startCursor: (_b = edges[0]) === null || _b === void 0 ? void 0 : _b.cursor,
                        endCursor: null,
                    },
                });
            }
            if (args.after) {
                return TE.right({
                    edges,
                    pageInfo: {
                        hasNextPage: edges.length > 0,
                        hasPreviousPage: true,
                        startCursor: args.after,
                        endCursor: (_c = edges[edges.length - 1]) === null || _c === void 0 ? void 0 : _c.cursor,
                    },
                });
            }
            if (args.before) {
                return TE.right({
                    edges,
                    pageInfo: {
                        hasNextPage: true,
                        hasPreviousPage: edges.length > 0,
                        startCursor: (_d = edges[0]) === null || _d === void 0 ? void 0 : _d.cursor,
                        endCursor: args.before,
                    },
                });
            }
            return TE.left(new errors.MalformedRequest());
        }));
    }
    getCommentVotes(args) {
        if (args.environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(TE.tryCatch(() => this.realmFeedItemCommentVoteRepository.find({
            where: {
                commentId: (0, typeorm_2.In)(args.commentIds),
                userId: (0, typeorm_2.In)(args.userIds),
            },
        }), (e) => new errors.Exception(e)), TE.map((entities) => {
            const mapping = {};
            for (const entity of entities) {
                if (!mapping[entity.commentId]) {
                    mapping[entity.commentId] = {};
                }
                mapping[entity.commentId][entity.userId] = entity.data.type;
            }
            return mapping;
        }));
    }
    async sendReplyNotification(comment, environment) {
        let parentAuthorPublicKey = null;
        let parentType = null;
        if (comment.parentCommentId) {
            const parentComment = await this.realmFeedItemCommentRepository.findOne({
                where: { id: comment.parentCommentId },
                relations: ['author'],
            });
            if (parentComment === null || parentComment === void 0 ? void 0 : parentComment.author) {
                parentAuthorPublicKey = new web3_js_1.PublicKey(parentComment.author.publicKeyStr);
                parentType = 'comment';
            }
        }
        else {
            const parentFeedItem = await this.realmFeedItemRepository.findOne({
                where: { id: comment.feedItemId },
            });
            if ((parentFeedItem === null || parentFeedItem === void 0 ? void 0 : parentFeedItem.data.type) === RealmFeedItemType_1.RealmFeedItemType.Post) {
                const parentPost = await this.realmPostRepository.findOne({
                    where: { id: parentFeedItem.data.ref },
                    relations: ['author'],
                });
                if (parentPost) {
                    parentAuthorPublicKey = new web3_js_1.PublicKey(parentPost.author.publicKeyStr);
                    parentType = 'post';
                }
            }
        }
        if (parentAuthorPublicKey && parentType) {
            const handle = await this.realmMemberService.getHandleName(parentAuthorPublicKey, environment);
            const title = `New Reply!`;
            const message = `${handle}, someone replied to your ${parentType}!`;
            const recipient = parentAuthorPublicKey.toBase58();
            this.dialectService.sendMessage(title, message, dialect_service_1.DIALECT_NOTIF_TYPE_ID_REPLY, [recipient]);
        }
    }
    async sendVoteNotification(comment, environment) {
        if (!comment.author) {
            return;
        }
        const authorPublicKey = new web3_js_1.PublicKey(comment.author.publicKey);
        const numVotes = comment.score;
        const handle = await this.realmMemberService.getHandleName(authorPublicKey, environment);
        const title = `👍 New Upvotes!`;
        const message = `${handle}, your comment now has ${numVotes} upvotes!`;
        const recipient = authorPublicKey.toBase58();
        if (comment.score === 1 || comment.score === 5 || comment.score === 10) {
            this.dialectService.sendMessage(title, message, dialect_service_1.DIALECT_NOTIF_TYPE_ID_UPVOTE, [recipient]);
        }
    }
    submitVote(args) {
        if (args.environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        if (!args.requestingUser) {
            return TE.left(new errors.Unauthorized());
        }
        const requestingUser = args.requestingUser;
        const userId = requestingUser.id;
        return FN.pipe(this.getCommentEntity({
            environment: args.environment,
            id: args.id,
        }), TE.bindTo('comment'), TE.bindW('existingVote', ({ comment }) => TE.tryCatch(() => this.realmFeedItemCommentVoteRepository.findOne({
            where: {
                userId,
                commentId: comment.id,
                realmPublicKeyStr: args.realmPublicKey.toBase58(),
            },
        }), (e) => new errors.Exception(e))), TE.bindW('userVoteMap', ({ comment, existingVote }) => {
            if (existingVote && existingVote.data.type === args.type) {
                const relevanceWeight = existingVote.data.relevanceWeight;
                if (existingVote.data.type === RealmFeedItemCommentVoteType_1.RealmFeedItemCommentVoteType.Approve) {
                    comment.metadata.relevanceScore -= relevanceWeight;
                    comment.metadata.rawScore -= 1;
                    comment.metadata.topAllTimeScore -= 1;
                }
                else {
                    comment.metadata.relevanceScore += relevanceWeight;
                    comment.metadata.rawScore += 1;
                    comment.metadata.topAllTimeScore += 1;
                }
                return FN.pipe(TE.tryCatch(() => this.realmFeedItemCommentVoteRepository.remove(existingVote), (e) => new errors.Exception(e)), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemCommentRepository.save(comment), (e) => new errors.Exception(e))), TE.map(() => ({
                    [comment.id]: {},
                })));
            }
            else if (existingVote && existingVote.data.type !== args.type) {
                const relevanceWeight = existingVote.data.relevanceWeight;
                if (args.type === RealmFeedItemCommentVoteType_1.RealmFeedItemCommentVoteType.Approve) {
                    comment.metadata.relevanceScore += 2 * relevanceWeight;
                    comment.metadata.rawScore += 2;
                    comment.metadata.topAllTimeScore += 2;
                }
                else {
                    comment.metadata.relevanceScore -= 2 * relevanceWeight;
                    comment.metadata.rawScore -= 2;
                    comment.metadata.topAllTimeScore -= 2;
                }
                existingVote.data.type = args.type;
                return FN.pipe(TE.tryCatch(() => this.realmFeedItemCommentVoteRepository.save(existingVote), (e) => new errors.Exception(e)), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemCommentRepository.save(comment), (e) => new errors.Exception(e))), TE.map(() => ({
                    [comment.id]: {
                        [userId]: args.type,
                    },
                })));
            }
            else {
                const hours = (0, date_fns_1.differenceInHours)(Date.now(), comment.created);
                const relevanceWeight = 1 - Math.min(1, Math.ceil(hours / this.configService.get('constants.voteDecay')));
                if (args.type === RealmFeedItemCommentVoteType_1.RealmFeedItemCommentVoteType.Approve) {
                    comment.metadata.relevanceScore += relevanceWeight;
                    comment.metadata.rawScore += 1;
                    comment.metadata.topAllTimeScore += 1;
                }
                else {
                    comment.metadata.relevanceScore -= relevanceWeight;
                    comment.metadata.rawScore -= 1;
                    comment.metadata.topAllTimeScore -= 1;
                }
                const vote = this.realmFeedItemCommentVoteRepository.create({
                    userId,
                    commentId: comment.id,
                    realmPublicKeyStr: args.realmPublicKey.toBase58(),
                    data: { relevanceWeight, type: args.type },
                });
                return FN.pipe(TE.tryCatch(() => this.realmFeedItemCommentVoteRepository.save(vote), (e) => new errors.Exception(e)), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemCommentRepository.save(comment), (e) => new errors.Exception(e))), TE.map(() => ({
                    [comment.id]: {
                        [userId]: args.type,
                    },
                })));
            }
        }), TE.bindW('replies', ({ comment }) => this.getCommentReplies({
            commentIds: [comment.id],
            environment: args.environment,
            feedItemId: comment.feedItemId,
            sort: pagination_1.RealmFeedItemCommentSort.Relevance,
            requestingUser: args.requestingUser,
        })), TE.map(({ comment, replies, userVoteMap }) => {
            var _a;
            return (Object.assign(Object.assign({}, this.convertEntityToComment({
                requestingUser,
                entity: comment,
                environment: args.environment,
                votes: userVoteMap,
            })), { repliesCount: ((_a = replies.replies[comment.id]) === null || _a === void 0 ? void 0 : _a.length) || 0 }));
        }), TE.map((comment) => {
            this.sendVoteNotification(comment, args.environment);
            return comment;
        }));
    }
    toCursor(feedItem, sortOrder) {
        let id;
        switch (sortOrder) {
            case pagination_1.RealmFeedItemCommentSort.New: {
                id = feedItem.updated.getTime().toString();
                break;
            }
            case pagination_1.RealmFeedItemCommentSort.Relevance: {
                const updatedAsNumber = parseInt((0, date_fns_1.format)(feedItem.updated, 'yyyyMMddHHmm'), 10);
                const score = feedItem.metadata.relevanceScore + updatedAsNumber / 10;
                id = score.toString();
                break;
            }
            case pagination_1.RealmFeedItemCommentSort.TopAllTime: {
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
            case pagination_1.RealmFeedItemCommentSort.New:
                return {
                    sortOrder,
                    feedItem: new Date(parseInt(parsed.feedItem, 10)),
                };
            case pagination_1.RealmFeedItemCommentSort.Relevance:
                return {
                    sortOrder,
                    feedItem: parseFloat(parsed.feedItem),
                };
            case pagination_1.RealmFeedItemCommentSort.TopAllTime:
                return {
                    sortOrder,
                    feedItem: parseFloat(parsed.feedItem),
                };
        }
    }
    buildTree(args) {
        var _a;
        const comment = this.convertEntityToComment({
            entity: args.entity,
            environment: args.environment,
            requestingUser: args.requestingUser,
            votes: args.votes,
        });
        if ((_a = args.tree.replies[args.entity.id]) === null || _a === void 0 ? void 0 : _a.length) {
            if (args.currentDepth < args.targetDepth) {
                const replies = args.tree.replies[args.entity.id]
                    .map((id) => args.tree.map[id])
                    .filter(exists_1.exists)
                    .map((entity) => this.buildTree({
                    entity,
                    currentDepth: args.currentDepth + 1,
                    environment: args.environment,
                    requestingUser: args.requestingUser,
                    targetDepth: args.targetDepth,
                    tree: args.tree,
                    votes: args.votes,
                }));
                comment.replies = replies;
            }
            comment.repliesCount = args.tree.replies[args.entity.id].length;
        }
        else {
            comment.repliesCount = 0;
        }
        return comment;
    }
    convertEntityToComment(args) {
        var _a;
        const myVote = args.requestingUser
            ? (_a = args.votes[args.entity.id]) === null || _a === void 0 ? void 0 : _a[args.requestingUser.id]
            : undefined;
        return {
            myVote,
            author: args.entity.data.authorPublicKeyStr
                ? { publicKey: new web3_js_1.PublicKey(args.entity.data.authorPublicKeyStr) }
                : undefined,
            created: args.entity.created,
            document: args.entity.data.document,
            feedItemId: args.entity.feedItemId,
            id: args.entity.id,
            parentCommentId: args.entity.parentCommentId,
            repliesCount: 0,
            replies: null,
            score: args.entity.metadata.rawScore,
            updated: args.entity.updated,
        };
    }
    getCommentReplies(args) {
        return FN.pipe(TE.tryCatch(() => args.commentIds.length
            ? this.realmFeedItemCommentRepository
                .createQueryBuilder('comment')
                .where('comment.environment = :env', { env: args.environment })
                .andWhere('comment.parentCommentId IN (:...ids)', { ids: args.commentIds })
                .andWhere('comment.feedItemId = :feedItemId', { feedItemId: args.feedItemId })
                .orderBy(this.orderByClause('comment', args.sort))
                .getMany()
            : Promise.resolve([]), (e) => new errors.Exception(e)), TE.bindTo('entities'), TE.bindW('map', ({ entities }) => TE.right(entities.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {}))), TE.bindW('replies', ({ entities }) => TE.right(entities.reduce((acc, item) => {
            if (item.parentCommentId) {
                if (!acc[item.parentCommentId]) {
                    acc[item.parentCommentId] = [];
                }
                acc[item.parentCommentId].push(item.id);
            }
            return acc;
        }, {}))), TE.map(({ entities, map, replies }) => ({
            map,
            replies,
            ids: entities.map((item) => item.id),
        })));
    }
    getCommentTree(args) {
        if (args.currentDepth <= args.targetDepth) {
            return FN.pipe(this.getCommentReplies({
                commentIds: args.commentIds,
                environment: args.environment,
                feedItemId: args.feedItemId,
                requestingUser: args.requestingUser,
                sort: args.sort,
            }), TE.bindTo('replies'), TE.bindW('moreReplies', ({ replies }) => {
                if (args.currentDepth === args.targetDepth) {
                    return TE.right({ map: {}, replies: {}, ids: [] });
                }
                else {
                    return this.getCommentTree({
                        commentIds: replies.ids,
                        currentDepth: args.currentDepth + 1,
                        currentTree: replies,
                        environment: args.environment,
                        feedItemId: args.feedItemId,
                        requestingUser: args.requestingUser,
                        sort: args.sort,
                        targetDepth: args.targetDepth,
                    });
                }
            }), TE.map(({ replies, moreReplies }) => ({
                map: Object.assign(Object.assign({}, replies.map), moreReplies.map),
                replies: Object.assign(Object.assign({}, replies.replies), moreReplies.replies),
                ids: replies.ids.concat(moreReplies.ids),
            })));
        }
        return TE.right(args.currentTree);
    }
    getTopLevelComments(args) {
        if (args.first) {
            return this.getFirstNTopLevelComments({
                environment: args.environment,
                feedItemId: args.feedItemId,
                n: args.first,
                requestingUser: args.requestingUser,
                sort: args.sort,
            });
        }
        if (args.last) {
            return this.getLastNTopLevelComments({
                environment: args.environment,
                feedItemId: args.feedItemId,
                n: args.last,
                requestingUser: args.requestingUser,
                sort: args.sort,
            });
        }
        if (args.after) {
            return this.getNTopLevelCommentsAfter({
                after: args.after,
                environment: args.environment,
                feedItemId: args.feedItemId,
                n: PAGE_SIZE,
                requestingUser: args.requestingUser,
                sort: args.sort,
            });
        }
        if (args.before) {
            return this.getNTopLevelCommentsBefore({
                before: args.before,
                environment: args.environment,
                feedItemId: args.feedItemId,
                n: PAGE_SIZE,
                requestingUser: args.requestingUser,
                sort: args.sort,
            });
        }
        return TE.left(new errors.MalformedRequest());
    }
    getFirstNTopLevelComments(args) {
        if (args.environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return TE.tryCatch(() => this.realmFeedItemCommentRepository
            .createQueryBuilder('comment')
            .where('comment.environment = :env', { env: args.environment })
            .andWhere('comment.parentCommentId IS NULL')
            .andWhere('comment.feedItemId = :feedItemId', { feedItemId: args.feedItemId })
            .orderBy(this.orderByClause('comment', args.sort))
            .limit(args.n)
            .getMany(), (e) => new errors.Exception(e));
    }
    getLastNTopLevelComments(args) {
        if (args.environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(TE.tryCatch(() => this.realmFeedItemCommentRepository
            .createQueryBuilder('comment')
            .where('comment.environment = :env', { env: args.environment })
            .andWhere('comment.parentCommentId IS NULL')
            .andWhere('comment.feedItemId = :feedItemId', { feedItemId: args.feedItemId })
            .orderBy(this.orderByClause('comment', args.sort, false))
            .limit(args.n)
            .getMany(), (e) => new errors.Exception(e)), TE.map((entities) => entities.sort(this.sortEntities(args.sort))));
    }
    getNTopLevelCommentsAfter(args) {
        if (args.environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        const parsedCursor = this.fromCursor(args.after);
        if (parsedCursor.sortOrder !== args.sort) {
            return TE.left(new errors.MalformedRequest());
        }
        const afterClause = this.cursorClause(args.after, 'comment');
        return TE.tryCatch(() => this.realmFeedItemCommentRepository
            .createQueryBuilder('comment')
            .where('comment.environment = :env', { env: args.environment })
            .andWhere('comment.parentCommentId IS NULL')
            .andWhere('comment.feedItemId = :feedItemId', { feedItemId: args.feedItemId })
            .andWhere(afterClause.clause, afterClause.params)
            .orderBy(this.orderByClause('comment', args.sort))
            .limit(args.n)
            .getMany(), (e) => new errors.Exception(e));
    }
    getNTopLevelCommentsBefore(args) {
        if (args.environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        const parsedCursor = this.fromCursor(args.before);
        if (parsedCursor.sortOrder !== args.sort) {
            return TE.left(new errors.MalformedRequest());
        }
        const beforeClause = this.cursorClause(args.before, 'comment', false);
        return FN.pipe(TE.tryCatch(() => this.realmFeedItemCommentRepository
            .createQueryBuilder('comment')
            .where('comment.environment = :env', { env: args.environment })
            .andWhere('comment.parentCommentId IS NULL')
            .andWhere('comment.feedItemId = :feedItemId', { feedItemId: args.feedItemId })
            .andWhere(beforeClause.clause, beforeClause.params)
            .orderBy(this.orderByClause('comment', args.sort, false))
            .limit(args.n)
            .getMany(), (e) => new errors.Exception(e)), TE.map((entities) => entities.sort(this.sortEntities(args.sort))));
    }
    cursorClause(cursor, name, forwards = true) {
        const parsedCursor = this.fromCursor(cursor);
        const { sortOrder, feedItem } = parsedCursor;
        if (sortOrder === pagination_1.RealmFeedItemCommentSort.New) {
            return {
                clause: `${name}.updated ${forwards ? '<' : '>'} :date`,
                params: { date: feedItem },
            };
        }
        else if (sortOrder === pagination_1.RealmFeedItemCommentSort.Relevance) {
            return {
                clause: `((${name}.metadata->'relevanceScore')::decimal + ((to_char(${name}.updated, 'YYYYMMDDHH24MI')::decimal) / 10)) ${forwards ? '<' : '>'} :score`,
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
            case pagination_1.RealmFeedItemCommentSort.New:
                return {
                    [`${name}.updated`]: desc,
                };
            case pagination_1.RealmFeedItemCommentSort.Relevance:
                return {
                    [`((${name}.metadata->'relevanceScore')::decimal + ((to_char(${name}.updated, 'YYYYMMDDHH24MI')::decimal) / 10))`]: desc,
                };
            case pagination_1.RealmFeedItemCommentSort.TopAllTime:
                return {
                    [`${name}.metadata->'topAllTimeScore'`]: desc,
                };
        }
    }
    sortEntities(sortOrder) {
        return (a, b) => {
            switch (sortOrder) {
                case pagination_1.RealmFeedItemCommentSort.New: {
                    return (0, date_fns_1.compareDesc)(a.updated, b.updated);
                }
                case pagination_1.RealmFeedItemCommentSort.Relevance: {
                    if (a.metadata.relevanceScore === b.metadata.relevanceScore) {
                        return this.sortEntities(pagination_1.RealmFeedItemCommentSort.New)(a, b);
                    }
                    return b.metadata.relevanceScore - a.metadata.relevanceScore;
                }
                case pagination_1.RealmFeedItemCommentSort.TopAllTime: {
                    if (a.metadata.topAllTimeScore === b.metadata.topAllTimeScore) {
                        return this.sortEntities(pagination_1.RealmFeedItemCommentSort.New)(a, b);
                    }
                    return b.metadata.topAllTimeScore - a.metadata.topAllTimeScore;
                }
            }
        };
    }
};
RealmFeedItemCommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(RealmFeedItem_entity_1.RealmFeedItem)),
    __param(1, (0, typeorm_1.InjectRepository)(RealmFeedItemComment_entity_1.RealmFeedItemComment)),
    __param(2, (0, typeorm_1.InjectRepository)(RealmFeedItemCommentVote_entity_1.RealmFeedItemCommentVote)),
    __param(3, (0, typeorm_1.InjectRepository)(RealmPost_entity_1.RealmPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_service_1.ConfigService,
        dialect_service_1.DialectService,
        realm_member_service_1.RealmMemberService,
        realm_service_1.RealmService])
], RealmFeedItemCommentService);
exports.RealmFeedItemCommentService = RealmFeedItemCommentService;
//# sourceMappingURL=realm-feed-item-comment.service.js.map