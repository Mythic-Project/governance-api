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
exports.RealmRoadmap = void 0;
const graphql_1 = require("@nestjs/graphql");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
const RealmRoadmapItem_1 = require("./RealmRoadmapItem");
let RealmRoadmap = class RealmRoadmap {
};
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'An optional description for the roadmap',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmRoadmap.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmRoadmapItem_1.RealmRoadmapItem], {
        description: 'The items on the roadmap',
    }),
    __metadata("design:type", Array)
], RealmRoadmap.prototype, "items", void 0);
RealmRoadmap = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'The roadmap for a Realm',
    })
], RealmRoadmap);
exports.RealmRoadmap = RealmRoadmap;
//# sourceMappingURL=RealmRoadmap.js.map