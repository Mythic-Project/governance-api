import { RealmCategory } from '../dto/RealmCategory';
import { RealmRoadmapItemStatus } from '../dto/RealmRoadmapItemStatus';
import { Environment } from '@lib/types/Environment';
import { RichTextDocument } from '@lib/types/RichTextDocument';
export interface Data {
    about: {
        heading?: string;
        content: RichTextDocument;
    }[];
    bannerImageUrl?: string;
    category: RealmCategory;
    discordUrl?: string;
    displayName: string;
    documentation?: {
        title?: string;
        url: string;
    };
    faq: {
        answer: RichTextDocument;
        question: string;
    }[];
    gallery: {
        caption: string;
        height: number;
        width: number;
        url: string;
    }[];
    githubUrl?: string;
    heading?: RichTextDocument;
    iconUrl?: string;
    instagramUrl?: string;
    linkedInUrl?: string;
    name: string;
    programPublicKeyStr?: string;
    roadmap: {
        description?: RichTextDocument;
        items: {
            date?: number;
            resource?: {
                content?: RichTextDocument;
                title: string;
                url: string;
            };
            status?: RealmRoadmapItemStatus;
            title: string;
        }[];
    };
    resources: {
        title: string;
        content?: RichTextDocument;
        url: string;
    }[];
    shortDescription?: string;
    team: {
        avatarUrl?: string;
        description?: RichTextDocument;
        linkedInHandle?: string;
        name: string;
        role?: string;
        twitterHandle?: string;
    }[];
    token?: {
        mintPublicKeyStr: string;
    };
    twitterHandle?: string;
    websiteUrl?: string;
}
export declare class Realm {
    id: number;
    data: Data;
    environment: Environment;
    publicKeyStr: string;
    symbol?: string;
    created: Date;
    deleted: Date;
    updated: Date;
}
