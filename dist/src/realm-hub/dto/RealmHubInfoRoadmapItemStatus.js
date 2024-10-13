"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmHubInfoRoadmapItemStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var RealmHubInfoRoadmapItemStatus;
(function (RealmHubInfoRoadmapItemStatus) {
    RealmHubInfoRoadmapItemStatus["Completed"] = "Completed";
    RealmHubInfoRoadmapItemStatus["Delayed"] = "Delayed";
    RealmHubInfoRoadmapItemStatus["InProgress"] = "InProgress";
    RealmHubInfoRoadmapItemStatus["Upcoming"] = "Upcoming";
})(RealmHubInfoRoadmapItemStatus = exports.RealmHubInfoRoadmapItemStatus || (exports.RealmHubInfoRoadmapItemStatus = {}));
(0, graphql_1.registerEnumType)(RealmHubInfoRoadmapItemStatus, {
    name: 'RealmHubInfoRoadmapItemStatus',
    description: 'A discriminant for differentiating the status of a roadmap item',
});
//# sourceMappingURL=RealmHubInfoRoadmapItemStatus.js.map