import { Environment } from '@lib/types/Environment';
export interface Data {
    daoToolingPublicKeyStrs: string[];
    defiPublicKeyStrs: string[];
    gamingPublicKeyStrs: string[];
    hackathonWinnersPublicKeyStrs: string[];
    keyAnnouncementFeedItemIds: number[];
    nftCollectionsPublicKeyStrs: string[];
    popularPublicKeyStrs: string[];
    spotlight: {
        heroImageUrl: string;
        title: string;
        realmPublicKeyStr: string;
        description: string;
        stats: {
            value: string;
            label: string;
        }[];
    }[];
    trendingOrgPublicKeyStrs: string[];
    web3PublicKeyStrs: string[];
}
export declare class DiscoverPage {
    id: number;
    data: Data;
    environment: Environment;
    created: Date;
    deleted: Date;
    updated: Date;
}
