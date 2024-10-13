"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemCommentVoteType = void 0;
const graphql_1 = require("@nestjs/graphql");
var RealmFeedItemCommentVoteType;
(function (RealmFeedItemCommentVoteType) {
    RealmFeedItemCommentVoteType["Approve"] = "Approve";
    RealmFeedItemCommentVoteType["Disapprove"] = "Disapprove";
})(RealmFeedItemCommentVoteType = exports.RealmFeedItemCommentVoteType || (exports.RealmFeedItemCommentVoteType = {}));
(0, graphql_1.registerEnumType)(RealmFeedItemCommentVoteType, {
    name: 'RealmFeedItemCommentVoteType',
    description: 'A vote on a comment',
    valuesMap: {
        [RealmFeedItemCommentVoteType.Approve]: {
            description: 'The comment was approved',
        },
        [RealmFeedItemCommentVoteType.Disapprove]: {
            description: 'The comment was disapproved',
        },
    },
});
//# sourceMappingURL=RealmFeedItemCommentVoteType.js.map