"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmHubInfoRoadmapItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const RealmHubInfoResource_1 = require("./RealmHubInfoResource");
const RealmHubInfoRoadmapItemStatus_1 = require("./RealmHubInfoRoadmapItemStatus");
let RealmHubInfoRoadmapItem = class RealmHubInfoRoadmapItem {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'When the roadmap item is expected to be completed',
        nullable: true,
    }),
    __metadata("design:type", Date)
], RealmHubInfoRoadmapItem.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmHubInfoResource_1.RealmHubInfoResource, {
        description: 'An associated external resource for the item',
        nullable: true,
    }),
    __metadata("design:type", RealmHubInfoResource_1.RealmHubInfoResource)
], RealmHubInfoRoadmapItem.prototype, "resource", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmHubInfoRoadmapItemStatus_1.RealmHubInfoRoadmapItemStatus, {
        description: 'The current status of the roadmap item',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmHubInfoRoadmapItem.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'A label for the item',
    }),
    __metadata("design:type", String)
], RealmHubInfoRoadmapItem.prototype, "title", void 0);
RealmHubInfoRoadmapItem = __decorate([
    (0, graphql_1.ObjectType)({
        description: "An item in a Realm's roadmap",
    })
], RealmHubInfoRoadmapItem);
exports.RealmHubInfoRoadmapItem = RealmHubInfoRoadmapItem;
//# sourceMappingURL=RealmHubInfoRoadmapItem.js.map