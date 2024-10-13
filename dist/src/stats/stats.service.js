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
var StatsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = exports.TOKEN_PROGRAM_ID = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const spl_governance_1 = require("@solana/spl-governance");
const web3_js_1 = require("@solana/web3.js");
const bignumber_js_1 = require("bignumber.js");
const date_fns_1 = require("date-fns");
const typeorm_2 = require("typeorm");
const batch_1 = require("../lib/batch");
const wait_1 = require("../lib/wait");
const helius_service_1 = require("../helius/helius.service");
const Realm_entity_1 = require("../realm/entities/Realm.entity");
const Tvl_entity_1 = require("./entities/Tvl.entity");
const SOL_ADDR = 'So11111111111111111111111111111111111111112';
const USDC_ADDR = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const DEFAULT_TVL = {
    ownTokens: {},
    tvl: {
        [SOL_ADDR]: '0',
        [USDC_ADDR]: '0',
    },
};
exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
let StatsService = StatsService_1 = class StatsService {
    constructor(heliusService, realmRepository, tvlRepository) {
        this.heliusService = heliusService;
        this.realmRepository = realmRepository;
        this.tvlRepository = tvlRepository;
        this.logger = new common_1.Logger(StatsService_1.name);
    }
    async getTvl(force) {
        if (force) {
            return this.getAndSaveTvl(force);
        }
        const cached = await this.tvlRepository.find({
            where: { pending: false },
            order: {
                updated: 'DESC',
            },
            take: 1,
        });
        if (cached.length > 0) {
            const item = cached[0];
            const result = item.data;
            if (Math.abs((0, date_fns_1.differenceInCalendarDays)(item.updated, Date.now())) > 1) {
                this.getAndSaveTvl(force);
            }
            return result;
        }
        else {
            this.getAndSaveTvl(force);
            return DEFAULT_TVL;
        }
    }
    async getAndSaveTvl(force) {
        const pending = await this.tvlRepository.find({
            where: { pending: true },
        });
        if (force) {
            if (pending.length > 0) {
                this.tvlRepository.delete(pending.map((p) => p.id));
            }
        }
        else if (pending.length > 0) {
            return DEFAULT_TVL;
        }
        const newCached = this.tvlRepository.create({
            data: {
                ownTokens: {},
                tvl: {
                    [SOL_ADDR]: '0',
                    [USDC_ADDR]: '0',
                },
            },
            pending: true,
        });
        const [, result] = await Promise.all([this.tvlRepository.save(newCached), this.calculateTvl()]);
        const data = {
            ownTokens: {},
            tvl: {},
        };
        for (const [type, amounts] of Object.entries(result)) {
            for (const [mint, amount] of Object.entries(amounts)) {
                data[type][mint] = amount.toString();
            }
        }
        const latestPending = await this.tvlRepository.findOne({
            where: { pending: true },
        });
        if (latestPending) {
            latestPending.data = data;
            latestPending.pending = false;
            await this.tvlRepository.save(latestPending);
        }
        return data;
    }
    async calculateTvl() {
        this.logger.verbose('Fetching a list of realms');
        const realms = await this.realmRepository.find({ where: { environment: 'mainnet' } });
        const tokens = new Set([]);
        const totalTvl = {
            ownTokens: {},
            tvl: {
                [SOL_ADDR]: new bignumber_js_1.BigNumber(0),
                [USDC_ADDR]: new bignumber_js_1.BigNumber(0),
            },
        };
        this.logger.verbose('Fetching a list of governances per realm');
        const realmsWithGovernances = await this.fetchGovernances(realms);
        this.logger.verbose('Fetching a list of tokens in each governance');
        const batches = (0, batch_1.batch)(realmsWithGovernances, 10);
        await Promise.all(batches.map(async (batch) => {
            for (const realm of batch) {
                const tokenLists = await this.fetchTokens(realm.realm, realm.governances);
                for (const [mint, amount] of Object.entries(tokenLists)) {
                    tokens.add(mint);
                    if (mint === SOL_ADDR || mint === USDC_ADDR) {
                        totalTvl.tvl[mint] = totalTvl.tvl[mint].plus(amount);
                    }
                    else {
                        if (!totalTvl.ownTokens[mint]) {
                            totalTvl.ownTokens[mint] = new bignumber_js_1.BigNumber(0);
                        }
                        totalTvl.ownTokens[mint] = totalTvl.ownTokens[mint].plus(amount);
                    }
                }
            }
        }));
        this.logger.verbose('Completed calculating TVL');
        return totalTvl;
    }
    async fetchGovernances(realms) {
        const connection = this.heliusService.connection('mainnet');
        const batches = (0, batch_1.batch)(realms, 50);
        const realmsWithGovernances = [];
        await batches.reduce((acc, realms) => {
            return acc
                .then(async () => Promise.all(realms.map((realm) => {
                this.logger.verbose(`Fetching governances for ${realm.data.name}`);
                return (realm.data.programPublicKeyStr
                    ? (0, spl_governance_1.getAllGovernances)(connection, new web3_js_1.PublicKey(realm.data.programPublicKeyStr), new web3_js_1.PublicKey(realm.publicKeyStr))
                    : Promise.resolve([])).then((governances) => {
                    realmsWithGovernances.push({
                        realm,
                        governances,
                        name: realm.data.name,
                    });
                });
            })))
                .then(() => (0, wait_1.wait)(500));
        }, Promise.resolve(true));
        return realmsWithGovernances;
    }
    async fetchTokens(realm, governances) {
        const connection = this.heliusService.connection('mainnet');
        const tokensList = {};
        if (realm.data.programPublicKeyStr) {
            for (const governace of governances) {
                this.logger.verbose(`Fetching tokens in ${realm.data.name} / ${governace.pubkey.toBase58()}`);
                const solWallet = await (0, spl_governance_1.getNativeTreasuryAddress)(new web3_js_1.PublicKey(realm.data.programPublicKeyStr), governace.pubkey);
                const [tokens, moreTokens] = await Promise.all([
                    this.fetchTokenList(governace.pubkey),
                    this.fetchTokenList(solWallet),
                ]);
                const solAccount = await connection.getAccountInfo(solWallet).catch(() => null);
                if (solAccount) {
                    if (!tokensList[SOL_ADDR]) {
                        tokensList[SOL_ADDR] = new bignumber_js_1.BigNumber(0);
                    }
                    tokensList[SOL_ADDR] = tokensList[SOL_ADDR].plus(new bignumber_js_1.BigNumber(solAccount.lamports));
                }
                const relevantTokens = tokens
                    .concat(moreTokens)
                    .map((tokenAccount) => {
                    return {
                        mint: new web3_js_1.PublicKey(tokenAccount.account.data.parsed.info.mint),
                        amount: new bignumber_js_1.BigNumber(tokenAccount.account.data.parsed.info.tokenAmount.amount),
                    };
                })
                    .filter((ta) => ta.amount.isGreaterThan(0));
                for (const token of relevantTokens) {
                    if (!tokensList[token.mint.toBase58()]) {
                        tokensList[token.mint.toBase58()] = new bignumber_js_1.BigNumber(0);
                    }
                    tokensList[token.mint.toBase58()] = tokensList[token.mint.toBase58()].plus(token.amount);
                }
            }
        }
        return tokensList;
    }
    async fetchTokenList(governance) {
        const connection = this.heliusService.connection('mainnet');
        const resp = await connection
            .getParsedTokenAccountsByOwner(governance, {
            programId: exports.TOKEN_PROGRAM_ID,
        })
            .catch(() => null);
        return (resp === null || resp === void 0 ? void 0 : resp.value) || [];
    }
    async fetchTokenPrices(tokenMintAddresses) {
        let prices = {};
        let mints = {};
        const batches = (0, batch_1.batch)(tokenMintAddresses, 50);
        await batches.reduce((acc, tokenMintAddresses) => acc.then(() => this.fetchTokenBatchPrices(tokenMintAddresses).then(({ prices: tokenPrices, mints: mintsInfo }) => {
            prices = Object.assign(Object.assign({}, prices), tokenPrices);
            mints = Object.assign(Object.assign({}, mints), mintsInfo);
            return (0, wait_1.wait)(500);
        })), Promise.resolve(true));
        return { prices, mints };
    }
    async fetchTokenBatchPrices(tokenMintAddresses) {
        const resp = await fetch(`https://price.jup.ag/v4/price?ids=${tokenMintAddresses.join(',')}`);
        const data = (await resp.json())['data'];
        const prices = Object.keys(data).reduce((acc, mint) => {
            acc[mint] = data[mint].price;
            return acc;
        }, {});
        const mints = await Promise.all(tokenMintAddresses.map((mint) => this.heliusService.getTokenMintInfo(new web3_js_1.PublicKey(mint), 'mainnet'))).then((mints) => mints.reduce((acc, mint) => {
            acc[mint.publicKey.toBase58()] = mint;
            return acc;
        }, {}));
        return { prices, mints };
    }
};
StatsService = StatsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(Realm_entity_1.Realm)),
    __param(2, (0, typeorm_1.InjectRepository)(Tvl_entity_1.Tvl)),
    __metadata("design:paramtypes", [helius_service_1.HeliusService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StatsService);
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map