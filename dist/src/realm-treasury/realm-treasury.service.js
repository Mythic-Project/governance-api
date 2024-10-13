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
exports.RealmTreasuryService = void 0;
const common_1 = require("@nestjs/common");
const spl_token_registry_1 = require("@solana/spl-token-registry");
const bignumber_js_1 = require("bignumber.js");
const FN = require("fp-ts/function");
const OP = require("fp-ts/Option");
const TE = require("fp-ts/TaskEither");
const ramda_1 = require("ramda");
const errors = require("../lib/errors/gql");
const config_service_1 = require("../config/config.service");
const helius_service_1 = require("../helius/helius.service");
const PRICE_ENDPOINT = 'https://price.jup.ag/v1/price';
let RealmTreasuryService = class RealmTreasuryService {
    constructor(cacheManager, configService, heliusService) {
        this.cacheManager = cacheManager;
        this.configService = configService;
        this.heliusService = heliusService;
    }
    getRealmTreasuryValue(realmPublicKey, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(TE.tryCatch(() => Promise.all([
            this.heliusService.getTokenAccountsInRealm(realmPublicKey, environment),
            this.heliusService.getAuxiliaryTokenAccountsInRealm(realmPublicKey, environment),
        ]), (e) => new errors.Exception(e)), TE.map(([tokenAccounts, auxiliaryTokenAccounts]) => [
            ...tokenAccounts,
            ...auxiliaryTokenAccounts,
        ]), TE.chainW((accounts) => TE.sequenceArray(accounts.map((account) => FN.pipe(this.getTokenPrice(account.mintInfo.publicKey, environment), TE.match(() => TE.right(0), (price) => TE.right(price)), TE.fromTask, TE.flatten, TE.map((price) => {
            return new bignumber_js_1.BigNumber(account.account.amount.toString())
                .shiftedBy(-account.mintInfo.account.decimals)
                .times(price);
        }))))), TE.map((values) => values.reduce((acc, value) => acc.plus(value), new bignumber_js_1.BigNumber(0))));
    }
    getTokenPrice(tokenMint, environment) {
        const cacheKey = `token-price-${tokenMint.toBase58()}`;
        return FN.pipe(TE.tryCatch(() => this.cacheManager.get(cacheKey), (e) => new errors.Exception(e)), TE.map(OP.fromNullable), TE.chainW((price) => OP.isSome(price)
            ? TE.right(price.value)
            : FN.pipe(this.fetchTokenListDict(environment), TE.map((tokenDict) => tokenDict[tokenMint.toBase58()]), TE.map(OP.fromNullable), TE.map((tokenInfo) => (OP.isNone(tokenInfo) ? undefined : tokenInfo.value.symbol)), TE.chainW((symbol) => symbol
                ? FN.pipe(TE.tryCatch(() => fetch(`${PRICE_ENDPOINT}?id=${symbol}`).then((resp) => resp.json()), (e) => new errors.Exception(e)), TE.map((resp) => { var _a; return ((_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.price) || 0; }), TE.chain((price) => TE.tryCatch(() => this.cacheManager.set(cacheKey, price, 60 * 5), (e) => new errors.Exception(e))))
                : TE.right(0)))));
    }
    fetchTokenList(environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        const cacheKey = 'tokenList';
        return FN.pipe(TE.tryCatch(() => this.cacheManager.get(cacheKey), (e) => new errors.Exception(e)), TE.map(OP.fromNullable), TE.chainW((cachedList) => OP.isSome(cachedList)
            ? TE.right(cachedList.value)
            : FN.pipe(TE.tryCatch(() => new spl_token_registry_1.TokenListProvider().resolve(), (e) => new errors.Exception(e)), TE.bindTo('tokenListContainer'), TE.bindW('overrides', () => this.fetchTokenOverrides(environment)), TE.map(({ tokenListContainer, overrides }) => tokenListContainer
                .filterByClusterSlug('mainnet-beta')
                .getList()
                .map((tokenInfo) => {
                if (overrides[tokenInfo.address]) {
                    return (0, ramda_1.mergeDeepRight)(tokenInfo, overrides[tokenInfo.address]);
                }
                return tokenInfo;
            })), TE.chainW((tokenList) => TE.tryCatch(() => this.cacheManager.set(cacheKey, tokenList, 60 * 10), (e) => new errors.Exception(e))))));
    }
    fetchTokenListDict(environment) {
        return FN.pipe(this.fetchTokenList(environment), TE.map((tokenList) => tokenList.reduce((acc, token) => {
            acc[token.address] = token;
            return acc;
        }, {})));
    }
    fetchTokenOverrides(environment) {
        const cacheKey = `realm-token-overrides-${environment}`;
        return FN.pipe(TE.tryCatch(() => this.cacheManager.get(cacheKey), (e) => new errors.Exception(e)), TE.map(OP.fromNullable), TE.chainW((overrides) => OP.isSome(overrides)
            ? TE.right(overrides.value)
            : FN.pipe(TE.tryCatch(() => fetch(`${this.configService.get('app.codeCommitedInfoUrl')}/realms/token-overrides.json`).then((response) => response.json()), (e) => new errors.Exception(e)), TE.chain((overrides) => TE.tryCatch(() => this.cacheManager.set(cacheKey, overrides, 60 * 10), (e) => new errors.Exception(e))))));
    }
};
RealmTreasuryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, config_service_1.ConfigService,
        helius_service_1.HeliusService])
], RealmTreasuryService);
exports.RealmTreasuryService = RealmTreasuryService;
//# sourceMappingURL=realm-treasury.service.js.map