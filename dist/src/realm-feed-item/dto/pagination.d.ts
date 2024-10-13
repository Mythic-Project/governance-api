declare const RealmFeedItemEdge_base: abstract new (...args: any[]) => import("graphql-relay").Edge<unknown>;
export declare class RealmFeedItemEdge extends RealmFeedItemEdge_base {
}
declare const RealmFeedItemConnection_base: abstract new (...args: any[]) => import("graphql-relay").Connection<unknown>;
export declare class RealmFeedItemConnection extends RealmFeedItemConnection_base {
}
export declare enum RealmFeedItemSort {
    New = "New",
    Relevance = "Relevance",
    TopAllTime = "TopAllTime"
}
export {};
