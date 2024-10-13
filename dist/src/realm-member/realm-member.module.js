"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmMemberModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const helius_module_1 = require("../helius/helius.module");
const stale_cache_module_1 = require("../stale-cache/stale-cache.module");
const realm_member_resolver_1 = require("./realm-member.resolver");
const realm_member_service_1 = require("./realm-member.service");
let RealmMemberModule = class RealmMemberModule {
};
RealmMemberModule = __decorate([
    (0, common_1.Module)({
        imports: [common_1.CacheModule.register(), config_module_1.ConfigModule, helius_module_1.HeliusModule, stale_cache_module_1.StaleCacheModule],
        providers: [realm_member_resolver_1.RealmMemberResolver, realm_member_service_1.RealmMemberService],
        exports: [realm_member_service_1.RealmMemberService],
    })
], RealmMemberModule);
exports.RealmMemberModule = RealmMemberModule;
//# sourceMappingURL=realm-member.module.js.map