"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeliusModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const realm_settings_module_1 = require("../realm-settings/realm-settings.module");
const stale_cache_module_1 = require("../stale-cache/stale-cache.module");
const helius_service_1 = require("./helius.service");
let HeliusModule = class HeliusModule {
};
HeliusModule = __decorate([
    (0, common_1.Module)({
        imports: [config_module_1.ConfigModule, realm_settings_module_1.RealmSettingsModule, stale_cache_module_1.StaleCacheModule],
        providers: [helius_service_1.HeliusService],
        exports: [helius_service_1.HeliusService],
    })
], HeliusModule);
exports.HeliusModule = HeliusModule;
//# sourceMappingURL=helius.module.js.map