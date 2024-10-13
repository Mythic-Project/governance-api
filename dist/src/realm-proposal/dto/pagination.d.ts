import { RealmProposal } from './RealmProposal';
declare const RealmProposalEdge_base: abstract new (...args: any[]) => import("graphql-relay").Edge<RealmProposal>;
export declare class RealmProposalEdge extends RealmProposalEdge_base {
}
declare const RealmProposalConnection_base: abstract new (...args: any[]) => import("graphql-relay").Connection<RealmProposal>;
export declare class RealmProposalConnection extends RealmProposalConnection_base {
}
export declare enum RealmProposalSort {
    Alphabetical = "Alphabetical",
    Relevance = "Relevance",
    Time = "Time"
}
export {};
