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
exports.RealmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const web3_js_1 = require("@solana/web3.js");
const typeorm_2 = require("typeorm");
const errors = require("../lib/errors/gql");
const config_service_1 = require("../config/config.service");
const helius_service_1 = require("../helius/helius.service");
const exists_1 = require("../lib/typeGuards/exists");
const realm_hub_service_1 = require("../realm-hub/realm-hub.service");
const realm_settings_service_1 = require("../realm-settings/realm-settings.service");
const stale_cache_service_1 = require("../stale-cache/stale-cache.service");
const User_entity_1 = require("../user/entities/User.entity");
const RealmCategory_1 = require("./dto/RealmCategory");
const Realm_entity_1 = require("./entities/Realm.entity");
function normalizeCodeCommittedUrl(url, baseUrl) {
    if (url.startsWith('/')) {
        return baseUrl + url;
    }
    return url;
}
function normalizeCategory(plain) {
    switch (plain === null || plain === void 0 ? void 0 : plain.toLowerCase()) {
        case 'daotools':
            return RealmCategory_1.RealmCategory.DAOTools;
        case 'defi':
            return RealmCategory_1.RealmCategory.Defi;
        case 'gaming':
            return RealmCategory_1.RealmCategory.Gaming;
        case 'nft':
            return RealmCategory_1.RealmCategory.Nft;
        case 'web3':
            return RealmCategory_1.RealmCategory.Web3;
        default:
            return RealmCategory_1.RealmCategory.Other;
    }
}
let RealmService = class RealmService {
    constructor(configService, heliusService, realmHubService, realmSettingsService, staleCacheService, realmRepository, userRepository) {
        this.configService = configService;
        this.heliusService = heliusService;
        this.realmHubService = realmHubService;
        this.realmSettingsService = realmSettingsService;
        this.staleCacheService = staleCacheService;
        this.realmRepository = realmRepository;
        this.userRepository = userRepository;
    }
    convertEntityDto(realm) {
        return {
            about: realm.data.about,
            bannerImageUrl: realm.data.bannerImageUrl,
            category: realm.data.category,
            discordUrl: realm.data.discordUrl,
            displayName: realm.data.displayName,
            documentation: realm.data.documentation,
            faq: realm.data.faq,
            gallery: realm.data.gallery,
            githubUrl: realm.data.githubUrl,
            heading: realm.data.heading,
            iconUrl: realm.data.iconUrl,
            instagramUrl: realm.data.instagramUrl,
            linkedInUrl: realm.data.linkedInUrl,
            name: realm.data.name,
            programPublicKey: realm.data.programPublicKeyStr
                ? new web3_js_1.PublicKey(realm.data.programPublicKeyStr)
                : undefined,
            publicKey: new web3_js_1.PublicKey(realm.publicKeyStr),
            roadmap: Object.assign(Object.assign({}, realm.data.roadmap), { items: realm.data.roadmap.items.map((item) => (Object.assign(Object.assign({}, item), { date: item.date ? new Date(item.date).getTime() : undefined }))) }),
            resources: realm.data.resources,
            shortDescription: realm.data.shortDescription,
            symbol: realm.symbol,
            team: realm.data.team,
            token: realm.data.token
                ? {
                    mint: new web3_js_1.PublicKey(realm.data.token.mintPublicKeyStr),
                }
                : undefined,
            twitterHandle: realm.data.twitterHandle,
            urlId: encodeURIComponent(realm.symbol || realm.publicKeyStr),
            websiteUrl: realm.data.websiteUrl,
        };
    }
    async followRealm(realmPublicKey, user, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const userEntity = await this.userRepository.findOne({ where: { id: user.id } });
        if (!userEntity) {
            throw new errors.NotFound();
        }
        const realms = userEntity.data.realmsFollowed || [];
        if (!realms.includes(realmPublicKey.toBase58())) {
            realms.push(realmPublicKey.toBase58());
        }
        userEntity.data.realmsFollowed = realms;
        await this.userRepository.save(userEntity);
        return { publicKey: user.publicKey };
    }
    async getRealmEntity(publicKey, environment) {
        let realm = await this.realmRepository.findOne({
            where: { publicKeyStr: publicKey.toBase58() },
        });
        if (!realm) {
            realm = await this.setupRealm(publicKey, environment);
        }
        return realm;
    }
    async getRealm(publicKey, environment) {
        const realm = await this.getRealmEntity(publicKey, environment);
        return this.convertEntityDto(realm);
    }
    async getRealmByUrlId(id, environment) {
        const symbol = decodeURIComponent(id).toLocaleLowerCase();
        let realm = await this.realmRepository.findOne({
            where: { symbol },
        });
        if (!realm) {
            realm = await this.realmRepository.findOne({
                where: { publicKeyStr: id },
            });
        }
        if (!realm) {
            try {
                const publicKey = new web3_js_1.PublicKey(id);
                realm = await this.setupRealm(publicKey, environment);
            }
            catch (_a) {
                realm = null;
            }
        }
        if (!realm) {
            throw new errors.NotFound();
        }
        return this.convertEntityDto(realm);
    }
    async getRealms(publicKeys, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const pkStrs = publicKeys.map((pk) => pk.toBase58());
        const dbRealms = await this.realmRepository.find({
            where: { publicKeyStr: (0, typeorm_2.In)(pkStrs) },
        });
        const existingRealmsPks = new Set(dbRealms.map((realm) => realm.publicKeyStr));
        const missingRealms = publicKeys.filter((pk) => {
            return !existingRealmsPks.has(pk.toBase58());
        });
        const extraRealms = (await Promise.all(missingRealms.map((pk) => this.setupRealm(pk, environment).catch(() => null)))).filter(exists_1.exists);
        return dbRealms.concat(extraRealms);
    }
    async getAllRealmPublicKeys(environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const realms = await this.realmRepository
            .createQueryBuilder('realm')
            .select('realm.publicKeyStr')
            .getMany();
        const pks = new Set(realms.map((realm) => realm.publicKeyStr));
        const allSettings = await this.realmSettingsService.fetchAllCodeCommittedSettings(environment);
        const settingsPks = allSettings.map((setting) => setting.realmId).filter(exists_1.exists);
        for (const pk of settingsPks) {
            pks.add(pk);
        }
        return Array.from(pks).map((pkStr) => new web3_js_1.PublicKey(pkStr));
    }
    async getRealmDropdownList(environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const pks = await this.getAllRealmPublicKeys(environment);
        const realms = await this.getRealms(pks, environment);
        return realms
            .map((realm) => this.convertEntityDto(realm))
            .sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));
    }
    async listFollowedRealms(user, environment) {
        const userEntity = await this.userRepository.findOne({ where: { id: user.id } });
        if (!userEntity) {
            throw new errors.Unauthorized();
        }
        const realmPks = userEntity.data.realmsFollowed || [];
        const realms = await this.realmRepository.find({
            where: { environment, publicKeyStr: (0, typeorm_2.In)(realmPks) },
        });
        return realms.map(this.convertEntityDto);
    }
    async setupRealm(publicKey, environment) {
        var _a;
        let name = undefined;
        try {
            name = (await this.heliusService.getRealm(publicKey, environment)).account.name;
        }
        catch (e) {
            const realm = await this.heliusService.getRealm(publicKey, environment);
            name = realm.account.name;
        }
        const settings = await this.realmSettingsService.getCodeCommittedSettingsForRealm(publicKey, environment);
        const hubInfo = await this.realmHubService.getCodeCommittedHubInfoForRealm(publicKey, environment);
        const realm = this.realmRepository.create({
            data: {
                about: hubInfo.about,
                bannerImageUrl: settings.bannerImage,
                category: normalizeCategory(settings.category),
                discordUrl: settings.discord,
                displayName: settings.displayName || name,
                documentation: hubInfo.documentation,
                faq: hubInfo.faq,
                gallery: hubInfo.gallery,
                githubUrl: settings.github,
                heading: hubInfo.heading,
                iconUrl: settings.ogImage
                    ? normalizeCodeCommittedUrl(settings.ogImage, this.configService.get('app.codeCommitedInfoUrl'))
                    : undefined,
                instagramUrl: settings.instagram,
                linkedInUrl: settings.linkedin,
                name: name,
                programPublicKeyStr: settings.programId,
                roadmap: hubInfo.roadmap,
                resources: hubInfo.resources,
                shortDescription: settings.shortDescription,
                team: hubInfo.team,
                token: hubInfo.token
                    ? {
                        mintPublicKeyStr: hubInfo.token.mint.toBase58(),
                    }
                    : undefined,
                twitterHandle: settings.twitter,
                websiteUrl: settings.website,
            },
            environment: environment,
            publicKeyStr: publicKey.toBase58(),
            symbol: (_a = settings.symbol) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase(),
        });
        await this.realmRepository.save(realm);
        return realm;
    }
    async newSymbolIsValid(realmPublicKey, newSymbol) {
        const realm = await this.realmRepository.findOne({
            where: { publicKeyStr: realmPublicKey.toBase58() },
        });
        if (!realm) {
            throw new errors.NotFound();
        }
        if (realm.symbol === newSymbol.toLocaleLowerCase()) {
            return true;
        }
        const existing = await this.realmRepository.findOne({
            where: { symbol: newSymbol.toLocaleLowerCase() },
        });
        if (existing && existing.publicKeyStr !== realmPublicKey.toBase58()) {
            return false;
        }
        return true;
    }
    async unfollowRealm(realmPublicKey, user, environment) {
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        const userEntity = await this.userRepository.findOne({ where: { id: user.id } });
        if (!userEntity) {
            throw new errors.NotFound();
        }
        const realms = (userEntity.data.realmsFollowed || []).filter((r) => r !== realmPublicKey.toBase58());
        userEntity.data.realmsFollowed = realms;
        await this.userRepository.save(userEntity);
        return { publicKey: user.publicKey };
    }
    async updateRealm(user, publicKey, environment, updates) {
        var _a;
        if (environment === 'devnet') {
            throw new errors.UnsupportedDevnet();
        }
        if (!(await this.userIsAdminMember(publicKey, user.publicKey, environment))) {
            throw new errors.Unauthorized();
        }
        const realm = await this.getRealmEntity(publicKey, environment);
        realm.data.about = [...updates.about];
        realm.data.bannerImageUrl = updates.bannerImageUrl;
        realm.data.category = updates.category;
        realm.data.discordUrl = updates.discordUrl;
        realm.data.displayName = updates.displayName;
        realm.data.documentation = updates.documentation ? Object.assign({}, updates.documentation) : undefined;
        realm.data.faq = [...updates.faq];
        realm.data.gallery = [...updates.gallery];
        realm.data.githubUrl = updates.githubUrl;
        realm.data.heading = updates.heading ? Object.assign({}, updates.heading) : undefined;
        realm.data.iconUrl = updates.iconUrl;
        realm.data.instagramUrl = updates.instagramUrl;
        realm.data.linkedInUrl = updates.linkedInUrl;
        realm.data.resources = [...updates.resources];
        realm.data.roadmap = Object.assign({}, updates.roadmap);
        realm.data.shortDescription = updates.shortDescription;
        realm.data.team = [...updates.team];
        realm.data.token = updates.token
            ? {
                mintPublicKeyStr: updates.token.mint.toBase58(),
            }
            : undefined;
        realm.data.twitterHandle = updates.twitterHandle;
        realm.data.websiteUrl = updates.websiteUrl;
        realm.symbol = (_a = updates.symbol) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
        try {
            await this.realmRepository.save(realm);
            return this.convertEntityDto(realm);
        }
        catch (e) {
            if ('code' in e && e.code === '23505') {
                throw new errors.NotUnique('symbol');
            }
            else {
                throw e;
            }
        }
    }
    async userIsAdminMember(realmPublicKey, userPublicKey, environment) {
        const realm = await this.heliusService.getRealm(realmPublicKey, environment);
        const programId = await this.heliusService.getProgramId(realmPublicKey, environment);
        const councilMint = realm.account.config.councilMint;
        const communityMint = realm.account.communityMint;
        if (councilMint) {
            const tokenAccount = await this.heliusService.getTokenOwnerRecordForRealm(programId, realmPublicKey, councilMint, userPublicKey, environment);
            if (tokenAccount && tokenAccount.account.governingTokenDepositAmount.toNumber() > 0) {
                return true;
            }
        }
        if (!councilMint && communityMint) {
            const minTokenToCreateGovernance = realm.account.config.minCommunityTokensToCreateGovernance;
            const tokenAccount = await this.heliusService.getTokenOwnerRecordForRealm(programId, realmPublicKey, communityMint, userPublicKey, environment);
            if (tokenAccount &&
                tokenAccount.account.governingTokenDepositAmount.gte(minTokenToCreateGovernance)) {
                return true;
            }
        }
        return false;
    }
};
RealmService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, typeorm_1.InjectRepository)(Realm_entity_1.Realm)),
    __param(6, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        helius_service_1.HeliusService,
        realm_hub_service_1.RealmHubService,
        realm_settings_service_1.RealmSettingsService,
        stale_cache_service_1.StaleCacheService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RealmService);
exports.RealmService = RealmService;
//# sourceMappingURL=realm.service.js.map