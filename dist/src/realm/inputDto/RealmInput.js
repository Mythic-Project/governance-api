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
exports.RealmInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const RealmCategory_1 = require("../dto/RealmCategory");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
const RealmAboutSectionInput_1 = require("./RealmAboutSectionInput");
const RealmDocumentationInput_1 = require("./RealmDocumentationInput");
const RealmFaqItemInput_1 = require("./RealmFaqItemInput");
const RealmGalleryItemInput_1 = require("./RealmGalleryItemInput");
const RealmResourceInput_1 = require("./RealmResourceInput");
const RealmRoadmapInput_1 = require("./RealmRoadmapInput");
const RealmTeamMemberInput_1 = require("./RealmTeamMemberInput");
const RealmTokenDetailsInput_1 = require("./RealmTokenDetailsInput");
let RealmInput = class RealmInput {
};
__decorate([
    (0, graphql_1.Field)(() => [RealmAboutSectionInput_1.RealmAboutSectionInput], {
        description: 'Long form text describing the Realm',
    }),
    __metadata("design:type", Array)
], RealmInput.prototype, "about", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "Url for the Realm's banner",
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "bannerImageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmCategory_1.RealmCategory, {
        description: 'Indicates what type of Realm this is',
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Discord link',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "discordUrl", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'The display name of the org',
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "displayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmDocumentationInput_1.RealmDocumentationInput, {
        description: 'Optional documentation for the Realm',
        nullable: true,
    }),
    __metadata("design:type", RealmDocumentationInput_1.RealmDocumentationInput)
], RealmInput.prototype, "documentation", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmFaqItemInput_1.RealmFaqItemInput], {
        description: 'Frequently asked questions in the Realm',
    }),
    __metadata("design:type", Array)
], RealmInput.prototype, "faq", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmGalleryItemInput_1.RealmGalleryItemInput], {
        description: 'A list of items in the gallery',
    }),
    __metadata("design:type", Array)
], RealmInput.prototype, "gallery", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Github link',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "githubUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'An optional tagline or heading for the Realm',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmInput.prototype, "heading", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "Url for the Realm's icon",
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "iconUrl", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Instagram url',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "instagramUrl", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'LinkedIn url',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "linkedInUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmResourceInput_1.RealmResourceInput], {
        description: 'A list of external resources relevant to the Realm',
    }),
    __metadata("design:type", Array)
], RealmInput.prototype, "resources", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmRoadmapInput_1.RealmRoadmapInput, {
        description: 'A roadmap for the Realm',
    }),
    __metadata("design:type", RealmRoadmapInput_1.RealmRoadmapInput)
], RealmInput.prototype, "roadmap", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'A short text description of the Realm',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "shortDescription", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Symbol for the Realm',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "symbol", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmTeamMemberInput_1.RealmTeamMemberInput], {
        description: 'A list of highlighted team members',
    }),
    __metadata("design:type", Array)
], RealmInput.prototype, "team", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmTokenDetailsInput_1.RealmTokenDetailsInput, {
        description: 'Optional associated token',
        nullable: true,
    }),
    __metadata("design:type", RealmTokenDetailsInput_1.RealmTokenDetailsInput)
], RealmInput.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Twitter handle for the Realm',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "twitterHandle", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Website url for the Realm',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmInput.prototype, "websiteUrl", void 0);
RealmInput = __decorate([
    (0, graphql_1.InputType)({
        description: 'An input for Realm fields',
    })
], RealmInput);
exports.RealmInput = RealmInput;
//# sourceMappingURL=RealmInput.js.map