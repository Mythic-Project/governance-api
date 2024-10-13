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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordUserController = void 0;
const common_1 = require("@nestjs/common");
const web3_js_1 = require("@solana/web3.js");
const nacl = require("tweetnacl");
const config_service_1 = require("../config/config.service");
const discordUser_service_1 = require("./discordUser.service");
const DiscordInteractionPayload_1 = require("./dto/DiscordInteractionPayload");
let DiscordUserController = class DiscordUserController {
    constructor(discordUserService, configService) {
        this.discordUserService = discordUserService;
        this.configService = configService;
        this.logger = new common_1.Logger(discordUser_service_1.DiscordUserService.name);
    }
    async verifyCommand(body, headers, req, res) {
        const PUBLIC_KEY = this.discordUserService.getDiscordApplicationCredentials().public_key;
        const signature = headers['x-signature-ed25519'];
        const timestamp = headers['x-signature-timestamp'];
        if (timestamp && signature) {
            const isVerified = nacl.sign.detached.verify(Buffer.from(timestamp + JSON.stringify(req.body)), Buffer.from(signature, 'hex'), Buffer.from(PUBLIC_KEY, 'hex'));
            if (!isVerified) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).send('invalid request signature');
            }
            if (body.type === 1) {
                console.info('ACK');
                res.status(common_1.HttpStatus.OK).send({ type: 1 });
                return;
            }
            if (body.type === 2 && body.data.name === 'verify') {
                res.status(common_1.HttpStatus.OK).send({
                    type: 4,
                    data: {
                        tts: false,
                        content: 'Verify and link your Solana wallet at https://app.realms.today/verify-wallet in order to qualify for roles in this server',
                        embeds: [],
                        allowed_mentions: { parse: [] },
                        flags: 1 << 6,
                    },
                });
                return;
            }
        }
        return res.status(common_1.HttpStatus.UNAUTHORIZED).send('invalid request signature');
    }
    async getHello(body, headers) {
        var _a, e_1, _b, _c;
        if (headers['authorization'] !== this.configService.get('helius.webhookKey')) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { nativeTransfers } = body[0];
        const affectedAddresses = new Set();
        nativeTransfers.forEach((transfer) => {
            affectedAddresses.add(transfer.fromUserAccount);
            affectedAddresses.add(transfer.toUserAccount);
        });
        this.logger.verbose({ affectedAddresses: Array.from(affectedAddresses) });
        try {
            for (var _d = true, affectedAddresses_1 = __asyncValues(affectedAddresses), affectedAddresses_1_1; affectedAddresses_1_1 = await affectedAddresses_1.next(), _a = affectedAddresses_1_1.done, !_a;) {
                _c = affectedAddresses_1_1.value;
                _d = false;
                try {
                    const affectedAddress = _c;
                    try {
                        await this.discordUserService.updateMetadataForUser(new web3_js_1.PublicKey(affectedAddress), null, 10 * 1000);
                    }
                    catch (e) {
                        this.logger.error(e);
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = affectedAddresses_1.return)) await _b.call(affectedAddresses_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { publicKeys: Array.from(affectedAddresses) };
    }
    async updateHeliusWebhookAddresses() {
        await this.discordUserService.updateWebhookAddressList();
        return {};
    }
};
__decorate([
    (0, common_1.Post)('/verify-command'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DiscordInteractionPayload_1.DiscordInteractionPayload, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DiscordUserController.prototype, "verifyCommand", null);
__decorate([
    (0, common_1.Post)('/webhook'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], DiscordUserController.prototype, "getHello", null);
__decorate([
    (0, common_1.Put)('/webhook-update'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiscordUserController.prototype, "updateHeliusWebhookAddresses", null);
DiscordUserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [discordUser_service_1.DiscordUserService,
        config_service_1.ConfigService])
], DiscordUserController);
exports.DiscordUserController = DiscordUserController;
//# sourceMappingURL=discordUser.controller.js.map