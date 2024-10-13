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
exports.RealmSettingsService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service");
const stale_cache_service_1 = require("../stale-cache/stale-cache.service");
const DEFAULT_GOVERNANCE_PROGRAM = 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw';
let RealmSettingsService = class RealmSettingsService {
    constructor(configService, staleCacheService) {
        this.configService = configService;
        this.staleCacheService = staleCacheService;
        this.fetchAllCodeCommittedSettings = this.staleCacheService.dedupe(async (environment) => {
            return fetch(`${this.configService.get('app.codeCommitedInfoUrl')}/realms/${environment === 'mainnet' ? 'mainnet-beta' : 'devnet'}.json`).then((resp) => resp.json());
        }, {
            dedupeKey: (environment) => environment,
            maxStaleAgeMs: 60 * 5,
        });
    }
    async getCodeCommittedSettingsForRealm(realmPublicKey, environment) {
        const allSettings = await this.fetchAllCodeCommittedSettings(environment);
        const setting = allSettings.find((s) => s.realmId === realmPublicKey.toBase58());
        if (setting) {
            return setting;
        }
        else {
            return { programId: DEFAULT_GOVERNANCE_PROGRAM };
        }
    }
};
RealmSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        stale_cache_service_1.StaleCacheService])
], RealmSettingsService);
exports.RealmSettingsService = RealmSettingsService;
//# sourceMappingURL=realm-settings.service.js.map