"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoverPageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const realm_feed_item_module_1 = require("../realm-feed-item/realm-feed-item.module");
const realm_module_1 = require("../realm/realm.module");
const discover_page_resolver_1 = require("./discover-page.resolver");
const discover_page_service_1 = require("./discover-page.service");
const DiscoverPage_entity_1 = require("./entities/DiscoverPage.entity");
let DiscoverPageModule = class DiscoverPageModule {
};
DiscoverPageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            realm_module_1.RealmModule,
            realm_feed_item_module_1.RealmFeedItemModule,
            typeorm_1.TypeOrmModule.forFeature([DiscoverPage_entity_1.DiscoverPage]),
        ],
        providers: [discover_page_service_1.DiscoverPageService, discover_page_resolver_1.DiscoverPageResolver, discover_page_resolver_1.DiscoverPageSpotlightItemResolver],
        exports: [discover_page_service_1.DiscoverPageService],
    })
], DiscoverPageModule);
exports.DiscoverPageModule = DiscoverPageModule;
//# sourceMappingURL=discover-page.module.js.map