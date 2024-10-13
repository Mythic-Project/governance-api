"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmProposalSort = exports.RealmProposalConnection = exports.RealmProposalEdge = void 0;
const graphql_1 = require("@nestjs/graphql");
const Connection_1 = require("../../lib/gqlTypes/Connection");
const RealmProposal_1 = require("./RealmProposal");
let RealmProposalEdge = class RealmProposalEdge extends (0, Connection_1.EdgeType)('RealmProposal', RealmProposal_1.RealmProposal) {
};
RealmProposalEdge = __decorate([
    (0, graphql_1.ObjectType)()
], RealmProposalEdge);
exports.RealmProposalEdge = RealmProposalEdge;
let RealmProposalConnection = class RealmProposalConnection extends (0, Connection_1.ConnectionType)('RealmProposal', RealmProposalEdge) {
};
RealmProposalConnection = __decorate([
    (0, graphql_1.ObjectType)()
], RealmProposalConnection);
exports.RealmProposalConnection = RealmProposalConnection;
var RealmProposalSort;
(function (RealmProposalSort) {
    RealmProposalSort["Alphabetical"] = "Alphabetical";
    RealmProposalSort["Relevance"] = "Relevance";
    RealmProposalSort["Time"] = "Time";
})(RealmProposalSort = exports.RealmProposalSort || (exports.RealmProposalSort = {}));
(0, graphql_1.registerEnumType)(RealmProposalSort, {
    name: 'RealmProposalSort',
    description: 'Sort order for a list of Realm proposals',
});
//# sourceMappingURL=pagination.js.map