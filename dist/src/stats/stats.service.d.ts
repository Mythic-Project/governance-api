/// <reference types="@solana/spl-governance/node_modules/@solana/web3.js" />
/// <reference types="@solana/spl-token" />
import { Governance, ProgramAccount } from '@solana/spl-governance';
import { PublicKey } from '@solana/web3.js';
import { BigNumber } from 'bignumber.js';
import { Repository } from 'typeorm';
import { HeliusService } from '@src/helius/helius.service';
import { Realm } from '@src/realm/entities/Realm.entity';
import { Tvl } from './entities/Tvl.entity';
export declare const TOKEN_PROGRAM_ID: PublicKey;
export declare class StatsService {
    private readonly heliusService;
    private readonly realmRepository;
    private readonly tvlRepository;
    private readonly logger;
    constructor(heliusService: HeliusService, realmRepository: Repository<Realm>, tvlRepository: Repository<Tvl>);
    getTvl(force?: boolean): Promise<import("./entities/Tvl.entity").Data>;
    getAndSaveTvl(force?: boolean): Promise<import("./entities/Tvl.entity").Data>;
    calculateTvl(): Promise<{
        ownTokens: {
            [mintAddress: string]: BigNumber;
        };
        tvl: {
            So11111111111111111111111111111111111111112: BigNumber;
            EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: BigNumber;
        };
    }>;
    fetchGovernances(realms: Realm[]): Promise<{
        realm: Realm;
        name: string;
        governances: ProgramAccount<Governance>[];
    }[]>;
    fetchTokens(realm: Realm, governances: ProgramAccount<Governance>[]): Promise<{
        [mintAddr: string]: BigNumber;
    }>;
    fetchTokenList(governance: PublicKey): Promise<{
        pubkey: PublicKey;
        account: import("@solana/web3.js").AccountInfo<import("@solana/web3.js").ParsedAccountData>;
    }[]>;
    fetchTokenPrices(tokenMintAddresses: string[]): Promise<{
        prices: {
            [tokenMintAddress: string]: number;
        };
        mints: {
            [tokenMintAddress: string]: {
                publicKey: PublicKey;
                account: import("@solana/spl-token").MintInfo;
            };
        };
    }>;
    fetchTokenBatchPrices(tokenMintAddresses: string[]): Promise<{
        prices: {
            [tokenMintAddress: string]: number;
        };
        mints: {
            [mint: string]: {
                publicKey: PublicKey;
                account: import("@solana/spl-token").MintInfo;
            };
        };
    }>;
}
