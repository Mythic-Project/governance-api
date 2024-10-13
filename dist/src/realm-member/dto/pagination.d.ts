import { RealmMember } from './RealmMember';
declare const RealmMemberEdge_base: abstract new (...args: any[]) => import("graphql-relay").Edge<RealmMember>;
export declare class RealmMemberEdge extends RealmMemberEdge_base {
}
declare const RealmMemberConnection_base: abstract new (...args: any[]) => import("graphql-relay").Connection<RealmMember>;
export declare class RealmMemberConnection extends RealmMemberConnection_base {
}
export declare enum RealmMemberSort {
    Alphabetical = "Alphabetical"
}
export {};
