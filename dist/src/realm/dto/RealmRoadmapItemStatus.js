"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmRoadmapItemStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var RealmRoadmapItemStatus;
(function (RealmRoadmapItemStatus) {
    RealmRoadmapItemStatus["Completed"] = "Completed";
    RealmRoadmapItemStatus["Delayed"] = "Delayed";
    RealmRoadmapItemStatus["InProgress"] = "InProgress";
    RealmRoadmapItemStatus["Upcoming"] = "Upcoming";
})(RealmRoadmapItemStatus = exports.RealmRoadmapItemStatus || (exports.RealmRoadmapItemStatus = {}));
(0, graphql_1.registerEnumType)(RealmRoadmapItemStatus, {
    name: 'RealmRoadmapItemStatus',
    description: 'A discriminant for differentiating the status of a roadmap item',
});
//# sourceMappingURL=RealmRoadmapItemStatus.js.map