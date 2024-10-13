import { PublicKey } from '@solana/web3.js';
import { Environment } from '@lib/decorators/CurrentEnvironment';
import { RealmTreasuryService } from '@src/realm-treasury/realm-treasury.service';
import { RealmHub } from './dto/RealmHub';
import { RealmHubInfo } from './dto/RealmHubInfo';
import { RealmHubInfoFaqItem } from './dto/RealmHubInfoFaqItem';
import { RealmHubInfoTeamMember } from './dto/RealmHubInfoTeamMember';
import { RealmHubInfoTokenDetails } from './dto/RealmHubInfoTokenDetails';
import { RealmHubService } from './realm-hub.service';
export declare class RealmHubResolver {
    private readonly realmHubService;
    constructor(realmHubService: RealmHubService);
    info(hub: RealmHub, environment: Environment): Promise<{
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
                status: import("./dto/RealmHubInfoRoadmapItemStatus").RealmHubInfoRoadmapItemStatus | undefined;
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
    twitterFollowerCount(hub: RealmHub, environment: Environment): Promise<number>;
    hub(realm: PublicKey): {
        realm: PublicKey;
    };
}
export declare class RealmHubInfoResolver {
    clippedHeading(hub: RealmHubInfo, charLimit?: number, attachmentLimit?: number): {
        document: import("../lib/types/RichTextDocument").RichTextDocument;
        isClipped: boolean;
    } | undefined;
}
export declare class RealmHubInfoFaqItemResolver {
    clippedAnswer(faqItem: RealmHubInfoFaqItem, charLimit?: number, attachmentLimit?: number): {
        document: import("../lib/types/RichTextDocument").RichTextDocument;
        isClipped: boolean;
    };
}
export declare class RealmHubInfoTokenDetailsResolver {
    private readonly realmHubService;
    private readonly realmTreasuryService;
    constructor(realmHubService: RealmHubService, realmTreasuryService: RealmTreasuryService);
    price(token: RealmHubInfoTokenDetails, environment: Environment): Promise<number>;
    symbol(token: RealmHubInfoTokenDetails, environment: Environment): Promise<string>;
}
export declare class RealmHubInfoTeamMemberResolver {
    private readonly realmHubService;
    constructor(realmHubService: RealmHubService);
    twitterFollowerCount(member: RealmHubInfoTeamMember): 0 | Promise<number>;
}
