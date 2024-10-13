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
exports.DiscordService = void 0;
const common_1 = require("@nestjs/common");
const discord_js_1 = require("discord.js");
const config_service_1 = require("../config/config.service");
let DiscordService = class DiscordService {
    constructor(configService) {
        this.configService = configService;
        const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
        client.login(configService.get('external.discordBotKey'));
        this.getClient = new Promise((res) => {
            client.on('ready', (client) => {
                res(client);
            });
        });
    }
    async getMessage(messageUrl) {
        const parts = messageUrl.split('/');
        const messageId = parts[parts.length - 1];
        const channedId = parts[parts.length - 2];
        const guildId = parts[parts.length - 3];
        try {
            const client = await this.getClient;
            const server = await client.guilds.fetch(guildId);
            const channel = await server.channels.fetch(channedId);
            if (channel) {
                if (channel.isTextBased()) {
                    const message = await channel.messages.fetch(messageId);
                    return message;
                }
            }
        }
        catch (_a) {
            return null;
        }
    }
};
DiscordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], DiscordService);
exports.DiscordService = DiscordService;
//# sourceMappingURL=discord.service.js.map