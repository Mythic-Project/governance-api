"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemSort = exports.RealmFeedItemConnection = exports.RealmFeedItemEdge = void 0;
const graphql_1 = require("@nestjs/graphql");
const Connection_1 = require("../../lib/gqlTypes/Connection");
const RealmFeedItem_1 = require("./RealmFeedItem");
let RealmFeedItemEdge = class RealmFeedItemEdge extends (0, Connection_1.EdgeType)('RealmFeedItem', RealmFeedItem_1.RealmFeedItem) {
};
RealmFeedItemEdge = __decorate([
    (0, graphql_1.ObjectType)()
], RealmFeedItemEdge);
exports.RealmFeedItemEdge = RealmFeedItemEdge;
let RealmFeedItemConnection = class RealmFeedItemConnection extends (0, Connection_1.ConnectionType)('RealmFeedItem', RealmFeedItemEdge) {
};
RealmFeedItemConnection = __decorate([
    (0, graphql_1.ObjectType)()
], RealmFeedItemConnection);
exports.RealmFeedItemConnection = RealmFeedItemConnection;
var RealmFeedItemSort;
(function (RealmFeedItemSort) {
    RealmFeedItemSort["New"] = "New";
    RealmFeedItemSort["Relevance"] = "Relevance";
    RealmFeedItemSort["TopAllTime"] = "TopAllTime";
})(RealmFeedItemSort = exports.RealmFeedItemSort || (exports.RealmFeedItemSort = {}));
(0, graphql_1.registerEnumType)(RealmFeedItemSort, {
    name: 'RealmFeedItemSort',
    description: 'Sort order for a list of Realm feed items',
});
//# sourceMappingURL=pagination.js.map