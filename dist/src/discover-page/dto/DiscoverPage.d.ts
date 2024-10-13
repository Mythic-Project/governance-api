import { RealmFeedItem } from '@src/realm-feed-item/dto/RealmFeedItem';
import { Realm } from '@src/realm/dto/Realm';
import { DiscoverPageSpotlightItem } from './DiscoverPageSpotlightItem';
export declare class DiscoverPage {
    version: number;
    daoTooling: Realm[];
    defi: Realm[];
    gaming: Realm[];
    hackathonWinners: Realm[];
    keyAnnouncements: typeof RealmFeedItem[];
    nftCollections: Realm[];
    popular: Realm[];
    spotlight: DiscoverPageSpotlightItem[];
    trending: Realm[];
    web3: Realm[];
}
