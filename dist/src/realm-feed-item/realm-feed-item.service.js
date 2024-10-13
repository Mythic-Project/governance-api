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
var RealmFeedItemService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const web3_js_1 = require("@solana/web3.js");
const date_fns_1 = require("date-fns");
const EI = require("fp-ts/Either");
const FN = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const typeorm_2 = require("typeorm");
const errors = require("../lib/errors/gql");
const enhanceRichTextDocument_1 = require("../lib/textManipulation/enhanceRichTextDocument");
const exists_1 = require("../lib/typeGuards/exists");
const config_service_1 = require("../config/config.service");
const dialect_service_1 = require("../dialect/dialect.service");
const RealmFeedItemComment_entity_1 = require("../realm-feed-item-comment/entities/RealmFeedItemComment.entity");
const realm_feed_item_comment_service_1 = require("../realm-feed-item-comment/realm-feed-item-comment.service");
const realm_member_service_1 = require("../realm-member/realm-member.service");
const RealmPost_entity_1 = require("../realm-post/entities/RealmPost.entity");
const realm_post_service_1 = require("../realm-post/realm-post.service");
const RealmProposalState_1 = require("../realm-proposal/dto/RealmProposalState");
const realm_proposal_service_1 = require("../realm-proposal/realm-proposal.service");
const realm_service_1 = require("../realm/realm.service");
const stale_cache_service_1 = require("../stale-cache/stale-cache.service");
const task_dedupe_service_1 = require("../task-dedupe/task-dedupe.service");
const RealmFeedItemType_1 = require("./dto/RealmFeedItemType");
const RealmFeedItemVoteType_1 = require("./dto/RealmFeedItemVoteType");
const RealmFeedItem_entity_1 = require("./entities/RealmFeedItem.entity");
const RealmFeedItemVote_entity_1 = require("./entities/RealmFeedItemVote.entity");
let RealmFeedItemService = RealmFeedItemService_1 = class RealmFeedItemService {
    constructor(realmFeedItemCommentRepository, realmFeedItemRepository, realmFeedItemVoteRepository, realmPostRepository, configService, dialectService, realmFeedItemCommentService, realmMemberService, realmPostService, realmProposalService, realmService, staleCacheService, taskDedupeService) {
        this.realmFeedItemCommentRepository = realmFeedItemCommentRepository;
        this.realmFeedItemRepository = realmFeedItemRepository;
        this.realmFeedItemVoteRepository = realmFeedItemVoteRepository;
        this.realmPostRepository = realmPostRepository;
        this.configService = configService;
        this.dialectService = dialectService;
        this.realmFeedItemCommentService = realmFeedItemCommentService;
        this.realmMemberService = realmMemberService;
        this.realmPostService = realmPostService;
        this.realmProposalService = realmProposalService;
        this.realmService = realmService;
        this.staleCacheService = staleCacheService;
        this.taskDedupeService = taskDedupeService;
        this.logger = new common_1.Logger(RealmFeedItemService_1.name);
    }
    async convertMixedFeedEntitiesToFeedItem(entities, requestingUser, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const groups = this.groupEntitesByRealm(entities);
        const realms = Object.keys(groups);
        const feedItemsResp = await Promise.all(realms.map((realmPublicKeyStr) => {
            const groupEntities = groups[realmPublicKeyStr];
            return this.convertEntitiesToFeedItems(new web3_js_1.PublicKey(realmPublicKeyStr), groupEntities, requestingUser, environment)();
        }));
        const feedItems = feedItemsResp.reduce((acc, items) => {
            if (EI.isLeft(items)) {
                return acc;
            }
            return Object.assign(Object.assign({}, acc), items.right);
        }, {});
        return feedItems;
    }
    convertEntitiesToFeedItems(realmPublicKey, entities, requestingUser, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(TE.of(this.splitEntitiesIntoTypes(entities)), TE.bindTo('entities'), TE.bindW('votes', ({ entities }) => this.getFeedItemVotes(realmPublicKey, entities.posts.concat(entities.proposals).map((entity) => entity.id), requestingUser ? [requestingUser.id] : [], environment)), TE.bindW('posts', ({ entities, votes }) => this.convertPostEntitiesToFeedItems(realmPublicKey, entities.posts, requestingUser, votes, environment)), TE.bindW('proposals', ({ entities, votes }) => this.convertProposalEntitiesToFeedItems(realmPublicKey, entities.proposals, requestingUser, votes, environment)), TE.map(({ posts, proposals }) => this.organizeFeedItemsListIntoMap([...posts, ...proposals])));
    }
    async createPost(args) {
        if (args.environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const requestingUser = args.requestingUser;
        if (!requestingUser) {
            throw new errors.Unauthorized();
        }
        const enhancedDocument = await (0, enhanceRichTextDocument_1.enhanceRichTextDocument)(args.document, {
            twitterBearerToken: this.configService.get('external.twitterBearerKey'),
        });
        const postResp = await this.realmPostService.createPost(args.realmPublicKey, args.title, enhancedDocument, requestingUser, args.environment)();
        if (EI.isLeft(postResp)) {
            throw postResp.left;
        }
        const post = postResp.right;
        const feedItem = this.realmFeedItemRepository.create({
            data: {
                type: RealmFeedItemType_1.RealmFeedItemType.Post,
                ref: post.id,
            },
            crosspostedRealms: args.crosspostTo ? args.crosspostTo.map((pk) => pk.toBase58()) : null,
            environment: args.environment,
            metadata: {
                relevanceScore: 0,
                topAllTimeScore: 0,
                rawScore: 0,
            },
            realmPublicKeyStr: args.realmPublicKey.toBase58(),
            updated: new Date(),
        });
        await this.realmFeedItemRepository.save(feedItem);
        const feedItemPost = {
            post: post,
            type: RealmFeedItemType_1.RealmFeedItemType.Post,
            author: post.author,
            created: feedItem.created,
            document: post.document,
            id: feedItem.id,
            realmPublicKey: args.realmPublicKey,
            score: feedItem.metadata.rawScore,
            title: post.title,
            updated: feedItem.updated,
        };
        return feedItemPost;
    }
    async deletePost(args) {
        if (args.environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const canDelete = await this.realmService.userIsAdminMember(args.realmPublicKey, args.requestingUser.publicKey, args.environment);
        if (!canDelete) {
            throw new errors.Unauthorized();
        }
        const feedItem = await this.realmFeedItemRepository.findOne({ where: { id: args.id } });
        if (!feedItem) {
            throw new errors.NotFound();
        }
        if (feedItem.data.type === RealmFeedItemType_1.RealmFeedItemType.Proposal) {
            throw new errors.MalformedRequest('You cannot delete a Proposal');
        }
        const post = await this.realmPostRepository.findOne({ where: { id: feedItem.data.ref } });
        const comments = await this.realmFeedItemCommentRepository.find({
            where: { feedItemId: feedItem.id },
        });
        if (comments.length) {
            await this.realmFeedItemCommentRepository.delete(comments.map((c) => c.id));
        }
        await this.realmFeedItemRepository.delete(feedItem.id);
        if (post) {
            await this.realmPostRepository.delete(post.id);
        }
        return true;
    }
    groupEntitesByRealm(entities) {
        const groups = {};
        for (const entity of entities) {
            if (!groups[entity.realmPublicKeyStr]) {
                groups[entity.realmPublicKeyStr] = [];
            }
            groups[entity.realmPublicKeyStr].push(entity);
        }
        return groups;
    }
    getFeedItemEntity(realmPublicKey, id, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(TE.tryCatch(() => this.realmFeedItemRepository.findOne({
            where: { id, realmPublicKeyStr: realmPublicKey.toBase58() },
        }), (e) => new errors.Exception(e)), TE.chainW(TE.fromNullable(new errors.NotFound())));
    }
    getFeedItem(realmPublicKey, id, requestingUser, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(this.getFeedItemEntity(realmPublicKey, id, environment), TE.bindTo('entity'), TE.bindW('votes', ({ entity }) => this.getFeedItemVotes(realmPublicKey, [entity.id], requestingUser ? [requestingUser.id] : [], environment)), TE.chainW(({ entity, votes }) => this.convertEntityToFeedItem(realmPublicKey, entity, requestingUser, votes, environment)));
    }
    async getFeedItems(ids, requestingUser, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const items = await this.realmFeedItemRepository.find({ where: { id: (0, typeorm_2.In)(ids) } });
        const votesResp = await Promise.all(items.map((item) => this.getFeedItemVotes(new web3_js_1.PublicKey(item.realmPublicKeyStr), [item.id], requestingUser ? [requestingUser.id] : [], environment)()));
        const votes = votesResp.reduce((acc, item) => {
            if (EI.isRight(item)) {
                for (const feedItemId of Object.keys(item.right)) {
                    if (!acc[feedItemId]) {
                        acc[feedItemId] = {};
                    }
                    const userVotes = item.right[feedItemId];
                    for (const userId of Object.keys(userVotes)) {
                        acc[feedItemId][userId] = userVotes[userId];
                    }
                }
            }
            return acc;
        }, {});
        const entitiesResp = await Promise.all(items.map((item) => this.convertEntityToFeedItem(new web3_js_1.PublicKey(item.realmPublicKeyStr), item, requestingUser, votes, environment)()));
        return entitiesResp
            .map((resp) => {
            if (EI.isRight(resp)) {
                return resp.right;
            }
            return null;
        })
            .filter(exists_1.exists);
    }
    async getPinnedFeedItems(realmPublicKey, requestingUser, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        await this.syncProposalsToFeedItems(realmPublicKey, environment)();
        const proposalsResp = await this.realmProposalService.getProposalsForRealm(realmPublicKey, environment);
        const openProposals = proposalsResp
            .filter((proposal) => proposal.state === RealmProposalState_1.RealmProposalState.Voting ||
            proposal.state === RealmProposalState_1.RealmProposalState.Executable)
            .sort((a, b) => {
            const aScore = a.state === RealmProposalState_1.RealmProposalState.Voting ? 20 : 10;
            const bScore = b.state === RealmProposalState_1.RealmProposalState.Voting ? 20 : 10;
            if (aScore === bScore) {
                return (0, date_fns_1.compareDesc)(a.updated, b.updated);
            }
            else {
                return bScore - aScore;
            }
        });
        const entities = (await Promise.all(openProposals.map((proposal) => this.realmFeedItemRepository
            .createQueryBuilder('feedItem')
            .where(`"feedItem"."data"->'type' = :type`, {
            type: JSON.stringify(RealmFeedItemType_1.RealmFeedItemType.Proposal),
        })
            .andWhere(`"feedItem"."data"->'ref' = :ref`, {
            ref: JSON.stringify(proposal.publicKey.toBase58()),
        })
            .getOne()
            .catch(() => null)))).filter(exists_1.exists);
        const votesResp = await this.getFeedItemVotes(realmPublicKey, entities.map((e) => e.id), requestingUser ? [requestingUser.id] : [], environment)();
        if (EI.isLeft(votesResp)) {
            throw votesResp.left;
        }
        const votes = votesResp.right;
        const feedItemsResp = await this.convertProposalEntitiesToFeedItems(realmPublicKey, entities, requestingUser, votes, environment)();
        if (EI.isLeft(feedItemsResp)) {
            throw feedItemsResp.left;
        }
        return feedItemsResp.right;
    }
    getFeedItemVotes(realmPublicKey, feedItemIds, userIds, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(TE.tryCatch(() => this.realmFeedItemVoteRepository.find({
            where: {
                feedItemId: (0, typeorm_2.In)(feedItemIds),
                userId: (0, typeorm_2.In)(userIds),
                realmPublicKeyStr: realmPublicKey.toBase58(),
            },
        }), (e) => new errors.Exception(e)), TE.map((entities) => {
            const mapping = {};
            for (const entity of entities) {
                if (!mapping[entity.feedItemId]) {
                    mapping[entity.feedItemId] = {};
                }
                mapping[entity.feedItemId][entity.userId] = entity.data.type;
            }
            return mapping;
        }));
    }
    async sendVoteNotification(feedItem, environment) {
        if (!feedItem.author) {
            return;
        }
        const authorPublicKey = new web3_js_1.PublicKey(feedItem.author.publicKey);
        const numVotes = feedItem.score;
        const handle = await this.realmMemberService.getHandleName(authorPublicKey, environment);
        const title = `👍 New Upvotes!`;
        const message = `${handle}, your ${feedItem.type} now has ${numVotes} upvotes!`;
        const recipient = authorPublicKey.toBase58();
        if (feedItem.score === 1 || feedItem.score === 5 || feedItem.score === 10) {
            this.dialectService.sendMessage(title, message, dialect_service_1.DIALECT_NOTIF_TYPE_ID_UPVOTE, [recipient]);
        }
    }
    syncProposalsToFeedItems(realmPublicKey, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return this.taskDedupeService.dedupe({
            key: `syncProposalsToFeedItems-${realmPublicKey.toBase58()}-${environment}`,
            ttl: 10 * 1000,
            fn: FN.pipe(TE.tryCatch(() => this.realmProposalService.getProposalAddressesForRealm(realmPublicKey, environment), (e) => new errors.Exception(e)), TE.bindTo('proposals'), TE.bindW('existingEntities', ({ proposals }) => TE.tryCatch(() => proposals.length
                ? this.realmFeedItemRepository
                    .createQueryBuilder('feeditem')
                    .where('feeditem.environment = :env', { env: environment })
                    .andWhere(`"feeditem"."data"->'ref' IN (:...ids)`, {
                    ids: proposals.map((p) => JSON.stringify(p.publicKey.toBase58())),
                })
                    .andWhere('feeditem.realmPublicKeyStr = :pk', { pk: realmPublicKey.toBase58() })
                    .andWhere(`"feeditem"."data"->'type' = :type`, {
                    type: JSON.stringify(RealmFeedItemType_1.RealmFeedItemType.Proposal),
                })
                    .getMany()
                : Promise.resolve([]), (e) => new errors.Exception(e))), TE.chainW(({ proposals, existingEntities }) => {
                let updateExisting = false;
                const existing = new Set();
                for (const ent of existingEntities) {
                    for (const proposal of proposals) {
                        if (ent.data.ref === proposal.publicKey.toBase58()) {
                            existing.add(proposal.publicKey.toBase58());
                            if (!(0, date_fns_1.isEqual)(ent.updated, proposal.updated)) {
                                ent.updated = proposal.updated;
                                updateExisting = true;
                            }
                        }
                    }
                }
                const newProposals = proposals.filter((proposal) => !existing.has(proposal.publicKey.toBase58()));
                if (!updateExisting && !newProposals.length) {
                    return TE.right([]);
                }
                return TE.tryCatch(() => this.realmFeedItemRepository.save([
                    ...(updateExisting ? existingEntities : []),
                    ...newProposals.map((proposal) => this.realmFeedItemRepository.create({
                        environment,
                        data: {
                            type: RealmFeedItemType_1.RealmFeedItemType.Proposal,
                            ref: proposal.publicKey.toBase58(),
                        },
                        metadata: {
                            relevanceScore: 0,
                            topAllTimeScore: 0,
                            rawScore: 0,
                        },
                        realmPublicKeyStr: realmPublicKey.toBase58(),
                        updated: proposal.updated,
                    })),
                ]), (e) => new errors.Exception(e));
            }), TE.match((e) => {
                this.logger.error(e);
                return [];
            }, (feedItems) => feedItems), TE.fromTask),
        });
    }
    submitVote(realmPublicKey, id, type, requestingUser, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        if (!requestingUser) {
            return TE.left(new errors.Unauthorized());
        }
        return FN.pipe(this.getFeedItemEntity(realmPublicKey, id, environment), TE.bindTo('feedItem'), TE.bindW('existingVote', ({ feedItem }) => TE.tryCatch(() => this.realmFeedItemVoteRepository.findOne({
            where: {
                feedItemId: feedItem.id,
                userId: requestingUser.id,
                realmPublicKeyStr: realmPublicKey.toBase58(),
            },
        }), (e) => new errors.Exception(e))), TE.chainW(({ feedItem, existingVote }) => {
            if (existingVote && existingVote.data.type === type) {
                const relevanceWeight = existingVote.data.relevanceWeight;
                if (existingVote.data.type === RealmFeedItemVoteType_1.RealmFeedItemVoteType.Approve) {
                    feedItem.metadata.relevanceScore -= relevanceWeight;
                    feedItem.metadata.rawScore -= 1;
                    feedItem.metadata.topAllTimeScore -= 1;
                }
                else {
                    feedItem.metadata.relevanceScore += relevanceWeight;
                    feedItem.metadata.rawScore += 1;
                    feedItem.metadata.topAllTimeScore += 1;
                }
                return FN.pipe(TE.tryCatch(() => this.realmFeedItemVoteRepository.remove(existingVote), (e) => new errors.Exception(e)), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemRepository.save(feedItem), (e) => new errors.Exception(e))));
            }
            else if (existingVote && existingVote.data.type !== type) {
                const relevanceWeight = existingVote.data.relevanceWeight;
                if (type === RealmFeedItemVoteType_1.RealmFeedItemVoteType.Approve) {
                    feedItem.metadata.relevanceScore += 2 * relevanceWeight;
                    feedItem.metadata.rawScore += 2;
                    feedItem.metadata.topAllTimeScore += 2;
                }
                else {
                    feedItem.metadata.relevanceScore -= 2 * relevanceWeight;
                    feedItem.metadata.rawScore -= 2;
                    feedItem.metadata.topAllTimeScore -= 2;
                }
                existingVote.data.type = type;
                return FN.pipe(TE.tryCatch(() => this.realmFeedItemVoteRepository.save(existingVote), (e) => new errors.Exception(e)), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemRepository.save(feedItem), (e) => new errors.Exception(e))));
            }
            else {
                const hours = (0, date_fns_1.differenceInHours)(Date.now(), feedItem.created);
                const relevanceWeight = 1 - Math.min(1, Math.ceil(hours / this.configService.get('constants.voteDecay')));
                if (type === RealmFeedItemVoteType_1.RealmFeedItemVoteType.Approve) {
                    feedItem.metadata.relevanceScore += relevanceWeight;
                    feedItem.metadata.rawScore += 1;
                    feedItem.metadata.topAllTimeScore += 1;
                }
                else {
                    feedItem.metadata.relevanceScore -= relevanceWeight;
                    feedItem.metadata.rawScore -= 1;
                    feedItem.metadata.topAllTimeScore -= 1;
                }
                const vote = this.realmFeedItemVoteRepository.create({
                    feedItemId: feedItem.id,
                    userId: requestingUser.id,
                    realmPublicKeyStr: realmPublicKey.toBase58(),
                    data: { type, relevanceWeight },
                });
                return FN.pipe(TE.tryCatch(() => this.realmFeedItemVoteRepository.save(vote), (e) => new errors.Exception(e)), TE.chainW(() => TE.tryCatch(() => this.realmFeedItemRepository.save(feedItem), (e) => new errors.Exception(e))));
            }
        }), TE.bindTo('entity'), TE.bindW('votes', ({ entity }) => this.getFeedItemVotes(realmPublicKey, [entity.id], requestingUser ? [requestingUser.id] : [], environment)), TE.chainW(({ entity, votes }) => this.convertEntityToFeedItem(realmPublicKey, entity, requestingUser, votes, environment)), TE.map((feedItem) => {
            this.sendVoteNotification(feedItem, environment);
            return feedItem;
        }));
    }
    convertEntityToFeedItem(realmPublicKey, entity, requestingUser, votes, environment) {
        switch (entity.data.type) {
            case RealmFeedItemType_1.RealmFeedItemType.Post:
                return FN.pipe(this.realmPostService.getPostsForRealmByIds(realmPublicKey, [entity.data.ref], (requestingUser === null || requestingUser === void 0 ? void 0 : requestingUser.publicKey) || null, environment), TE.map((mapping) => mapping[entity.data.ref]), TE.chainW(TE.fromNullable(new errors.NotFound())), TE.map((post) => {
                    var _a;
                    return ({
                        post,
                        realmPublicKey,
                        type: RealmFeedItemType_1.RealmFeedItemType.Post,
                        author: post.author,
                        created: entity.created,
                        document: post.document,
                        id: entity.id,
                        myVote: requestingUser ? (_a = votes[entity.id]) === null || _a === void 0 ? void 0 : _a[requestingUser.id] : undefined,
                        score: entity.metadata.rawScore,
                        title: post.title,
                        updated: entity.updated,
                    });
                }));
            case RealmFeedItemType_1.RealmFeedItemType.Proposal:
                return FN.pipe(TE.tryCatch(() => this.realmProposalService.getProposalForUserByPublicKey(new web3_js_1.PublicKey(entity.data.ref), (requestingUser === null || requestingUser === void 0 ? void 0 : requestingUser.publicKey) || null, environment), (e) => new errors.Exception(e)), TE.map((proposal) => {
                    var _a;
                    return ({
                        proposal,
                        realmPublicKey,
                        type: RealmFeedItemType_1.RealmFeedItemType.Proposal,
                        author: proposal.author,
                        created: entity.created,
                        document: proposal.document,
                        id: entity.id,
                        myVote: requestingUser ? (_a = votes[entity.id]) === null || _a === void 0 ? void 0 : _a[requestingUser.id] : undefined,
                        score: entity.metadata.rawScore,
                        title: proposal.title,
                        updated: entity.updated,
                    });
                }));
        }
    }
    convertPostEntitiesToFeedItems(realmPublicKey, entities, requestingUser, votes, environment) {
        return FN.pipe(this.realmPostService.getPostsForRealmByIds(realmPublicKey, entities.map((p) => p.data.ref), (requestingUser === null || requestingUser === void 0 ? void 0 : requestingUser.publicKey) || null, environment), TE.map((postsMap) => entities
            .map((post) => {
            var _a;
            const data = postsMap[post.data.ref];
            if (!data) {
                return null;
            }
            return {
                realmPublicKey,
                type: RealmFeedItemType_1.RealmFeedItemType.Post,
                author: data.author,
                created: post.created,
                document: data.document,
                id: post.id,
                myVote: requestingUser ? (_a = votes[post.id]) === null || _a === void 0 ? void 0 : _a[requestingUser.id] : undefined,
                post: data,
                score: post.metadata.rawScore,
                title: data.title,
                updated: post.updated,
            };
        })
            .filter(exists_1.exists)));
    }
    convertProposalEntitiesToFeedItems(realmPublicKey, entities, requestingUser, votes, environment) {
        return FN.pipe(TE.tryCatch(() => this.realmProposalService.getProposalsForRealmAndUserByPublicKeys(realmPublicKey, entities.map((p) => new web3_js_1.PublicKey(p.data.ref)), (requestingUser === null || requestingUser === void 0 ? void 0 : requestingUser.publicKey) || null, environment), (e) => new errors.Exception(e)), TE.map((proposalMap) => entities
            .map((proposal) => {
            var _a;
            const data = proposalMap[proposal.data.ref];
            if (!data) {
                return null;
            }
            return {
                realmPublicKey,
                type: RealmFeedItemType_1.RealmFeedItemType.Proposal,
                author: data.author,
                created: proposal.created,
                document: data.document,
                id: proposal.id,
                myVote: requestingUser ? (_a = votes[proposal.id]) === null || _a === void 0 ? void 0 : _a[requestingUser.id] : undefined,
                proposal: data,
                score: proposal.metadata.rawScore,
                title: data.title,
                updated: proposal.updated,
            };
        })
            .filter(exists_1.exists)
            .filter((proposal) => !!proposal.proposal)));
    }
    organizeFeedItemsListIntoMap(feedItems) {
        const map = {};
        for (const feedItem of feedItems) {
            map[feedItem.id] = feedItem;
        }
        return map;
    }
    splitEntitiesIntoTypes(entities) {
        return entities.reduce((acc, entity) => {
            if (entity.data.type === RealmFeedItemType_1.RealmFeedItemType.Post) {
                acc.posts.push(entity);
            }
            if (entity.data.type === RealmFeedItemType_1.RealmFeedItemType.Proposal) {
                acc.proposals.push(entity);
            }
            return acc;
        }, { posts: [], proposals: [] });
    }
};
RealmFeedItemService = RealmFeedItemService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(RealmFeedItemComment_entity_1.RealmFeedItemComment)),
    __param(1, (0, typeorm_1.InjectRepository)(RealmFeedItem_entity_1.RealmFeedItem)),
    __param(2, (0, typeorm_1.InjectRepository)(RealmFeedItemVote_entity_1.RealmFeedItemVote)),
    __param(3, (0, typeorm_1.InjectRepository)(RealmPost_entity_1.RealmPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_service_1.ConfigService,
        dialect_service_1.DialectService,
        realm_feed_item_comment_service_1.RealmFeedItemCommentService,
        realm_member_service_1.RealmMemberService,
        realm_post_service_1.RealmPostService,
        realm_proposal_service_1.RealmProposalService,
        realm_service_1.RealmService,
        stale_cache_service_1.StaleCacheService,
        task_dedupe_service_1.TaskDedupeService])
], RealmFeedItemService);
exports.RealmFeedItemService = RealmFeedItemService;
//# sourceMappingURL=realm-feed-item.service.js.map