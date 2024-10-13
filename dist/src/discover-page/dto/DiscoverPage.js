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
exports.DiscoverPage = void 0;
const graphql_1 = require("@nestjs/graphql");
const RealmFeedItem_1 = require("../../realm-feed-item/dto/RealmFeedItem");
const Realm_1 = require("../../realm/dto/Realm");
const DiscoverPageSpotlightItem_1 = require("./DiscoverPageSpotlightItem");
let DiscoverPage = class DiscoverPage {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'The version number for the Discover page',
    }),
    __metadata("design:type", Number)
], DiscoverPage.prototype, "version", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Realm_1.Realm], {
        description: 'Notable orgs in DAO Tooling',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "daoTooling", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Realm_1.Realm], {
        description: 'Notable orgs in DeFi',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "defi", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Realm_1.Realm], {
        description: 'Notable orgs in Gaming',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "gaming", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Realm_1.Realm], {
        description: 'Orgs that won the Hackathon',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "hackathonWinners", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmFeedItem_1.RealmFeedItem], {
        description: 'A list of key announcement feed items',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "keyAnnouncements", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Realm_1.Realm], {
        description: 'Notable NFT Collection orgs',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "nftCollections", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Realm_1.Realm], {
        description: 'Popular orgs',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "popular", void 0);
__decorate([
    (0, graphql_1.Field)(() => [DiscoverPageSpotlightItem_1.DiscoverPageSpotlightItem], {
        description: 'A list of orgs to display in the spotlight',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "spotlight", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Realm_1.Realm], {
        description: 'Orgs that are trending',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "trending", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Realm_1.Realm], {
        description: 'Notable orgs in Web3',
    }),
    __metadata("design:type", Array)
], DiscoverPage.prototype, "web3", void 0);
DiscoverPage = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'Discover page information',
    })
], DiscoverPage);
exports.DiscoverPage = DiscoverPage;
//# sourceMappingURL=DiscoverPage.js.map