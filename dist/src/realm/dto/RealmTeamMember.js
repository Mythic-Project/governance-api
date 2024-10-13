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
exports.RealmTeamMember = void 0;
const graphql_1 = require("@nestjs/graphql");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
let RealmTeamMember = class RealmTeamMember {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'An optional url pointing to an avatar for the team member',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmTeamMember.prototype, "avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'Optional text describing the team member',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmTeamMember.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "The team member's linked in profile url",
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmTeamMember.prototype, "linkedIn", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "The team member's name",
    }),
    __metadata("design:type", String)
], RealmTeamMember.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "An optional title for the member's role",
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmTeamMember.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "The team member's twitter handle",
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmTeamMember.prototype, "twitter", void 0);
RealmTeamMember = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A project team member highlighted in the Hub of a Realm',
    })
], RealmTeamMember);
exports.RealmTeamMember = RealmTeamMember;
//# sourceMappingURL=RealmTeamMember.js.map