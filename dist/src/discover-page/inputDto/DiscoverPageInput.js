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
exports.DiscoverPageInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const PublicKey_1 = require("../../lib/scalars/PublicKey");
const RealmFeedItemID_1 = require("../../lib/scalars/RealmFeedItemID");
const DiscoverPageSpotlightItemInput_1 = require("./DiscoverPageSpotlightItemInput");
let DiscoverPageInput = class DiscoverPageInput {
};
__decorate([
    (0, graphql_1.Field)(() => [PublicKey_1.PublicKeyScalar], {
        description: 'Notable DAO tooling orgs',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "daoTooling", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PublicKey_1.PublicKeyScalar], {
        description: 'Notable DeFi orgs',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "defi", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PublicKey_1.PublicKeyScalar], {
        description: 'Notable Gaming orgs',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "gaming", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PublicKey_1.PublicKeyScalar], {
        description: 'Hackathon winners',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "hackathonWinners", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmFeedItemID_1.RealmFeedItemIDScalar], {
        description: 'Key announcements',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "keyAnnouncements", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PublicKey_1.PublicKeyScalar], {
        description: 'Notable NFT Collections',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "nftCollections", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PublicKey_1.PublicKeyScalar], {
        description: 'Popular orgs',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "popular", void 0);
__decorate([
    (0, graphql_1.Field)(() => [DiscoverPageSpotlightItemInput_1.DiscoverPageSpotlightItemInput], {
        description: 'Spotlight items',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "spotlight", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PublicKey_1.PublicKeyScalar], {
        description: 'Trending orgs',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "trending", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PublicKey_1.PublicKeyScalar], {
        description: 'Notable Web3 orgs',
    }),
    __metadata("design:type", Array)
], DiscoverPageInput.prototype, "web3", void 0);
DiscoverPageInput = __decorate([
    (0, graphql_1.InputType)({
        description: 'Discover page data',
    })
], DiscoverPageInput);
exports.DiscoverPageInput = DiscoverPageInput;
//# sourceMappingURL=DiscoverPageInput.js.map