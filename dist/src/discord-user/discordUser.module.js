"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordUserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("../config/config.module");
const discordUser_controller_1 = require("./discordUser.controller");
const discordUser_resolver_1 = require("./discordUser.resolver");
const discordUser_service_1 = require("./discordUser.service");
const DiscordUser_entity_1 = require("./entities/DiscordUser.entity");
const MatchdayDiscordUser_entity_1 = require("./entities/MatchdayDiscordUser.entity");
const matchdayDiscordUser_controller_1 = require("./matchdayDiscordUser.controller");
const matchdayDiscordUser_service_1 = require("./matchdayDiscordUser.service");
let DiscordUserModule = class DiscordUserModule {
};
DiscordUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([DiscordUser_entity_1.DiscordUser, MatchdayDiscordUser_entity_1.MatchdayDiscordUser]), config_module_1.ConfigModule],
        controllers: [discordUser_controller_1.DiscordUserController, matchdayDiscordUser_controller_1.MatchdayDiscordUserController],
        providers: [discordUser_resolver_1.DiscordUserResolver, discordUser_service_1.DiscordUserService, matchdayDiscordUser_service_1.MatchdayDiscordUserService],
        exports: [discordUser_service_1.DiscordUserService],
    })
], DiscordUserModule);
exports.DiscordUserModule = DiscordUserModule;
//# sourceMappingURL=discordUser.module.js.map