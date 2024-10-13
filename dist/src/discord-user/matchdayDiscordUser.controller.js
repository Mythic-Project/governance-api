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
exports.MatchdayDiscordUserController = void 0;
const common_1 = require("@nestjs/common");
const web3_js_1 = require("@solana/web3.js");
const nacl = require("tweetnacl");
const config_service_1 = require("../config/config.service");
const DiscordInteractionPayload_1 = require("./dto/DiscordInteractionPayload");
const matchdayDiscordUser_service_1 = require("./matchdayDiscordUser.service");
const DELAY_DURATION = 15000;
const connection = new web3_js_1.Connection(process.env.RPC_ENDPOINT);
let MatchdayDiscordUserController = class MatchdayDiscordUserController {
    constructor(matchdayDiscordUserService, configService) {
        this.matchdayDiscordUserService = matchdayDiscordUserService;
        this.configService = configService;
        this.logger = new common_1.Logger(matchdayDiscordUser_service_1.MatchdayDiscordUserService.name);
    }
    async verifyCommand(body, headers, req, res) {
        const PUBLIC_KEY = this.matchdayDiscordUserService.getDiscordApplicationCredentials().public_key;
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
                        content: 'Verify and link your Solana wallet at https://app.realms.today/matchday/verify-wallet in order to qualify for roles in this server',
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
        if (headers['authorization'] !== this.configService.get('helius.webhookKey')) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { type, signature } = body[0];
        const blockhash = await connection.getLatestBlockhash('finalized');
        const tx = await connection.getTransaction(signature, {
            commitment: 'finalized',
            maxSupportedTransactionVersion: 1,
        });
        if (!tx) {
            await connection.confirmTransaction(Object.assign(Object.assign({}, blockhash), { signature }), 'finalized');
        }
        if (type === 'NFT_SALE') {
            const { events: { nft: { buyer, seller }, }, } = body[0];
            this.logger.verbose({ seller, buyer });
            await Promise.allSettled([
                this.matchdayDiscordUserService.updateMetadataForUser(new web3_js_1.PublicKey(seller), null, DELAY_DURATION),
                this.matchdayDiscordUserService.updateMetadataForUser(new web3_js_1.PublicKey(buyer), null, DELAY_DURATION),
            ]);
            return { publicKeys: [seller, buyer] };
        }
        else if (type === 'TRANSFER') {
            const { tokenTransfers } = body[0];
            const affectedAddresses = new Set();
            tokenTransfers.forEach((transfer) => {
                affectedAddresses.add(transfer.fromUserAccount);
                affectedAddresses.add(transfer.toUserAccount);
            });
            this.logger.verbose({ affectedAddresses: Array.from(affectedAddresses) });
            await Promise.allSettled(Array.from(affectedAddresses).map((address) => this.matchdayDiscordUserService.updateMetadataForUser(new web3_js_1.PublicKey(address), null, DELAY_DURATION)));
            return { publicKeys: Array.from(affectedAddresses) };
        }
        return { publicKeys: [] };
    }
};
__decorate([
    (0, common_1.Post)('/matchday/verify-command'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DiscordInteractionPayload_1.DiscordInteractionPayload, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MatchdayDiscordUserController.prototype, "verifyCommand", null);
__decorate([
    (0, common_1.Post)('/matchday-webhook'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], MatchdayDiscordUserController.prototype, "getHello", null);
MatchdayDiscordUserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [matchdayDiscordUser_service_1.MatchdayDiscordUserService,
        config_service_1.ConfigService])
], MatchdayDiscordUserController);
exports.MatchdayDiscordUserController = MatchdayDiscordUserController;
//# sourceMappingURL=matchdayDiscordUser.controller.js.map