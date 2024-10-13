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
var DiscordUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordUserService = void 0;
const spl_name_service_1 = require("@bonfida/spl-name-service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const web3_js_1 = require("@solana/web3.js");
const typeorm_2 = require("typeorm");
const config_service_1 = require("../config/config.service");
const DiscordUser_entity_1 = require("./entities/DiscordUser.entity");
const HELIUS_BASE_URL = 'https://api.helius.xyz/v0';
const MINIMUM_SOL = 0.1;
const MAX_TXS_TO_SCAN = 50000;
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
let DiscordUserService = DiscordUserService_1 = class DiscordUserService {
    constructor(discordUserRepository, configService) {
        this.discordUserRepository = discordUserRepository;
        this.configService = configService;
        this.logger = new common_1.Logger(DiscordUserService_1.name);
    }
    heliusUrlOptions() {
        return `?api-key=${this.configService.get('helius.apiKey')}`;
    }
    heliusTxUrl(address) {
        return `${HELIUS_BASE_URL}/addresses/${address}/transactions${this.heliusUrlOptions()}`;
    }
    heliusBalancesUrl(address) {
        return `${HELIUS_BASE_URL}/addresses/${address}/balances${this.heliusUrlOptions()}`;
    }
    heliusWebhookUrl(webhookId) {
        return `${HELIUS_BASE_URL}/webhooks/${webhookId}/${this.heliusUrlOptions()}`;
    }
    heliusAddressesUrl(publicKey) {
        return `${HELIUS_BASE_URL}/addresses/${publicKey}/transactions${this.heliusUrlOptions()}`;
    }
    async getMostRecentTxTimestamp(publicKey) {
        const req = await fetch(this.heliusAddressesUrl(publicKey));
        const recentTxes = await req.json();
        if (recentTxes.length) {
            const mostRecentTxTimestamp = recentTxes[0].timestamp * 1000;
            return new Date(mostRecentTxTimestamp).toISOString().split('T')[0];
        }
        return null;
    }
    async getSolBalance(publicKey) {
        const connection = new web3_js_1.Connection(process.env.RPC_ENDPOINT);
        const nativeBalance = await connection.getBalance(new web3_js_1.PublicKey(publicKey), 'confirmed');
        this.logger.verbose({
            publicKey,
            nativeBalance,
            nativeBalanceSol: nativeBalance / web3_js_1.LAMPORTS_PER_SOL >= MINIMUM_SOL,
        });
        return nativeBalance / web3_js_1.LAMPORTS_PER_SOL >= MINIMUM_SOL;
    }
    async getMetadataForUser(publicKey, withDelay = 0) {
        var _a;
        const walletAge = await this.getLargeAmountOfTransactions(publicKey.toBase58(), MAX_TXS_TO_SCAN);
        const hasMinimumSol = await delay(withDelay).then(() => this.getSolBalance(publicKey.toBase58()));
        const mostRecentTxTimestamp = await this.getMostRecentTxTimestamp(publicKey.toBase58());
        const metadata = {
            first_wallet_transaction: (_a = walletAge === null || walletAge === void 0 ? void 0 : walletAge.date) !== null && _a !== void 0 ? _a : null,
            has_minimum_sol: hasMinimumSol ? 1 : 0,
        };
        if (mostRecentTxTimestamp) {
            metadata['most_recent_wallet_transaction'] = mostRecentTxTimestamp;
        }
        return metadata;
    }
    async getAccessTokenWithRefreshToken(refreshToken) {
        const body = new URLSearchParams({
            client_id: this.configService.get('discord.clientId'),
            client_secret: this.configService.get('discord.clientSecret'),
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
            client_id: this.configService.get('discord.clientId'),
            client_secret: this.configService.get('discord.clientSecret'),
            public_key: this.configService.get('discord.publicKey'),
        };
    }
    async updateWebhookAddressList() {
        return this.discordUserRepository
            .query('select "publicKeyStr" from discord_user ORDER BY "created" DESC')
            .then((publicKeyStrs) => {
            const publicKeys = publicKeyStrs.map((obj) => obj.publicKeyStr);
            this.logger.verbose('Updating webhook with publicKeys:', publicKeys.length);
            const url = this.heliusWebhookUrl(this.configService.get('helius.webhookId'));
            return fetch(url, {
                body: JSON.stringify({
                    webhookURL: this.configService.get('helius.webhookUrl'),
                    accountAddresses: publicKeys,
                    transactionTypes: this.configService.get('helius.webhookTransactionTypes'),
                    webhookType: 'enhanced',
                }),
                method: 'PUT',
            });
        })
            .then((resp) => {
            if (resp.status !== 200) {
                this.logger.warn('Webhook put failed:', resp.status, resp.statusText);
            }
        });
    }
    async createDiscordUser(authId, publicKey, refreshToken) {
        const insertResult = await this.discordUserRepository.upsert({
            authId,
            publicKeyStr: publicKey.toBase58(),
            refreshToken,
        }, { conflictPaths: ['authId'] });
        return insertResult;
    }
    async getLargeAmountOfTransactions(address, maxCount) {
        let numTxs = 0;
        const connection = new web3_js_1.Connection(process.env.RPC_ENDPOINT);
        let oldestTransaction;
        const options = {};
        while (numTxs < maxCount) {
            const data = await connection.getSignaturesForAddress(new web3_js_1.PublicKey(address), options);
            if (data.length === 0) {
                break;
            }
            this.logger.verbose(`Got ${data.length} transactions for ${address}`);
            numTxs += data.length;
            oldestTransaction = data[data.length - 1];
            options.before = oldestTransaction.signature;
        }
        if (oldestTransaction) {
            let blockTime;
            if (oldestTransaction.blockTime) {
                blockTime = oldestTransaction.blockTime;
            }
            else {
                const url = this.heliusTxUrl(address) +
                    `&before=${oldestTransaction.signature}&until=${oldestTransaction.signature}`;
                const response = await (await fetch(url)).json();
                blockTime = response.timestamp;
            }
            const date = new Date(0);
            date.setUTCSeconds(blockTime);
            return {
                txId: oldestTransaction.signature,
                slot: oldestTransaction.slot,
                timestamp: blockTime,
                date: date.toISOString().split('T')[0],
                numTransactions: numTxs,
            };
        }
        else {
            return undefined;
        }
    }
    async getDiscordUserByPublicKey(publicKey) {
        return await this.discordUserRepository.findOne({
            where: { publicKeyStr: publicKey.toBase58() },
        });
    }
    async updateMetadataForUser(publicKey, _accessToken, withDelay = 0) {
        let accessToken = _accessToken;
        if (!accessToken) {
            const discordUser = await this.getDiscordUserByPublicKey(publicKey);
            if (discordUser) {
                const newAccessAndRefreshToken = await this.getAccessTokenWithRefreshToken(discordUser.refreshToken);
                accessToken = newAccessAndRefreshToken.accessToken;
                await this.discordUserRepository.update(discordUser.id, {
                    refreshToken: newAccessAndRefreshToken.refreshToken,
                });
            }
            else {
                throw new Error('No access / refresh token found!');
            }
        }
        const metadata = await this.getMetadataForUser(publicKey, withDelay);
        this.logger.verbose({ metadata });
        const body = { platform_name: 'Solana', metadata };
        try {
            const connection = new web3_js_1.Connection(process.env.RPC_ENDPOINT);
            const { reverse } = await (0, spl_name_service_1.getFavoriteDomain)(connection, publicKey);
            this.logger.verbose({ reverse });
            body['platform_username'] = `${reverse}.sol`;
        }
        catch (e) {
            this.logger.verbose(e);
        }
        const { client_id: clientId } = this.getDiscordApplicationCredentials();
        const putResult = await fetch(`https://discord.com/api/users/@me/applications/${clientId}/role-connection`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${accessToken}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        this.logger.verbose({
            discordMetadataUpdate: putResult.status,
            discordMetadataUpdateText: putResult.statusText,
        });
    }
};
DiscordUserService = DiscordUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(DiscordUser_entity_1.DiscordUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_service_1.ConfigService])
], DiscordUserService);
exports.DiscordUserService = DiscordUserService;
//# sourceMappingURL=discordUser.service.js.map