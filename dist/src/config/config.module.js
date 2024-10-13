"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const web3_js_1 = require("@solana/web3.js");
const config_service_1 = require("./config.service");
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                load: [
                    () => {
                        const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
                        const dbPort = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432;
                        const config = {
                            app: {
                                port,
                                host: process.env.HOST,
                                codeCommitedInfoUrl: process.env.CODE_COMMITED_INFO_URL || 'https://app.realms.today',
                            },
                            constants: {
                                admins: process.env.ADMINS
                                    ? JSON.parse(process.env.ADMINS).map((str) => new web3_js_1.PublicKey(str))
                                    : [],
                                voteDecay: process.env.CONSTANTS_VOTE_DECAY
                                    ? parseInt(process.env.CONSTANTS_VOTE_DECAY, 10)
                                    : 6,
                                timeValue: process.env.CONSTANTS_TIME_VALUE
                                    ? parseInt(process.env.CONSTANTS_TIME_VALUE)
                                    : 180,
                            },
                            database: {
                                host: process.env.DATABASE_HOST || '',
                                name: process.env.DATABASE_NAME || '',
                                password: process.env.DATABASE_PASSWORD,
                                port: dbPort,
                                username: process.env.DATABASE_USERNAME,
                                useSsl: process.env.DATABASE_USE_SSL === 'true',
                            },
                            discord: {
                                clientId: process.env.DISCORD_CONNECTION_CLIENT_ID,
                                clientSecret: process.env.DISCORD_CONNECTION_CLIENT_SECRET,
                                oauthRedirectUri: process.env.DISCORD_OAUTH_REDIRECT_URI,
                                publicKey: process.env.DISCORD_APPLICATION_PUBLIC_KEY,
                            },
                            matchdayDiscord: {
                                clientId: process.env.DISCORD_MATCHDAY_CONNECTION_CLIENT_ID,
                                clientSecret: process.env.DISCORD_MATCHDAY_CONNECTION_CLIENT_SECRET,
                                publicKey: process.env.DISCORD_MATCHDAY_APPLICATION_PUBLIC_KEY,
                                oauthRedirectUri: process.env.DISCORD_MATCHDAY_OAUTH_REDIRECT_URI,
                            },
                            external: {
                                dialectSdkCredentials: process.env.DIALECT_SDK_CREDENTIALS,
                                dialectSdkEnvironment: process.env.DIALECT_SDK_ENVIRONMENT,
                                discordBotKey: process.env.DISCORD_BOT_KEY,
                                rpcEndpoint: process.env.RPC_ENDPOINT,
                                rpcEndpointDevnet: process.env.RPC_ENDPOINT_DEVNET,
                                twitterBearerKey: process.env.TWITTER_API_BEARER_KEY,
                            },
                            helius: {
                                apiKey: process.env.HELIUS_API_KEY,
                                webhookKey: process.env.HELIUS_WEBHOOK_KEY,
                                webhookId: process.env.HELIUS_WEBHOOK_ID,
                                webhookUrl: process.env.HELIUS_WEBHOOK_URL,
                                webhookTransactionTypes: process.env.HELIUS_WEBHOOK_TRANSACTION_TYPES
                                    .split(',')
                                    .map((txType) => txType.toUpperCase()),
                            },
                            simplehash: {
                                apiKey: process.env.SIMPLEHASH_API_KEY,
                            },
                            jwt: {
                                userSecret: process.env.JWT_USER_SECRET || '',
                            },
                        };
                        return config;
                    },
                ],
            }),
        ],
        providers: [config_service_1.ConfigService],
        exports: [config_service_1.ConfigService],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.module.js.map