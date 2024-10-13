"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemCommentSort = exports.RealmFeedItemCommentConnection = exports.RealmFeedItemCommentEdge = void 0;
const graphql_1 = require("@nestjs/graphql");
const Connection_1 = require("../../lib/gqlTypes/Connection");
const RealmFeedItemComment_1 = require("./RealmFeedItemComment");
let RealmFeedItemCommentEdge = class RealmFeedItemCommentEdge extends (0, Connection_1.EdgeType)('RealmFeedItemComment', RealmFeedItemComment_1.RealmFeedItemComment) {
};
RealmFeedItemCommentEdge = __decorate([
    (0, graphql_1.ObjectType)()
], RealmFeedItemCommentEdge);
exports.RealmFeedItemCommentEdge = RealmFeedItemCommentEdge;
let RealmFeedItemCommentConnection = class RealmFeedItemCommentConnection extends (0, Connection_1.ConnectionType)('RealmFeedItemComment', RealmFeedItemCommentEdge) {
};
RealmFeedItemCommentConnection = __decorate([
    (0, graphql_1.ObjectType)()
], RealmFeedItemCommentConnection);
exports.RealmFeedItemCommentConnection = RealmFeedItemCommentConnection;
var RealmFeedItemCommentSort;
(function (RealmFeedItemCommentSort) {
    RealmFeedItemCommentSort["New"] = "New";
    RealmFeedItemCommentSort["Relevance"] = "Relevance";
    RealmFeedItemCommentSort["TopAllTime"] = "TopAllTime";
})(RealmFeedItemCommentSort = exports.RealmFeedItemCommentSort || (exports.RealmFeedItemCommentSort = {}));
(0, graphql_1.registerEnumType)(RealmFeedItemCommentSort, {
    name: 'RealmFeedItemCommentSort',
    description: 'Sort order for a list of comments',
});
//# sourceMappingURL=pagination.js.map