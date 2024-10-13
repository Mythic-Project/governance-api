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
exports.RealmHubService = void 0;
const common_1 = require("@nestjs/common");
const web3_js_1 = require("@solana/web3.js");
const date_fns_1 = require("date-fns");
const errors = require("../lib/errors/gql");
const config_service_1 = require("../config/config.service");
const convertTextToRichTextDocument_1 = require("../lib/textManipulation/convertTextToRichTextDocument");
const realm_settings_service_1 = require("../realm-settings/realm-settings.service");
const stale_cache_service_1 = require("../stale-cache/stale-cache.service");
const RealmHubInfoRoadmapItemStatus_1 = require("./dto/RealmHubInfoRoadmapItemStatus");
function filterHas(keys) {
    return function filterFn(item) {
        for (const key of keys) {
            if (!item[key]) {
                return false;
            }
        }
        return true;
    };
}
function extractRoadmapStatus(status) {
    if (!status) {
        return undefined;
    }
    if (['completed'].includes(status.toLocaleLowerCase())) {
        return RealmHubInfoRoadmapItemStatus_1.RealmHubInfoRoadmapItemStatus.Completed;
    }
    if (['delayed'].includes(status.toLocaleLowerCase())) {
        return RealmHubInfoRoadmapItemStatus_1.RealmHubInfoRoadmapItemStatus.Delayed;
    }
    if (['inprogress', 'in progress'].includes(status.toLocaleLowerCase())) {
        return RealmHubInfoRoadmapItemStatus_1.RealmHubInfoRoadmapItemStatus.InProgress;
    }
    if (['upcoming'].includes(status.toLocaleLowerCase())) {
        return RealmHubInfoRoadmapItemStatus_1.RealmHubInfoRoadmapItemStatus.Upcoming;
    }
    return undefined;
}
let RealmHubService = class RealmHubService {
    constructor(cacheManager, configService, realmSettingsService, staleCacheService) {
        this.cacheManager = cacheManager;
        this.configService = configService;
        this.realmSettingsService = realmSettingsService;
        this.staleCacheService = staleCacheService;
        this.getFollowerCount = this.staleCacheService.dedupe(async (handle, bearerToken) => {
            const username = handle.replace('@', '');
            return fetch(`https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`, {
                method: 'get',
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            })
                .then((resp) => resp.json())
                .then((result) => {
                var _a, _b, _c;
                if (!((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.public_metrics)) {
                    throw new errors.RateLimit('get twitter follower count');
                }
                return ((_c = (_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.public_metrics) === null || _c === void 0 ? void 0 : _c.followers_count) || 0;
            });
        }, {
            dedupeKey: (handle, bearerToken) => handle + bearerToken,
            maxStaleAgeMs: (0, date_fns_1.hoursToMilliseconds)(24),
        });
    }
    async fetchAllCodeCommittedHubInfo(environment) {
        const cacheKey = `realm-hub-info-all-${environment}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const url = this.configService.get('app.codeCommitedInfoUrl') + '/realms/about.json';
        const resp = await fetch(url);
        const allInfo = await resp.json();
        this.cacheManager.set(cacheKey, allInfo, 60 * 5);
        return allInfo;
    }
    async getTwitterFollowerCount(realmPublicKey, environment) {
        const settings = await this.realmSettingsService.getCodeCommittedSettingsForRealm(realmPublicKey, environment);
        const twitterHandle = settings.twitter;
        if (!twitterHandle) {
            return 0;
        }
        return this.getTwitterFollowerCountForHandle(twitterHandle);
    }
    async getTwitterFollowerCountForHandle(handle) {
        const cacheKey = `hub-twitter-handle-${handle}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (typeof cached === 'number') {
            return cached;
        }
        try {
            const count = await this.getFollowerCount(handle, this.configService.get('external.twitterBearerKey'));
            await this.cacheManager.set(cacheKey, count, 60 * 60 * 2);
            return count;
        }
        catch (e) {
            return 0;
        }
    }
    async getCodeCommittedHubInfoForRealm(realmPublicKey, environment) {
        var _a, _b, _c, _d, _e;
        const allInfo = await this.fetchAllCodeCommittedHubInfo(environment);
        const info = allInfo[realmPublicKey.toBase58()];
        if (info) {
            return {
                about: info.about
                    ? (await Promise.all(info.about.map(async (detail) => (Object.assign(Object.assign({}, detail), { content: detail.content
                            ? await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(detail.content.join('\n'))
                            : undefined }))))).filter(filterHas(['content']))
                    : [],
                documentation: ((_a = info.documentation) === null || _a === void 0 ? void 0 : _a.url) ? info.documentation : undefined,
                faq: info.faq
                    ? (await Promise.all(info.faq.map(async (item) => (Object.assign(Object.assign({}, item), { answer: item.answer
                            ? await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(item.answer.join('\n'))
                            : undefined }))))).filter(filterHas(['question', 'answer']))
                    : [],
                gallery: ((_b = info.gallery) === null || _b === void 0 ? void 0 : _b.filter(filterHas(['height', 'url', 'width']))) || [],
                heading: info.heading ? await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(info.heading) : undefined,
                resources: info.resources
                    ? (await Promise.all(info.resources.map(async (resource) => (Object.assign(Object.assign({}, resource), { content: resource.content
                            ? await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(resource.content.join('\n'))
                            : undefined }))))).filter(filterHas(['title', 'url']))
                    : [],
                roadmap: Object.assign(Object.assign({}, info.roadmap), { description: ((_c = info.roadmap) === null || _c === void 0 ? void 0 : _c.description)
                        ? await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(info.roadmap.description.join('\n'))
                        : undefined, items: ((_e = (_d = info.roadmap) === null || _d === void 0 ? void 0 : _d.items) === null || _e === void 0 ? void 0 : _e.map((item) => (Object.assign(Object.assign({}, item), { date: item.date ? new Date(item.date) : undefined, status: extractRoadmapStatus(item.status) }))).filter(filterHas(['title']))) || [] }),
                symbol: info.symbol,
                team: info.team
                    ? (await Promise.all(info.team.map(async (member) => (Object.assign(Object.assign({}, member), { description: member.description
                            ? await (0, convertTextToRichTextDocument_1.convertTextToRichTextDocument)(member.description.join('\n'))
                            : undefined }))))).filter(filterHas(['name']))
                    : [],
                token: info.token ? { mint: new web3_js_1.PublicKey(info.token) } : undefined,
            };
        }
        return {
            about: [],
            documentation: undefined,
            faq: [],
            gallery: [],
            heading: undefined,
            resources: [],
            roadmap: {
                description: undefined,
                items: [],
            },
            symbol: undefined,
            team: [],
        };
    }
};
RealmHubService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, config_service_1.ConfigService,
        realm_settings_service_1.RealmSettingsService,
        stale_cache_service_1.StaleCacheService])
], RealmHubService);
exports.RealmHubService = RealmHubService;
//# sourceMappingURL=realm-hub.service.js.map