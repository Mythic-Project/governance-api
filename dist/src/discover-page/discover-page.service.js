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
exports.DiscoverPageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const web3_js_1 = require("@solana/web3.js");
const typeorm_2 = require("typeorm");
const realm_feed_item_service_1 = require("../realm-feed-item/realm-feed-item.service");
const realm_service_1 = require("../realm/realm.service");
const DiscoverPage_entity_1 = require("./entities/DiscoverPage.entity");
let DiscoverPageService = class DiscoverPageService {
    constructor(discoverPageRepository, realmFeedItemService, realmService) {
        this.discoverPageRepository = discoverPageRepository;
        this.realmFeedItemService = realmFeedItemService;
        this.realmService = realmService;
    }
    async getCurrentDiscoverPageData(environment) {
        const discoverPage = (await this.discoverPageRepository
            .createQueryBuilder('discoverPage')
            .where('environment = :environment', { environment })
            .orderBy({ id: 'DESC' })
            .limit(1)
            .getMany())[0];
        if (!discoverPage) {
            const defaultData = {
                version: -1,
                daoToolingPublicKeyStrs: [],
                defiPublicKeyStrs: [],
                gamingPublicKeyStrs: [],
                hackathonWinnersPublicKeyStrs: [],
                keyAnnouncementFeedItemIds: [],
                nftCollectionsPublicKeyStrs: [],
                popularPublicKeyStrs: [],
                spotlight: [],
                trendingOrgPublicKeyStrs: [],
                web3PublicKeyStrs: [],
            };
            return defaultData;
        }
        return Object.assign(Object.assign({}, discoverPage.data), { version: discoverPage.id });
    }
    async getCurrentDiscoverPage(environment) {
        const data = await this.getCurrentDiscoverPageData(environment);
        const [daoTooling, defi, gaming, hackathonWinners, keyAnnouncements, nftCollections, popular, trending, web3,] = await Promise.all([
            this.realmService.getRealms(data.daoToolingPublicKeyStrs.map((p) => new web3_js_1.PublicKey(p)), environment),
            this.realmService.getRealms(data.defiPublicKeyStrs.map((p) => new web3_js_1.PublicKey(p)), environment),
            this.realmService.getRealms(data.gamingPublicKeyStrs.map((p) => new web3_js_1.PublicKey(p)), environment),
            this.realmService.getRealms(data.hackathonWinnersPublicKeyStrs.map((p) => new web3_js_1.PublicKey(p)), environment),
            this.realmFeedItemService.getFeedItems(data.keyAnnouncementFeedItemIds, null, environment),
            this.realmService.getRealms(data.nftCollectionsPublicKeyStrs.map((p) => new web3_js_1.PublicKey(p)), environment),
            this.realmService.getRealms(data.popularPublicKeyStrs.map((p) => new web3_js_1.PublicKey(p)), environment),
            this.realmService.getRealms(data.trendingOrgPublicKeyStrs.map((p) => new web3_js_1.PublicKey(p)), environment),
            this.realmService.getRealms(data.web3PublicKeyStrs.map((p) => new web3_js_1.PublicKey(p)), environment),
        ]);
        const discoverPage = {
            keyAnnouncements,
            daoTooling: daoTooling.map(this.realmService.convertEntityDto),
            defi: defi.map(this.realmService.convertEntityDto),
            gaming: gaming.map(this.realmService.convertEntityDto),
            hackathonWinners: hackathonWinners.map(this.realmService.convertEntityDto),
            nftCollections: nftCollections.map(this.realmService.convertEntityDto),
            popular: popular.map(this.realmService.convertEntityDto),
            spotlight: data.spotlight.map((s) => (Object.assign(Object.assign({}, s), { publicKey: new web3_js_1.PublicKey(s.realmPublicKeyStr) }))),
            trending: trending.map(this.realmService.convertEntityDto),
            version: data.version,
            web3: web3.map(this.realmService.convertEntityDto),
        };
        return discoverPage;
    }
    async updateDiscoverPage(data, environment) {
        const newDiscoverPage = this.discoverPageRepository.create({
            data,
            environment,
        });
        await this.discoverPageRepository.save(newDiscoverPage);
        return this.getCurrentDiscoverPage(environment);
    }
};
DiscoverPageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(DiscoverPage_entity_1.DiscoverPage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        realm_feed_item_service_1.RealmFeedItemService,
        realm_service_1.RealmService])
], DiscoverPageService);
exports.DiscoverPageService = DiscoverPageService;
//# sourceMappingURL=discover-page.service.js.map