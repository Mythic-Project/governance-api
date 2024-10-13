"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmHubModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const realm_settings_module_1 = require("../realm-settings/realm-settings.module");
const realm_treasury_module_1 = require("../realm-treasury/realm-treasury.module");
const stale_cache_module_1 = require("../stale-cache/stale-cache.module");
const realm_hub_resolver_1 = require("./realm-hub.resolver");
const realm_hub_service_1 = require("./realm-hub.service");
let RealmHubModule = class RealmHubModule {
};
RealmHubModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register({
                ttl: 60 * 2,
                max: 2000,
            }),
            config_module_1.ConfigModule,
            realm_settings_module_1.RealmSettingsModule,
            realm_treasury_module_1.RealmTreasuryModule,
            stale_cache_module_1.StaleCacheModule,
        ],
        providers: [
            realm_hub_resolver_1.RealmHubInfoFaqItemResolver,
            realm_hub_resolver_1.RealmHubInfoResolver,
            realm_hub_resolver_1.RealmHubInfoTeamMemberResolver,
            realm_hub_resolver_1.RealmHubInfoTokenDetailsResolver,
            realm_hub_resolver_1.RealmHubResolver,
            realm_hub_service_1.RealmHubService,
        ],
        exports: [realm_hub_service_1.RealmHubService],
    })
], RealmHubModule);
exports.RealmHubModule = RealmHubModule;
//# sourceMappingURL=realm-hub.module.js.map