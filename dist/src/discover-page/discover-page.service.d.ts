import { Repository } from 'typeorm';
import { Environment } from '@lib/types/Environment';
import { RealmFeedItemService } from '@src/realm-feed-item/realm-feed-item.service';
import { RealmService } from '@src/realm/realm.service';
import { DiscoverPage } from './dto/DiscoverPage';
import { DiscoverPage as DiscoverPageEntity, Data } from './entities/DiscoverPage.entity';
interface DiscoverPageData extends Data {
    version: number;
}
export declare class DiscoverPageService {
    private readonly discoverPageRepository;
    private readonly realmFeedItemService;
    private readonly realmService;
    constructor(discoverPageRepository: Repository<DiscoverPageEntity>, realmFeedItemService: RealmFeedItemService, realmService: RealmService);
    getCurrentDiscoverPageData(environment: Environment): Promise<DiscoverPageData>;
    getCurrentDiscoverPage(environment: Environment): Promise<DiscoverPage>;
    updateDiscoverPage(data: Data, environment: Environment): Promise<DiscoverPage>;
}
export {};
