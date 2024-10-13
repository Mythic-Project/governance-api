"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmProposalModule = void 0;
const common_1 = require("@nestjs/common");
const helius_module_1 = require("../helius/helius.module");
const realm_governance_module_1 = require("../realm-governance/realm-governance.module");
const realm_member_module_1 = require("../realm-member/realm-member.module");
const stale_cache_module_1 = require("../stale-cache/stale-cache.module");
const realm_proposal_gql_service_1 = require("./realm-proposal.gql.service");
const realm_proposal_resolver_1 = require("./realm-proposal.resolver");
const realm_proposal_service_1 = require("./realm-proposal.service");
let RealmProposalModule = class RealmProposalModule {
};
RealmProposalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register(),
            helius_module_1.HeliusModule,
            realm_governance_module_1.RealmGovernanceModule,
            realm_member_module_1.RealmMemberModule,
            stale_cache_module_1.StaleCacheModule,
        ],
        providers: [realm_proposal_resolver_1.RealmProposalResolver, realm_proposal_gql_service_1.RealmProposalGQLService, realm_proposal_service_1.RealmProposalService],
        exports: [realm_proposal_gql_service_1.RealmProposalGQLService, realm_proposal_service_1.RealmProposalService],
    })
], RealmProposalModule);
exports.RealmProposalModule = RealmProposalModule;
//# sourceMappingURL=realm-proposal.module.js.map