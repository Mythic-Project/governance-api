import { PublicKey } from '@solana/web3.js';
import { Cache } from 'cache-manager';
import { Environment } from '@lib/types/Environment';
import { ConfigService } from '@src/config/config.service';
import { RealmSettingsService } from '@src/realm-settings/realm-settings.service';
import { StaleCacheService } from '@src/stale-cache/stale-cache.service';
import { RealmHubInfoRoadmapItemStatus } from './dto/RealmHubInfoRoadmapItemStatus';
export interface CodeCommittedHubInfo {
    about?: {
        heading?: string;
        content?: string[];
    }[];
    documentation?: {
        title?: string;
        url?: string;
    };
    faq?: {
        question?: string;
        answer?: string[];
    }[];
    gallery?: {
        url?: string;
        caption?: string;
        height?: number;
        width?: number;
    }[];
    heading?: string;
    resources?: {
        title?: string;
        content?: string[];
        url?: string;
    }[];
    roadmap?: {
        description?: string[];
        items?: {
            title?: string;
            date?: string;
            status?: string;
            resource?: {
                title?: string;
                url?: string;
            };
        }[];
    };
    symbol?: string;
    token?: string;
    team?: {
        name?: string;
        avatar?: string;
        description?: string[];
        role?: string;
        twitter?: string;
    }[];
}
export declare class RealmHubService {
    private cacheManager;
    private readonly configService;
    private readonly realmSettingsService;
    private readonly staleCacheService;
    constructor(cacheManager: Cache, configService: ConfigService, realmSettingsService: RealmSettingsService, staleCacheService: StaleCacheService);
    fetchAllCodeCommittedHubInfo(environment: Environment): Promise<{
        [address: string]: CodeCommittedHubInfo;
    }>;
    getTwitterFollowerCount(realmPublicKey: PublicKey, environment: Environment): Promise<number>;
    getTwitterFollowerCountForHandle(handle: string): Promise<number>;
    getCodeCommittedHubInfoForRealm(realmPublicKey: PublicKey, environment: Environment): Promise<{
        about: (Required<Pick<{
            content: import("../lib/types/RichTextDocument").RichTextDocument;
            heading: string;
        } & {
            content: import("../lib/types/RichTextDocument").RichTextDocument | undefined;
            heading?: string | undefined;
        }, "content">> & Partial<Omit<{
            content: import("../lib/types/RichTextDocument").RichTextDocument;
            heading: string;
        } & {
            content: import("../lib/types/RichTextDocument").RichTextDocument | undefined;
            heading?: string | undefined;
        }, "content">>)[];
        documentation: {
            title?: string | undefined;
            url?: string | undefined;
        } | undefined;
        faq: (Required<Pick<{
            answer: import("../lib/types/RichTextDocument").RichTextDocument;
            question: string;
        } & {
            answer: import("../lib/types/RichTextDocument").RichTextDocument | undefined;
            question?: string | undefined;
        }, "answer" | "question">> & Partial<Omit<{
            answer: import("../lib/types/RichTextDocument").RichTextDocument;
            question: string;
        } & {
            answer: import("../lib/types/RichTextDocument").RichTextDocument | undefined;
            question?: string | undefined;
        }, "answer" | "question">>)[];
        gallery: (Required<Pick<{
            url: string;
            caption: string;
            height: number;
            width: number;
        } & {
            url?: string | undefined;
            caption?: string | undefined;
            height?: number | undefined;
            width?: number | undefined;
        }, "url" | "height" | "width">> & Partial<Omit<{
            url: string;
            caption: string;
            height: number;
            width: number;
        } & {
            url?: string | undefined;
            caption?: string | undefined;
            height?: number | undefined;
            width?: number | undefined;
        }, "url" | "height" | "width">>)[];
        heading: import("../lib/types/RichTextDocument").RichTextDocument | undefined;
        resources: {
            content: import("../lib/types/RichTextDocument").RichTextDocument | undefined;
            title?: string | undefined;
            url?: string | undefined;
        }[];
        roadmap: {
            description: import("../lib/types/RichTextDocument").RichTextDocument | undefined;
            items: {
                date: Date | undefined;
                status: RealmHubInfoRoadmapItemStatus | undefined;
                title?: string | undefined;
                resource?: {
                    title?: string | undefined;
                    url?: string | undefined;
                } | undefined;
            }[];
        };
        symbol: string | undefined;
        team: {
            description: import("../lib/types/RichTextDocument").RichTextDocument | undefined;
            name?: string | undefined;
            avatar?: string | undefined;
            role?: string | undefined;
            twitter?: string | undefined;
        }[];
        token: {
            mint: PublicKey;
        } | undefined;
    } | {
        about: never[];
        documentation: undefined;
        faq: never[];
        gallery: never[];
        heading: undefined;
        resources: never[];
        roadmap: {
            description: undefined;
            items: never[];
        };
        symbol: undefined;
        team: never[];
        token?: undefined;
    }>;
    private getFollowerCount;
}
