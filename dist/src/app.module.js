"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const mercurius_1 = require("@nestjs/mercurius");
const typeorm_1 = require("@nestjs/typeorm");
const mercurius_2 = require("mercurius");
const BigNumber_1 = require("./lib/scalars/BigNumber");
const Cursor_1 = require("./lib/scalars/Cursor");
const PublicKey_1 = require("./lib/scalars/PublicKey");
const RichTextDocument_1 = require("./lib/scalars/RichTextDocument");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_jwt_interceptor_1 = require("./auth/auth.jwt.interceptor");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./config/config.module");
const config_service_1 = require("./config/config.service");
const discordUser_module_1 = require("./discord-user/discordUser.module");
const ecosystem_feed_module_1 = require("./ecosystem-feed/ecosystem-feed.module");
const realm_feed_item_comment_module_1 = require("./realm-feed-item-comment/realm-feed-item-comment.module");
const realm_feed_item_module_1 = require("./realm-feed-item/realm-feed-item.module");
const realm_feed_module_1 = require("./realm-feed/realm-feed.module");
const realm_governance_module_1 = require("./realm-governance/realm-governance.module");
const realm_hub_module_1 = require("./realm-hub/realm-hub.module");
const realm_member_module_1 = require("./realm-member/realm-member.module");
const realm_post_module_1 = require("./realm-post/realm-post.module");
const realm_proposal_module_1 = require("./realm-proposal/realm-proposal.module");
const realm_settings_module_1 = require("./realm-settings/realm-settings.module");
const realm_treasury_module_1 = require("./realm-treasury/realm-treasury.module");
const realm_module_1 = require("./realm/realm.module");
const stale_cache_module_1 = require("./stale-cache/stale-cache.module");
const task_dedupe_module_1 = require("./task-dedupe/task-dedupe.module");
const user_module_1 = require("./user/user.module");
const discover_page_module_1 = require("./discover-page/discover-page.module");
const follow_feed_module_1 = require("./follow-feed/follow-feed.module");
const helius_module_1 = require("./helius/helius.module");
const stats_module_1 = require("./stats/stats.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                buildSchemaOptions: {
                    dateScalarMode: 'timestamp',
                },
                driver: mercurius_1.MercuriusDriver,
                persistedQueryProvider: mercurius_2.default.persistedQueryDefaults.automatic(),
                resolvers: {
                    BigNumber: BigNumber_1.BigNumberScalar,
                    Cursor: Cursor_1.CursorScalar,
                    PublicKey: PublicKey_1.PublicKeyScalar,
                    RichTextDocument: RichTextDocument_1.RichTextDocumentScalar,
                },
                sortSchema: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: 'postgres',
                    autoLoadEntities: true,
                    database: configService.get('database.name'),
                    entities: [(0, path_1.join)(__dirname, '/**/entity{.ts,.js}')],
                    password: configService.get('database.password'),
                    ssl: configService.get('database.useSsl') ? { rejectUnauthorized: true } : false,
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                }),
                inject: [config_service_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            realm_module_1.RealmModule,
            realm_member_module_1.RealmMemberModule,
            realm_proposal_module_1.RealmProposalModule,
            realm_feed_module_1.RealmFeedModule,
            realm_feed_item_module_1.RealmFeedItemModule,
            realm_settings_module_1.RealmSettingsModule,
            realm_post_module_1.RealmPostModule,
            realm_treasury_module_1.RealmTreasuryModule,
            realm_governance_module_1.RealmGovernanceModule,
            task_dedupe_module_1.TaskDedupeModule,
            realm_feed_item_comment_module_1.RealmFeedItemCommentModule,
            realm_hub_module_1.RealmHubModule,
            stale_cache_module_1.StaleCacheModule,
            discordUser_module_1.DiscordUserModule,
            ecosystem_feed_module_1.EcosystemFeedModule,
            follow_feed_module_1.FollowFeedModule,
            discover_page_module_1.DiscoverPageModule,
            helius_module_1.HeliusModule,
            stats_module_1.StatsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: auth_jwt_interceptor_1.AuthJwtInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map