"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemVoteType = void 0;
const graphql_1 = require("@nestjs/graphql");
var RealmFeedItemVoteType;
(function (RealmFeedItemVoteType) {
    RealmFeedItemVoteType["Approve"] = "Approve";
    RealmFeedItemVoteType["Disapprove"] = "Disapprove";
})(RealmFeedItemVoteType = exports.RealmFeedItemVoteType || (exports.RealmFeedItemVoteType = {}));
(0, graphql_1.registerEnumType)(RealmFeedItemVoteType, {
    name: 'RealmFeedItemVoteType',
    description: 'A vote on a feed item',
    valuesMap: {
        [RealmFeedItemVoteType.Approve]: {
            description: 'The feed item was approved',
        },
        [RealmFeedItemVoteType.Disapprove]: {
            description: 'The feed item was disapproved',
        },
    },
});
//# sourceMappingURL=RealmFeedItemVoteType.js.map