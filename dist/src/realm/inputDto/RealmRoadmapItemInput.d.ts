import { RealmRoadmapItemStatus } from '../dto/RealmRoadmapItemStatus';
import { RealmResourceInput } from './RealmResourceInput';
export declare class RealmRoadmapItemInput {
    date?: number;
    resource?: RealmResourceInput;
    status?: RealmRoadmapItemStatus;
    title: string;
}
