"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcosystemFeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const RealmFeedItem_entity_1 = require("../realm-feed-item/entities/RealmFeedItem.entity");
const realm_feed_item_module_1 = require("../realm-feed-item/realm-feed-item.module");
const ecosystem_feed_resolver_1 = require("./ecosystem-feed.resolver");
const ecosystem_feed_service_1 = require("./ecosystem-feed.service");
let EcosystemFeedModule = class EcosystemFeedModule {
};
EcosystemFeedModule = __decorate([
    (0, common_1.Module)({
        imports: [config_module_1.ConfigModule, realm_feed_item_module_1.RealmFeedItemModule, typeorm_1.TypeOrmModule.forFeature([RealmFeedItem_entity_1.RealmFeedItem])],
        providers: [ecosystem_feed_service_1.EcosystemFeedService, ecosystem_feed_resolver_1.EcosystemFeedResolver],
        exports: [ecosystem_feed_service_1.EcosystemFeedService],
    })
], EcosystemFeedModule);
exports.EcosystemFeedModule = EcosystemFeedModule;
//# sourceMappingURL=ecosystem-feed.module.js.map