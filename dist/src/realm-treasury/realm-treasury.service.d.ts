import { TokenInfo } from '@solana/spl-token-registry';
import { PublicKey } from '@solana/web3.js';
import { BigNumber } from 'bignumber.js';
import { Cache } from 'cache-manager';
import * as TE from 'fp-ts/TaskEither';
import * as errors from '@lib/errors/gql';
import { Environment } from '@lib/types/Environment';
import { ConfigService } from '@src/config/config.service';
import { HeliusService } from '@src/helius/helius.service';
interface TokenOverrides {
    [mintAddress: string]: Partial<TokenInfo>;
}
export declare class RealmTreasuryService {
    private readonly cacheManager;
    private readonly configService;
    private readonly heliusService;
    constructor(cacheManager: Cache, configService: ConfigService, heliusService: HeliusService);
    getRealmTreasuryValue(realmPublicKey: PublicKey, environment: Environment): TE.TaskEither<unknown, BigNumber>;
    getTokenPrice(tokenMint: PublicKey, environment: Environment): TE.TaskEither<errors.Exception, number>;
    fetchTokenList(environment: Environment): TE.TaskEither<errors.Exception, TokenInfo[]>;
    fetchTokenListDict(environment: Environment): TE.TaskEither<errors.Exception, {
        [key: string]: TokenInfo;
    }>;
    fetchTokenOverrides(environment: Environment): TE.TaskEither<errors.Exception, TokenOverrides>;
}
export {};
