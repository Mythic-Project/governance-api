"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmGovernanceModule = void 0;
const common_1 = require("@nestjs/common");
const helius_module_1 = require("../helius/helius.module");
const stale_cache_module_1 = require("../stale-cache/stale-cache.module");
const realm_governance_service_1 = require("./realm-governance.service");
let RealmGovernanceModule = class RealmGovernanceModule {
};
RealmGovernanceModule = __decorate([
    (0, common_1.Module)({
        imports: [helius_module_1.HeliusModule, stale_cache_module_1.StaleCacheModule],
        providers: [realm_governance_service_1.RealmGovernanceService],
        exports: [realm_governance_service_1.RealmGovernanceService],
    })
], RealmGovernanceModule);
exports.RealmGovernanceModule = RealmGovernanceModule;
//# sourceMappingURL=realm-governance.module.js.map