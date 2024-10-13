"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialectModule = void 0;
const blockchain_sdk_solana_1 = require("@dialectlabs/blockchain-sdk-solana");
const sdk_1 = require("@dialectlabs/sdk");
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const dialect_sdk_1 = require("./dialect-sdk");
const dialect_service_1 = require("./dialect.service");
let DialectModule = class DialectModule {
};
DialectModule = __decorate([
    (0, common_1.Module)({
        imports: [config_module_1.ConfigModule],
        providers: [
            dialect_service_1.DialectService,
            {
                provide: dialect_sdk_1.DialectSdk,
                useFactory: (configService) => {
                    return sdk_1.Dialect.sdk({
                        environment: configService.get('external.dialectSdkEnvironment'),
                    }, blockchain_sdk_solana_1.SolanaSdkFactory.create({
                        wallet: blockchain_sdk_solana_1.NodeDialectSolanaWalletAdapter.create(),
                    }));
                },
                inject: [config_service_1.ConfigService],
            },
        ],
        exports: [dialect_service_1.DialectService],
    })
], DialectModule);
exports.DialectModule = DialectModule;
//# sourceMappingURL=dialect.module.js.map