"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowFeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const RealmFeedItem_entity_1 = require("../realm-feed-item/entities/RealmFeedItem.entity");
const realm_feed_item_module_1 = require("../realm-feed-item/realm-feed-item.module");
const User_entity_1 = require("../user/entities/User.entity");
const follow_feed_resolver_1 = require("./follow-feed.resolver");
const follow_feed_service_1 = require("./follow-feed.service");
let FollowFeedModule = class FollowFeedModule {
};
FollowFeedModule = __decorate([
    (0, common_1.Module)({
        imports: [config_module_1.ConfigModule, realm_feed_item_module_1.RealmFeedItemModule, typeorm_1.TypeOrmModule.forFeature([RealmFeedItem_entity_1.RealmFeedItem, User_entity_1.User])],
        providers: [follow_feed_service_1.FollowFeedService, follow_feed_resolver_1.FollowFeedResolver],
        exports: [follow_feed_service_1.FollowFeedService],
    })
], FollowFeedModule);
exports.FollowFeedModule = FollowFeedModule;
//# sourceMappingURL=follow-feed.module.js.map