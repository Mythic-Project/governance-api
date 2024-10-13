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
exports.HeliusService = void 0;
const common_1 = require("@nestjs/common");
const spl_governance_1 = require("@solana/spl-governance");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const AUXILIARY_TOKEN_ASSETS_1 = require("../lib/treasuryAssets/AUXILIARY_TOKEN_ASSETS");
const getRawAssetAccounts_1 = require("../lib/treasuryAssets/getRawAssetAccounts");
const getSolAccounts_1 = require("../lib/treasuryAssets/getSolAccounts");
const parseMintAccountData_1 = require("../lib/treasuryAssets/parseMintAccountData");
const parseTokenAccountData_1 = require("../lib/treasuryAssets/parseTokenAccountData");
const exists_1 = require("../lib/typeGuards/exists");
const config_service_1 = require("../config/config.service");
const realm_settings_service_1 = require("../realm-settings/realm-settings.service");
const stale_cache_service_1 = require("../stale-cache/stale-cache.service");
const SOL_MINT_PK = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
const DEFAULT_NFT_TREASURY_MINT = 'GNFTm5rz1Kzvq94G7DJkcrEUnCypeQYf7Ya8arPoHWvw';
const SOL_MINT = {
    publicKey: SOL_MINT_PK,
    account: {
        mintAuthorityOption: 0,
        mintAuthority: null,
        supply: new spl_token_1.u64(0),
        decimals: 9,
        isInitialized: true,
        freezeAuthorityOption: 0,
        freezeAuthority: null,
    },
};
function dedupeByPublicKey(list) {
    const existing = new Set();
    const dedupedByPublicKey = [];
    for (const item of list) {
        const address = item.publicKey.toBase58();
        if (!existing.has(address)) {
            existing.add(address);
            dedupedByPublicKey.push(item);
        }
    }
    return dedupedByPublicKey;
}
let HeliusService = class HeliusService {
    constructor(configService, realmSettingsService, staleCacheService) {
        this.configService = configService;
        this.realmSettingsService = realmSettingsService;
        this.staleCacheService = staleCacheService;
        this.getAssetOwnersInRealm = this.staleCacheService.dedupe(async (realmPublicKey, environment) => {
            const settings = await this.realmSettingsService.getCodeCommittedSettingsForRealm(realmPublicKey, environment);
            const governances = await this.getGovernances(realmPublicKey, environment);
            const owners = await Promise.all(governances.map((governance) => (0, spl_governance_1.getNativeTreasuryAddress)(new web3_js_1.PublicKey(settings.programId), governance.pubkey).then((wallet) => ({ wallet, governance: governance.pubkey }))));
            return owners;
        }, {
            dedupeKey: (rpk, env) => rpk.toBase58() + env,
        });
        this.getProgramId = this.staleCacheService.dedupe(async (realmPublicKey, environment) => {
            const { programId } = await this.realmSettingsService.getCodeCommittedSettingsForRealm(realmPublicKey, environment);
            return new web3_js_1.PublicKey(programId);
        }, {
            dedupeKey: (rpk, env) => rpk.toBase58() + env,
        });
        this.getProposal = this.staleCacheService.dedupe((proposalPublicKey, environment) => {
            const connection = this.connection(environment);
            return (0, spl_governance_1.getProposal)(connection, proposalPublicKey);
        }, {
            dedupeKey: (ppk, env) => ppk.toBase58() + env,
        });
        this.getProposalsByGovernance = this.staleCacheService.dedupe((programPublicKey, governancePublicKey, environment) => {
            const connection = this.connection(environment);
            return (0, spl_governance_1.getProposalsByGovernance)(connection, programPublicKey, governancePublicKey);
        }, {
            dedupeKey: (ppk, gpk, env) => ppk.toBase58() + gpk.toBase58() + env,
        });
        this.getAllProposalsForRealm = this.staleCacheService.dedupe(async (realmPublicKey, environment) => {
            const [governances, programId] = await Promise.all([
                this.getGovernances(realmPublicKey, environment),
                this.getProgramId(realmPublicKey, environment),
            ]);
            return Promise.all(governances.map((governance) => this.getProposalsByGovernance(programId, governance.pubkey, environment))).then((proposals) => proposals.flat());
        }, {
            dedupeKey: (rpk, env) => rpk.toBase58() + env,
        });
        this.getProgramVersion = this.staleCacheService.dedupe((programPublicKey, environment) => {
            const connection = this.connection(environment);
            return (0, spl_governance_1.getGovernanceProgramVersion)(connection, programPublicKey);
        }, {
            dedupeKey: (ppk, env) => ppk.toBase58() + env,
        });
        this.getGovernances = this.staleCacheService.dedupe(async (realmPublicKey, environment) => {
            const connection = this.connection(environment);
            const programId = await this.getProgramId(realmPublicKey, environment);
            const governances = await (0, spl_governance_1.getGovernanceAccounts)(connection, programId, spl_governance_1.Governance, [
                (0, spl_governance_1.pubkeyFilter)(1, realmPublicKey),
            ]);
            return governances;
        }, {
            dedupeKey: (rpk, env) => rpk.toBase58() + env,
        });
        this.getGovernance = this.staleCacheService.dedupe((governancePublicKey, environment) => {
            const connection = this.connection(environment);
            return (0, spl_governance_1.getGovernance)(connection, governancePublicKey);
        }, {
            dedupeKey: (gpk, env) => gpk.toBase58() + env,
        });
        this.getRealm = this.staleCacheService.dedupe((realmPublicKey, environment) => {
            const connection = this.connection(environment);
            return (0, spl_governance_1.getRealm)(connection, realmPublicKey);
        }, {
            dedupeKey: (rpk, env) => rpk.toBase58() + env,
        });
        this.getAuxiliaryTokenAccountsInRealm = this.staleCacheService.dedupe(async (realmPublicKey, environment) => {
            const connection = this.connection(environment);
            const auxilliaryAccounts = AUXILIARY_TOKEN_ASSETS_1.AUXILIARY_TOKEN_ASSETS[realmPublicKey.toBase58()] || [];
            if (!auxilliaryAccounts.length) {
                return [];
            }
            const governances = auxilliaryAccounts.map((list) => list.owner);
            const accounts = auxilliaryAccounts.map((list) => list.accounts).flat();
            const { programId } = await this.realmSettingsService.getCodeCommittedSettingsForRealm(realmPublicKey, environment);
            const assetOwners = await Promise.all(governances.map((governance) => (0, spl_governance_1.getNativeTreasuryAddress)(new web3_js_1.PublicKey(programId), governance).then((wallet) => ({
                wallet,
                governance,
            }))));
            const tokenAccountsResp = await (0, getRawAssetAccounts_1.getRawAssetAccounts)(governances, connection.commitment);
            const tokenAccountsRaw = tokenAccountsResp.map(({ result }) => result).flat();
            const valid = [];
            for (const asset of tokenAccountsRaw) {
                for (const account of accounts) {
                    if (asset.pubkey === account.toBase58()) {
                        valid.push(asset);
                    }
                }
            }
            const tokenAssets = await this.convertRawTokenAssets(valid, assetOwners, environment);
            return tokenAssets;
        }, {
            dedupeKey: (rpk, env) => rpk.toBase58() + env,
        });
        this.getTokenAccountsInRealm = this.staleCacheService.dedupe(async (realmPublicKey, environment) => {
            const connection = this.connection(environment);
            const assetOwners = await this.getAssetOwnersInRealm(realmPublicKey, environment);
            const solAccounts = await (0, getSolAccounts_1.getSolAccounts)(assetOwners.map((owner) => owner.wallet));
            const tokenAccountsResp = await (0, getRawAssetAccounts_1.getRawAssetAccounts)(assetOwners.map(({ governance, wallet }) => [governance, wallet]).flat(), connection.commitment);
            const tokenAccountsRaw = tokenAccountsResp.map(({ result }) => result).flat();
            const tokenAccounts = await this.convertRawTokenAssets(tokenAccountsRaw, assetOwners, environment).catch((e) => {
                console.error(e);
                console.log(JSON.stringify(tokenAccountsResp, null, 2));
                console.log(JSON.stringify(tokenAccountsRaw, null, 2));
                console.log(JSON.stringify(assetOwners, null, 2));
                return [];
            });
            const lamportMap = solAccounts.reduce((cur, acc) => {
                var _a;
                cur[acc.owner.toBase58()] = (_a = acc.value) === null || _a === void 0 ? void 0 : _a.lamports;
                return cur;
            }, {});
            const unaccountedSolAccounts = new Set(Object.keys(lamportMap));
            const accounts = tokenAccounts
                .map((account) => {
                let amount = account.account.amount;
                if (account.account.isNative) {
                    const wallet = account.walletPublicKey.toBase58();
                    const solAmount = lamportMap[wallet];
                    if (solAmount) {
                        amount = new spl_token_1.u64(solAmount);
                        unaccountedSolAccounts.delete(wallet);
                    }
                }
                return Object.assign(Object.assign({}, account), { account: Object.assign(Object.assign({}, account.account), { amount }) });
            })
                .filter((account) => {
                var _a;
                if (((_a = account.mintInfo.account.mintAuthority) === null || _a === void 0 ? void 0 : _a.toBase58()) === DEFAULT_NFT_TREASURY_MINT) {
                    return false;
                }
                if (account.mintInfo.account.supply.cmpn(1) === 0) {
                    return false;
                }
                return true;
            });
            const unaccounted = [];
            if (unaccountedSolAccounts.size > 0) {
                for (const key of unaccountedSolAccounts.keys()) {
                    const lamports = lamportMap[key];
                    const owner = assetOwners.find((owner) => owner.governance.toBase58() === key || owner.wallet.toBase58() === key);
                    if (lamports && owner) {
                        unaccounted.push({
                            account: {
                                address: owner.wallet,
                                mint: SOL_MINT.publicKey,
                                owner: SOL_MINT_PK,
                                amount: new spl_token_1.u64(lamports),
                                delegate: null,
                                delegatedAmount: new spl_token_1.u64(0),
                                isInitialized: true,
                                isFrozen: false,
                                isNative: true,
                                rentExemptReserve: new spl_token_1.u64('2039280'),
                                closeAuthority: null,
                            },
                            governancePublicKey: owner.governance,
                            mintInfo: SOL_MINT,
                            publicKey: owner.wallet,
                            walletPublicKey: owner.wallet,
                        });
                    }
                }
            }
            return accounts.concat(unaccounted);
        }, {
            dedupeKey: (rpk, env) => rpk.toBase58() + env,
        });
        this.getTokenMintInfo = this.staleCacheService.dedupe((mintPublicKey, environment) => {
            const connection = this.connection(environment);
            return fetch(connection.rpcEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: mintPublicKey.toBase58(),
                    method: 'getAccountInfo',
                    params: [
                        mintPublicKey.toBase58(),
                        {
                            commitment: connection.commitment,
                            encoding: 'base64',
                        },
                    ],
                }),
            })
                .then((resp) => {
                return resp.json();
            })
                .then(({ result }) => {
                const { value } = result;
                const publicKey = mintPublicKey;
                const data = Buffer.from(value.data[0], 'base64');
                const account = (0, parseMintAccountData_1.parseMintAccountData)(data);
                return { publicKey, account };
            });
        }, {
            dedupeKey: (mpk, env) => mpk.toBase58() + env,
        });
        this.getTokenOwnerRecord = this.staleCacheService.dedupe((userPublicKey, environment) => {
            const connection = this.connection(environment);
            return (0, spl_governance_1.getTokenOwnerRecord)(connection, userPublicKey);
        }, {
            dedupeKey: (upk, env) => upk.toBase58() + env,
        });
        this.getTokenOwnerRecordForRealm = this.staleCacheService.dedupe((programId, realm, governingTokenMint, governingTokenOwner, environment) => {
            const connection = this.connection(environment);
            return (0, spl_governance_1.getTokenOwnerRecordForRealm)(connection, programId, realm, governingTokenMint, governingTokenOwner);
        }, {
            dedupeKey: (pid, rpk, gtm, gto, env) => pid.toBase58() + rpk.toBase58() + gtm.toBase58() + gto.toBase58() + env,
        });
        this.getVoteRecordsByVoter = this.staleCacheService.dedupe((programPublicKey, voterPublicKey, environment) => {
            const connection = this.connection(environment);
            return (0, spl_governance_1.getVoteRecordsByVoter)(connection, programPublicKey, voterPublicKey);
        }, {
            dedupeKey: (ppk, vpk, env) => ppk.toBase58() + vpk.toBase58() + env,
        });
        this.getVoteRecordsByProposal = this.staleCacheService.dedupe(async (proposalPublicKey, programId, environment) => {
            const connection = this.connection(environment);
            const filter = (0, spl_governance_1.pubkeyFilter)(1, proposalPublicKey);
            if (!filter) {
                return [];
            }
            return (0, spl_governance_1.getGovernanceAccounts)(connection, programId, spl_governance_1.VoteRecord, [filter]);
        }, {
            dedupeKey: (ppk, pid, env) => ppk.toBase58() + pid.toBase58() + env,
        });
    }
    endpoint(environment) {
        switch (environment) {
            case 'devnet':
                return `https://devnet.helius-rpc.com/?api-key=${this.configService.get('helius.apiKey')}`;
            case 'mainnet':
                return `https://rpc.helius.xyz/?api-key=${this.configService.get('helius.apiKey')}`;
        }
    }
    connection(environment) {
        return new web3_js_1.Connection(this.endpoint(environment));
    }
    async convertRawTokenAssets(assets, assetOwners, environment) {
        const converted = assets.map(({ account, pubkey }) => {
            const publicKey = new web3_js_1.PublicKey(pubkey);
            const data = Buffer.from(account.data[0], 'base64');
            const parsedAccount = (0, parseTokenAccountData_1.parseTokenAccountData)(publicKey, data);
            const assetOwner = assetOwners.find((assetOwner) => assetOwner.governance.equals(parsedAccount.owner) ||
                assetOwner.wallet.equals(parsedAccount.owner));
            if (!assetOwner) {
                return null;
            }
            return {
                publicKey,
                account: parsedAccount,
                governancePublicKey: assetOwner.governance,
                walletPublicKey: assetOwner.wallet,
            };
        });
        const filtered = converted.filter(exists_1.exists);
        const deduped = dedupeByPublicKey(filtered);
        const withMints = await Promise.all(deduped.map((account) => this.getTokenMintInfo(account.account.mint, environment).then((mintInfo) => (Object.assign(Object.assign({}, account), { mintInfo })))));
        return withMints;
    }
};
HeliusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        realm_settings_service_1.RealmSettingsService,
        stale_cache_service_1.StaleCacheService])
], HeliusService);
exports.HeliusService = HeliusService;
//# sourceMappingURL=helius.service.js.map