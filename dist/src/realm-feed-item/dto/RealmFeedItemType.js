"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemType = void 0;
const graphql_1 = require("@nestjs/graphql");
var RealmFeedItemType;
(function (RealmFeedItemType) {
    RealmFeedItemType["Post"] = "Post";
    RealmFeedItemType["Proposal"] = "Proposal";
})(RealmFeedItemType = exports.RealmFeedItemType || (exports.RealmFeedItemType = {}));
(0, graphql_1.registerEnumType)(RealmFeedItemType, {
    name: 'RealmFeedItemType',
    description: 'A discriminant for differentiating between Realm Feed items',
    valuesMap: {
        [RealmFeedItemType.Post]: {
            description: 'A post feed item',
        },
        [RealmFeedItemType.Proposal]: {
            description: 'A proposal feed item',
        },
    },
});
//# sourceMappingURL=RealmFeedItemType.js.map