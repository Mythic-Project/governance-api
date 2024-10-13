"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemCommentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const dialect_module_1 = require("../dialect/dialect.module");
const RealmFeedItem_entity_1 = require("../realm-feed-item/entities/RealmFeedItem.entity");
const realm_member_module_1 = require("../realm-member/realm-member.module");
const RealmPost_entity_1 = require("../realm-post/entities/RealmPost.entity");
const realm_module_1 = require("../realm/realm.module");
const RealmFeedItemComment_entity_1 = require("./entities/RealmFeedItemComment.entity");
const RealmFeedItemCommentVote_entity_1 = require("./entities/RealmFeedItemCommentVote.entity");
const realm_feed_item_comment_resolver_1 = require("./realm-feed-item-comment.resolver");
const realm_feed_item_comment_service_1 = require("./realm-feed-item-comment.service");
let RealmFeedItemCommentModule = class RealmFeedItemCommentModule {
};
RealmFeedItemCommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                RealmFeedItem_entity_1.RealmFeedItem,
                RealmFeedItemComment_entity_1.RealmFeedItemComment,
                RealmFeedItemCommentVote_entity_1.RealmFeedItemCommentVote,
                RealmPost_entity_1.RealmPost,
            ]),
            realm_member_module_1.RealmMemberModule,
            config_module_1.ConfigModule,
            dialect_module_1.DialectModule,
            (0, common_1.forwardRef)(() => realm_module_1.RealmModule),
        ],
        providers: [realm_feed_item_comment_service_1.RealmFeedItemCommentService, realm_feed_item_comment_resolver_1.RealmFeedItemCommentResolver],
        exports: [realm_feed_item_comment_service_1.RealmFeedItemCommentService],
    })
], RealmFeedItemCommentModule);
exports.RealmFeedItemCommentModule = RealmFeedItemCommentModule;
//# sourceMappingURL=realm-feed-item-comment.module.js.map