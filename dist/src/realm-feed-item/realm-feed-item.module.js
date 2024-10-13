"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const dialect_module_1 = require("../dialect/dialect.module");
const RealmFeedItemComment_entity_1 = require("../realm-feed-item-comment/entities/RealmFeedItemComment.entity");
const realm_feed_item_comment_module_1 = require("../realm-feed-item-comment/realm-feed-item-comment.module");
const realm_member_module_1 = require("../realm-member/realm-member.module");
const RealmPost_entity_1 = require("../realm-post/entities/RealmPost.entity");
const realm_post_module_1 = require("../realm-post/realm-post.module");
const realm_proposal_module_1 = require("../realm-proposal/realm-proposal.module");
const realm_module_1 = require("../realm/realm.module");
const stale_cache_module_1 = require("../stale-cache/stale-cache.module");
const task_dedupe_module_1 = require("../task-dedupe/task-dedupe.module");
const RealmFeedItem_entity_1 = require("./entities/RealmFeedItem.entity");
const RealmFeedItemVote_entity_1 = require("./entities/RealmFeedItemVote.entity");
const realm_feed_item_gql_service_1 = require("./realm-feed-item.gql.service");
const realm_feed_item_resolver_1 = require("./realm-feed-item.resolver");
const realm_feed_item_service_1 = require("./realm-feed-item.service");
let RealmFeedItemModule = class RealmFeedItemModule {
};
RealmFeedItemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([RealmFeedItem_entity_1.RealmFeedItem, RealmFeedItemVote_entity_1.RealmFeedItemVote, RealmPost_entity_1.RealmPost, RealmFeedItemComment_entity_1.RealmFeedItemComment]),
            realm_post_module_1.RealmPostModule,
            realm_proposal_module_1.RealmProposalModule,
            task_dedupe_module_1.TaskDedupeModule,
            realm_feed_item_comment_module_1.RealmFeedItemCommentModule,
            config_module_1.ConfigModule,
            stale_cache_module_1.StaleCacheModule,
            realm_member_module_1.RealmMemberModule,
            dialect_module_1.DialectModule,
            (0, common_1.forwardRef)(() => realm_module_1.RealmModule),
        ],
        providers: [
            realm_feed_item_resolver_1.RealmFeedItemResolver,
            realm_feed_item_gql_service_1.RealmFeedItemGQLService,
            realm_feed_item_service_1.RealmFeedItemService,
            realm_feed_item_resolver_1.RealmFeedItemPostResolver,
            realm_feed_item_resolver_1.RealmFeedItemProposalResolver,
        ],
        exports: [realm_feed_item_gql_service_1.RealmFeedItemGQLService, realm_feed_item_service_1.RealmFeedItemService],
    })
], RealmFeedItemModule);
exports.RealmFeedItemModule = RealmFeedItemModule;
//# sourceMappingURL=realm-feed-item.module.js.map