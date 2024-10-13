import { PublicKey } from '@solana/web3.js';
import { Environment } from '@lib/decorators/CurrentEnvironment';
import { RealmTreasury } from './dto/RealmTreasury';
import { RealmTreasuryService } from './realm-treasury.service';
export declare class RealmTreasuryResolver {
    private readonly realmTreasuryService;
    constructor(realmTreasuryService: RealmTreasuryService);
    realmTreasury(realm: PublicKey): {
        belongsTo: PublicKey;
    };
    totalValue(realmTreasury: RealmTreasury, environment: Environment): import("fp-ts/lib/TaskEither").TaskEither<unknown, import("bignumber.js").BigNumber>;
}
