"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordUserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const CurrentUser_1 = require("../lib/decorators/CurrentUser");
const errors = require("../lib/errors/gql");
const config_service_1 = require("../config/config.service");
const discordUser_service_1 = require("./discordUser.service");
const VerifyWallet_1 = require("./dto/VerifyWallet");
const matchdayDiscordUser_service_1 = require("./matchdayDiscordUser.service");
let DiscordUserResolver = class DiscordUserResolver {
    constructor(discordUserService, matchdayDiscordUserService, configService) {
        this.discordUserService = discordUserService;
        this.matchdayDiscordUserService = matchdayDiscordUserService;
        this.configService = configService;
    }
    async verifyWallet(code, application, user) {
        if (!user) {
            throw new errors.Unauthorized();
        }
        const userService = application === VerifyWallet_1.DiscordApplication.MATCHDAY
            ? this.matchdayDiscordUserService
            : this.discordUserService;
        const redirectURI = application === VerifyWallet_1.DiscordApplication.MATCHDAY
            ? this.configService.get('matchdayDiscord.oauthRedirectUri')
            : this.configService.get('discord.oauthRedirectUri');
        const { client_id, client_secret } = userService.getDiscordApplicationCredentials();
        const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id,
                client_secret,
                code,
                grant_type: 'authorization_code',
                redirect_uri: redirectURI,
                scope: 'identify',
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const oauthData = await tokenResponseData.json();
        const { refresh_token: refreshToken, access_token: accessToken } = oauthData;
        await userService.createDiscordUser(user.id, user.publicKey, refreshToken);
        await userService.updateMetadataForUser(user.publicKey, accessToken);
        return user;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => VerifyWallet_1.VerifyWallet, {
        description: 'Generate an authentication claim that a wallet can sign and trade for an auth token',
    }),
    __param(0, (0, graphql_1.Args)('code', {
        description: 'Authorization code for Discord',
    })),
    __param(1, (0, graphql_1.Args)('application', {
        description: 'Which Discord application is this for?',
        type: () => VerifyWallet_1.DiscordApplication,
    })),
    __param(2, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], DiscordUserResolver.prototype, "verifyWallet", null);
DiscordUserResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [discordUser_service_1.DiscordUserService,
        matchdayDiscordUser_service_1.MatchdayDiscordUserService,
        config_service_1.ConfigService])
], DiscordUserResolver);
exports.DiscordUserResolver = DiscordUserResolver;
//# sourceMappingURL=discordUser.resolver.js.map