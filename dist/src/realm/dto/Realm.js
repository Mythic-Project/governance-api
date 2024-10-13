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
exports.Realm = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const PublicKey_1 = require("../../lib/scalars/PublicKey");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
const RealmAboutSection_1 = require("./RealmAboutSection");
const RealmCategory_1 = require("./RealmCategory");
const RealmDocumentation_1 = require("./RealmDocumentation");
const RealmFaqItem_1 = require("./RealmFaqItem");
const RealmGalleryItem_1 = require("./RealmGalleryItem");
const RealmResource_1 = require("./RealmResource");
const RealmRoadmap_1 = require("./RealmRoadmap");
const RealmTeamMember_1 = require("./RealmTeamMember");
const RealmTokenDetails_1 = require("./RealmTokenDetails");
let Realm = class Realm {
};
__decorate([
    (0, graphql_1.Field)(() => [RealmAboutSection_1.RealmAboutSection], {
        description: 'Long form text describing the Realm',
    }),
    __metadata("design:type", Array)
], Realm.prototype, "about", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "Url for the Realm's banner",
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "bannerImageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmCategory_1.RealmCategory, {
        description: 'Indicates what type of Realm this is',
    }),
    __metadata("design:type", String)
], Realm.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Discord link',
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "discordUrl", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'The display name of the org',
    }),
    __metadata("design:type", String)
], Realm.prototype, "displayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmDocumentation_1.RealmDocumentation, {
        description: 'Optional documentation for the Realm',
        nullable: true,
    }),
    __metadata("design:type", RealmDocumentation_1.RealmDocumentation)
], Realm.prototype, "documentation", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmFaqItem_1.RealmFaqItem], {
        description: 'Frequently asked questions in the Realm',
    }),
    __metadata("design:type", Array)
], Realm.prototype, "faq", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmGalleryItem_1.RealmGalleryItem], {
        description: 'A list of items in the gallery',
    }),
    __metadata("design:type", Array)
], Realm.prototype, "gallery", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Github link',
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "githubUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'An optional tagline or heading for the Realm',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Realm.prototype, "heading", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: "Url for the Realm's icon",
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "iconUrl", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Instagram url',
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "instagramUrl", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'LinkedIn url',
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "linkedInUrl", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Name of the Realm',
    }),
    __metadata("design:type", String)
], Realm.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'Public key of the governance program the Realm uses',
        nullable: true,
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], Realm.prototype, "programPublicKey", void 0);
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'Public Key address for the Realm',
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], Realm.prototype, "publicKey", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmResource_1.RealmResource], {
        description: 'A list of external resources relevant to the Realm',
    }),
    __metadata("design:type", Array)
], Realm.prototype, "resources", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmRoadmap_1.RealmRoadmap, {
        description: 'A roadmap for the Realm',
    }),
    __metadata("design:type", RealmRoadmap_1.RealmRoadmap)
], Realm.prototype, "roadmap", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'A short text description of the Realm',
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "shortDescription", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Symbol for the Realm',
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "symbol", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmTeamMember_1.RealmTeamMember], {
        description: 'A list of highlighted team members',
    }),
    __metadata("design:type", Array)
], Realm.prototype, "team", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmTokenDetails_1.RealmTokenDetails, {
        description: 'Optional associated token',
        nullable: true,
    }),
    __metadata("design:type", RealmTokenDetails_1.RealmTokenDetails)
], Realm.prototype, "token", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Twitter handle for the Realm',
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "twitterHandle", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'The url id representation of the realm',
    }),
    __metadata("design:type", String)
], Realm.prototype, "urlId", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Website url for the Realm',
        nullable: true,
    }),
    __metadata("design:type", String)
], Realm.prototype, "websiteUrl", void 0);
Realm = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A Realm',
    })
], Realm);
exports.Realm = Realm;
//# sourceMappingURL=Realm.js.map