import { Environment } from '@lib/decorators/CurrentEnvironment';
import { User } from '@lib/decorators/CurrentUser';
import { ConfigService } from '@src/config/config.service';
import { Realm } from '@src/realm/dto/Realm';
import { RealmService } from '@src/realm/realm.service';
import { DiscoverPageService } from './discover-page.service';
import { DiscoverPage } from './dto/DiscoverPage';
import { DiscoverPageSpotlightItem } from './dto/DiscoverPageSpotlightItem';
import { DiscoverPageInput } from './inputDto/DiscoverPageInput';
export declare class DiscoverPageResolver {
    private readonly configService;
    private readonly discoverPageService;
    constructor(configService: ConfigService, discoverPageService: DiscoverPageService);
    discoverPage(environment: Environment): Promise<DiscoverPage>;
    updateDiscoverPage(data: DiscoverPageInput, environment: Environment, user: User | null): Promise<DiscoverPage>;
}
export declare class DiscoverPageSpotlightItemResolver {
    private readonly realmService;
    constructor(realmService: RealmService);
    realm(item: DiscoverPageSpotlightItem, environment: Environment): Promise<Realm>;
}
