"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmProposalState = void 0;
const graphql_1 = require("@nestjs/graphql");
var RealmProposalState;
(function (RealmProposalState) {
    RealmProposalState["Cancelled"] = "Cancelled";
    RealmProposalState["Completed"] = "Completed";
    RealmProposalState["Defeated"] = "Defeated";
    RealmProposalState["Draft"] = "Draft";
    RealmProposalState["Executable"] = "Executable";
    RealmProposalState["ExecutingWithErrors"] = "ExecutingWithErrors";
    RealmProposalState["Finalizing"] = "Finalizing";
    RealmProposalState["SigningOff"] = "SigningOff";
    RealmProposalState["Voting"] = "Voting";
})(RealmProposalState = exports.RealmProposalState || (exports.RealmProposalState = {}));
(0, graphql_1.registerEnumType)(RealmProposalState, {
    name: 'RealmProposalState',
    description: 'Current state of a proposal',
});
//# sourceMappingURL=RealmProposalState.js.map