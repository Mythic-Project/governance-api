"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const helius_module_1 = require("../helius/helius.module");
const Realm_entity_1 = require("../realm/entities/Realm.entity");
const Tvl_entity_1 = require("./entities/Tvl.entity");
const stats_controller_1 = require("./stats.controller");
const stats_service_1 = require("./stats.service");
let StatsModule = class StatsModule {
};
StatsModule = __decorate([
    (0, common_1.Module)({
        imports: [helius_module_1.HeliusModule, typeorm_1.TypeOrmModule.forFeature([Realm_entity_1.Realm, Tvl_entity_1.Tvl])],
        providers: [stats_service_1.StatsService],
        controllers: [stats_controller_1.StatsController],
    })
], StatsModule);
exports.StatsModule = StatsModule;
//# sourceMappingURL=stats.module.js.map