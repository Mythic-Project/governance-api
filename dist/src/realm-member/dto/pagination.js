"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmMemberSort = exports.RealmMemberConnection = exports.RealmMemberEdge = void 0;
const graphql_1 = require("@nestjs/graphql");
const Connection_1 = require("../../lib/gqlTypes/Connection");
const RealmMember_1 = require("./RealmMember");
let RealmMemberEdge = class RealmMemberEdge extends (0, Connection_1.EdgeType)('RealmMember', RealmMember_1.RealmMember) {
};
RealmMemberEdge = __decorate([
    (0, graphql_1.ObjectType)()
], RealmMemberEdge);
exports.RealmMemberEdge = RealmMemberEdge;
let RealmMemberConnection = class RealmMemberConnection extends (0, Connection_1.ConnectionType)('RealmMember', RealmMemberEdge) {
};
RealmMemberConnection = __decorate([
    (0, graphql_1.ObjectType)()
], RealmMemberConnection);
exports.RealmMemberConnection = RealmMemberConnection;
var RealmMemberSort;
(function (RealmMemberSort) {
    RealmMemberSort["Alphabetical"] = "Alphabetical";
})(RealmMemberSort = exports.RealmMemberSort || (exports.RealmMemberSort = {}));
(0, graphql_1.registerEnumType)(RealmMemberSort, {
    name: 'RealmMemberSort',
    description: 'Sort order for a list of Realm members',
});
//# sourceMappingURL=pagination.js.map