"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const helius_module_1 = require("../helius/helius.module");
const realm_feed_item_module_1 = require("../realm-feed-item/realm-feed-item.module");
const realm_governance_module_1 = require("../realm-governance/realm-governance.module");
const realm_hub_module_1 = require("../realm-hub/realm-hub.module");
const realm_member_module_1 = require("../realm-member/realm-member.module");
const realm_proposal_module_1 = require("../realm-proposal/realm-proposal.module");
const realm_settings_module_1 = require("../realm-settings/realm-settings.module");
const realm_treasury_module_1 = require("../realm-treasury/realm-treasury.module");
const stale_cache_module_1 = require("../stale-cache/stale-cache.module");
const User_entity_1 = require("../user/entities/User.entity");
const Realm_entity_1 = require("./entities/Realm.entity");
const realm_resolver_1 = require("./realm.resolver");
const realm_service_1 = require("./realm.service");
let RealmModule = class RealmModule {
};
RealmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            helius_module_1.HeliusModule,
            stale_cache_module_1.StaleCacheModule,
            realm_governance_module_1.RealmGovernanceModule,
            realm_hub_module_1.RealmHubModule,
            realm_member_module_1.RealmMemberModule,
            realm_proposal_module_1.RealmProposalModule,
            realm_settings_module_1.RealmSettingsModule,
            realm_treasury_module_1.RealmTreasuryModule,
            typeorm_1.TypeOrmModule.forFeature([Realm_entity_1.Realm, User_entity_1.User]),
            (0, common_1.forwardRef)(() => realm_feed_item_module_1.RealmFeedItemModule),
        ],
        providers: [
            realm_resolver_1.RealmFaqItemResolver,
            realm_resolver_1.RealmResolver,
            realm_service_1.RealmService,
            realm_resolver_1.RealmTeamMemberResolver,
            realm_resolver_1.RealmTokenDetailsResolver,
        ],
        exports: [realm_service_1.RealmService],
    })
], RealmModule);
exports.RealmModule = RealmModule;
//# sourceMappingURL=realm.module.js.map