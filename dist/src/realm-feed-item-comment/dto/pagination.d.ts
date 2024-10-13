declare const RealmFeedItemCommentEdge_base: abstract new (...args: any[]) => import("graphql-relay").Edge<unknown>;
export declare class RealmFeedItemCommentEdge extends RealmFeedItemCommentEdge_base {
}
declare const RealmFeedItemCommentConnection_base: abstract new (...args: any[]) => import("graphql-relay").Connection<unknown>;
export declare class RealmFeedItemCommentConnection extends RealmFeedItemCommentConnection_base {
}
export declare enum RealmFeedItemCommentSort {
    New = "New",
    Relevance = "Relevance",
    TopAllTime = "TopAllTime"
}
export {};
