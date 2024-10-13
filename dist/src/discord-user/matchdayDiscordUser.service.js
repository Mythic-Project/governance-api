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
var MatchdayDiscordUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchdayDiscordUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_service_1 = require("../config/config.service");
const MatchdayDiscordUser_entity_1 = require("./entities/MatchdayDiscordUser.entity");
const SIMPLEHASH_CHALLENGE_PASS_COLLECTION_ID = '220efa958c716cd8ad1788d07861e511';
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
let MatchdayDiscordUserService = MatchdayDiscordUserService_1 = class MatchdayDiscordUserService {
    constructor(matchdayDiscordUserRepository, configService) {
        this.matchdayDiscordUserRepository = matchdayDiscordUserRepository;
        this.configService = configService;
        this.logger = new common_1.Logger(MatchdayDiscordUserService_1.name);
    }
    async getChallengePassesForUser(publicKey) {
        const SIMPLEHASH_URL = `https://api.simplehash.com/api/v0/nfts/owners?${new URLSearchParams({
            chains: 'solana',
            wallet_addresses: publicKey.toBase58(),
            collection_id: SIMPLEHASH_CHALLENGE_PASS_COLLECTION_ID,
        }).toString()}`;
        const challengePassesResponse = await fetch(SIMPLEHASH_URL, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'x-api-key': this.configService.get('simplehash.apiKey'),
            },
        });
        const { nfts } = await challengePassesResponse.json();
        if (nfts.length) {
            const oldestChallengePass = nfts
                .map((nft) => new Date(nft.owners[0].first_acquired_date))
                .sort((a, b) => a.getTime() - b.getTime())[0];
            return {
                numChallengePasses: nfts.length,
                oldestChallengePass,
            };
        }
        return { numChallengePasses: 0 };
    }
    async getMatchdayMetadata(accessToken) {
        const discordResponse = await (await fetch('https://discord.com/api/users/@me', {
            headers: {
                'authorization': `Bearer ${accessToken}`,
                'content-type': 'application/json',
            },
        })).json();
        const MATCHDAY_API_URL = `https://discordapi.matchday.com/verify/${discordResponse.id}`;
        const matchdayResponse = await (await fetch(MATCHDAY_API_URL, {
            method: 'GET',
            headers: {
                auth: process.env.MATCHDAY_API_KEY,
            },
        })).json();
        const { twitterFollow, matchdayUsername, userName } = matchdayResponse.data;
        return { matchdayUsername, socialFollow: twitterFollow && !!userName };
    }
    async getMetadataForUser(publicKey, accessToken) {
        const { numChallengePasses, oldestChallengePass } = await this.getChallengePassesForUser(publicKey);
        const { matchdayUsername, socialFollow } = await this.getMatchdayMetadata(accessToken);
        return {
            platform_username: matchdayUsername,
            metadata: {
                num_challenge_passes: numChallengePasses,
                challenge_pass_held_since: oldestChallengePass,
                following_on_twitter: socialFollow ? 1 : 0,
            },
        };
    }
    async getAccessTokenWithRefreshToken(refreshToken) {
        const { client_id, client_secret } = this.getDiscordApplicationCredentials();
        const body = new URLSearchParams({
            client_id,
            client_secret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }).toString();
        const response = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        });
        const { access_token: accessToken, refresh_token } = await response.json();
        return { accessToken, refreshToken: refresh_token };
    }
    getDiscordApplicationCredentials() {
        return {
            client_id: this.configService.get('matchdayDiscord.clientId'),
            client_secret: this.configService.get('matchdayDiscord.clientSecret'),
            public_key: this.configService.get('matchdayDiscord.publicKey'),
        };
    }
    async createDiscordUser(authId, publicKey, refreshToken) {
        const insertResult = await this.matchdayDiscordUserRepository.upsert({
            authId,
            publicKeyStr: publicKey.toBase58(),
            refreshToken,
        }, { conflictPaths: ['authId'] });
        return insertResult;
    }
    async getDiscordUserByPublicKey(publicKey) {
        const result = await this.matchdayDiscordUserRepository.findOne({
            where: { publicKeyStr: publicKey.toBase58() },
        });
        return result;
    }
    async updateMetadataForUser(publicKey, _accessToken, delayDuration = 0) {
        let accessToken = _accessToken;
        if (!accessToken) {
            const discordUser = await this.getDiscordUserByPublicKey(publicKey);
            if (discordUser) {
                const newAccessAndRefreshToken = await this.getAccessTokenWithRefreshToken(discordUser.refreshToken);
                accessToken = newAccessAndRefreshToken.accessToken;
                this.logger.debug(`Storing refresh token for ${publicKey.toBase58()}`);
                await this.matchdayDiscordUserRepository.update(discordUser.id, {
                    refreshToken: newAccessAndRefreshToken.refreshToken,
                });
            }
            else {
                this.logger.error(`Discord user for ${publicKey.toBase58()} not found`);
                throw new Error('Discord user not found');
            }
        }
        this.logger.debug(`Updating metadata for ${publicKey.toBase58()}`);
        if (delayDuration) {
            await delay(delayDuration);
        }
        const { metadata, platform_username } = await this.getMetadataForUser(publicKey, accessToken);
        this.logger.verbose({ platform_username, metadata });
        const { client_id: clientId } = this.getDiscordApplicationCredentials();
        const putResult = await fetch(`https://discord.com/api/users/@me/applications/${clientId}/role-connection`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${accessToken}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                platform_name: 'Matchday',
                platform_username,
                metadata,
            }),
        });
        this.logger.verbose({ putResult });
    }
};
MatchdayDiscordUserService = MatchdayDiscordUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(MatchdayDiscordUser_entity_1.MatchdayDiscordUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_service_1.ConfigService])
], MatchdayDiscordUserService);
exports.MatchdayDiscordUserService = MatchdayDiscordUserService;
//# sourceMappingURL=matchdayDiscordUser.service.js.map