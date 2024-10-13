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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialectService = exports.DIALECT_NOTIF_TYPE_ID_REPLY = exports.DIALECT_NOTIF_TYPE_ID_UPVOTE = void 0;
const common_1 = require("@nestjs/common");
const dialect_sdk_1 = require("./dialect-sdk");
exports.DIALECT_NOTIF_TYPE_ID_UPVOTE = '7df99a10-ec99-463b-ad5f-a82a7de37a3d';
exports.DIALECT_NOTIF_TYPE_ID_REPLY = 'c3379351-58c5-4eb4-9a2d-75c9abe97a33';
let DialectService = class DialectService {
    constructor(sdk) {
        this.sdk = sdk;
    }
    async onModuleInit() {
        var _a, _b;
        this.realmsDapp = await ((_b = (_a = this.sdk) === null || _a === void 0 ? void 0 : _a.dapps) === null || _b === void 0 ? void 0 : _b.find());
        if (!this.realmsDapp) {
            console.error(`Dialect Error: unable to load dapp from sdk`, this.sdk);
        }
    }
    async sendMessage(title, message, notificationTypeId, recipients) {
        var _a, _b;
        try {
            if (!this.realmsDapp) {
                throw new Error('realmsDapp was not loaded from Dialect sdk');
            }
            if (!recipients) {
                console.error(`Dialect Error: broadcast not currently enabled.`);
            }
            else if (recipients.length === 1) {
                (_a = this.realmsDapp) === null || _a === void 0 ? void 0 : _a.messages.send({
                    title,
                    message,
                    recipient: recipients[0],
                    notificationTypeId,
                });
            }
            else {
                (_b = this.realmsDapp) === null || _b === void 0 ? void 0 : _b.messages.send({
                    title,
                    message,
                    recipients,
                    notificationTypeId,
                });
            }
        }
        catch (e) {
            console.error(`Dialect Error: Failed to send notification:`, e);
        }
    }
};
DialectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dialect_sdk_1.DialectSdk])
], DialectService);
exports.DialectService = DialectService;
//# sourceMappingURL=dialect.service.js.map