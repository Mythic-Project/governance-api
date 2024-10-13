import { PublicKey } from '@solana/web3.js';
import { Repository } from 'typeorm';
import { User } from '@lib/decorators/CurrentUser';
import { Environment } from '@lib/types/Environment';
import { ConfigService } from '@src/config/config.service';
import { HeliusService } from '@src/helius/helius.service';
import { RealmHubService } from '@src/realm-hub/realm-hub.service';
import { RealmSettingsService } from '@src/realm-settings/realm-settings.service';
import { StaleCacheService } from '@src/stale-cache/stale-cache.service';
import { User as UserEntity } from '@src/user/entities/User.entity';
import { Realm as RealmDto } from './dto/Realm';
import { Realm } from './entities/Realm.entity';
import { RealmInput as RealmInputDto } from './inputDto/RealmInput';
export declare class RealmService {
    private readonly configService;
    private readonly heliusService;
    private readonly realmHubService;
    private readonly realmSettingsService;
    private readonly staleCacheService;
    private readonly realmRepository;
    private readonly userRepository;
    constructor(configService: ConfigService, heliusService: HeliusService, realmHubService: RealmHubService, realmSettingsService: RealmSettingsService, staleCacheService: StaleCacheService, realmRepository: Repository<Realm>, userRepository: Repository<UserEntity>);
    convertEntityDto(realm: Realm): RealmDto;
    followRealm(realmPublicKey: PublicKey, user: User, environment: Environment): Promise<{
        publicKey: PublicKey;
    }>;
    getRealmEntity(publicKey: PublicKey, environment: Environment): Promise<Realm>;
    getRealm(publicKey: PublicKey, environment: Environment): Promise<RealmDto>;
    getRealmByUrlId(id: string, environment: Environment): Promise<RealmDto>;
    getRealms(publicKeys: PublicKey[], environment: Environment): Promise<Realm[]>;
    getAllRealmPublicKeys(environment: Environment): Promise<PublicKey[]>;
    getRealmDropdownList(environment: Environment): Promise<RealmDto[]>;
    listFollowedRealms(user: User, environment: Environment): Promise<RealmDto[]>;
    setupRealm(publicKey: PublicKey, environment: Environment): Promise<Realm>;
    newSymbolIsValid(realmPublicKey: PublicKey, newSymbol: string): Promise<boolean>;
    unfollowRealm(realmPublicKey: PublicKey, user: User, environment: Environment): Promise<{
        publicKey: PublicKey;
    }>;
    updateRealm(user: User, publicKey: PublicKey, environment: Environment, updates: RealmInputDto): Promise<RealmDto>;
    userIsAdminMember(realmPublicKey: PublicKey, userPublicKey: PublicKey, environment: Environment): Promise<boolean>;
}
