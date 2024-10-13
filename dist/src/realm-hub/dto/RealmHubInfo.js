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
exports.RealmHubInfo = void 0;
const graphql_1 = require("@nestjs/graphql");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
const RealmHubInfoAboutSection_1 = require("./RealmHubInfoAboutSection");
const RealmHubInfoDocumentation_1 = require("./RealmHubInfoDocumentation");
const RealmHubInfoFaqItem_1 = require("./RealmHubInfoFaqItem");
const RealmHubInfoGalleryItem_1 = require("./RealmHubInfoGalleryItem");
const RealmHubInfoResource_1 = require("./RealmHubInfoResource");
const RealmHubInfoRoadmap_1 = require("./RealmHubInfoRoadmap");
const RealmHubInfoTeamMember_1 = require("./RealmHubInfoTeamMember");
const RealmHubInfoTokenDetails_1 = require("./RealmHubInfoTokenDetails");
let RealmHubInfo = class RealmHubInfo {
};
__decorate([
    (0, graphql_1.Field)(() => [RealmHubInfoAboutSection_1.RealmHubInfoAboutSection], {
        description: 'Long form text describing the Realm',
    }),
    __metadata("design:type", Array)
], RealmHubInfo.prototype, "about", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmHubInfoDocumentation_1.RealmHubInfoDocumentation, {
        description: 'Optional documentation for the Realm',
        nullable: true,
    }),
    __metadata("design:type", RealmHubInfoDocumentation_1.RealmHubInfoDocumentation)
], RealmHubInfo.prototype, "documentation", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmHubInfoFaqItem_1.RealmHubInfoFaqItem], {
        description: 'Frequently asked questions in the Realm',
    }),
    __metadata("design:type", Array)
], RealmHubInfo.prototype, "faq", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmHubInfoGalleryItem_1.RealmHubInfoGalleryItem], {
        description: 'A list of items in the gallery',
    }),
    __metadata("design:type", Array)
], RealmHubInfo.prototype, "gallery", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'An optional tagline or heading for the Realm',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmHubInfo.prototype, "heading", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmHubInfoResource_1.RealmHubInfoResource], {
        description: 'A list of external resources relevant to the Realm',
    }),
    __metadata("design:type", Array)
], RealmHubInfo.prototype, "resources", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmHubInfoRoadmap_1.RealmHubInfoRoadmap, {
        description: 'A roadmap for the Realm',
    }),
    __metadata("design:type", RealmHubInfoRoadmap_1.RealmHubInfoRoadmap)
], RealmHubInfo.prototype, "roadmap", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmHubInfoTeamMember_1.RealmHubInfoTeamMember], {
        description: 'A list of highlighted team members',
    }),
    __metadata("design:type", Array)
], RealmHubInfo.prototype, "team", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmHubInfoTokenDetails_1.RealmHubInfoTokenDetails, {
        description: 'Optional associated token',
        nullable: true,
    }),
    __metadata("design:type", RealmHubInfoTokenDetails_1.RealmHubInfoTokenDetails)
], RealmHubInfo.prototype, "token", void 0);
RealmHubInfo = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'Information about a Realm',
    })
], RealmHubInfo);
exports.RealmHubInfo = RealmHubInfo;
//# sourceMappingURL=RealmHubInfo.js.map