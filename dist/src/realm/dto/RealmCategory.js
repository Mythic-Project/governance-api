"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmCategory = void 0;
const graphql_1 = require("@nestjs/graphql");
var RealmCategory;
(function (RealmCategory) {
    RealmCategory["DAOTools"] = "DAOTools";
    RealmCategory["Defi"] = "Defi";
    RealmCategory["Gaming"] = "Gaming";
    RealmCategory["Nft"] = "Nft";
    RealmCategory["Web3"] = "Web3";
    RealmCategory["Other"] = "Other";
})(RealmCategory = exports.RealmCategory || (exports.RealmCategory = {}));
(0, graphql_1.registerEnumType)(RealmCategory, {
    name: 'RealmCategory',
    description: 'A descriptor that indicates the type of the Realm',
    valuesMap: {
        [RealmCategory.DAOTools]: {
            description: 'A Realm that builds tooling for DAOs',
        },
        [RealmCategory.Defi]: {
            description: 'A Realm that operates in the DeFi space',
        },
        [RealmCategory.Gaming]: {
            description: 'A Realm that builds games',
        },
        [RealmCategory.Nft]: {
            description: 'A Realm that operates an NFT Collection',
        },
        [RealmCategory.Web3]: {
            description: 'A Realm that builds web3 tech',
        },
        [RealmCategory.Other]: {
            description: 'A Realm that does not fit into any other category',
        },
    },
});
//# sourceMappingURL=RealmCategory.js.map