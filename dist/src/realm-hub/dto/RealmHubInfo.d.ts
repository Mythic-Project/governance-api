import { RichTextDocument } from '@src/lib/types/RichTextDocument';
import { RealmHubInfoAboutSection } from './RealmHubInfoAboutSection';
import { RealmHubInfoDocumentation } from './RealmHubInfoDocumentation';
import { RealmHubInfoFaqItem } from './RealmHubInfoFaqItem';
import { RealmHubInfoGalleryItem } from './RealmHubInfoGalleryItem';
import { RealmHubInfoResource } from './RealmHubInfoResource';
import { RealmHubInfoRoadmap } from './RealmHubInfoRoadmap';
import { RealmHubInfoTeamMember } from './RealmHubInfoTeamMember';
import { RealmHubInfoTokenDetails } from './RealmHubInfoTokenDetails';
export declare class RealmHubInfo {
    about: RealmHubInfoAboutSection[];
    documentation?: RealmHubInfoDocumentation;
    faq: RealmHubInfoFaqItem[];
    gallery: RealmHubInfoGalleryItem[];
    heading?: RichTextDocument;
    resources: RealmHubInfoResource[];
    roadmap: RealmHubInfoRoadmap;
    team: RealmHubInfoTeamMember[];
    token?: RealmHubInfoTokenDetails;
}
