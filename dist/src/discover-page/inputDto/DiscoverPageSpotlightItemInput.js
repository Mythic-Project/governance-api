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
exports.DiscoverPageSpotlightItemInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const PublicKey_1 = require("../../lib/scalars/PublicKey");
const DiscoverPageSpotlightItemStatInput_1 = require("./DiscoverPageSpotlightItemStatInput");
let DiscoverPageSpotlightItemInput = class DiscoverPageSpotlightItemInput {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'Hero image for the spotlight',
    }),
    __metadata("design:type", String)
], DiscoverPageSpotlightItemInput.prototype, "heroImageUrl", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'Title',
    }),
    __metadata("design:type", String)
], DiscoverPageSpotlightItemInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'PublicKey of the realm',
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], DiscoverPageSpotlightItemInput.prototype, "publicKey", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'A description for the Spotlight',
    }),
    __metadata("design:type", String)
], DiscoverPageSpotlightItemInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => [DiscoverPageSpotlightItemStatInput_1.DiscoverPageSpotlightItemStatInput], {
        description: 'A list of stats to display',
    }),
    __metadata("design:type", Array)
], DiscoverPageSpotlightItemInput.prototype, "stats", void 0);
DiscoverPageSpotlightItemInput = __decorate([
    (0, graphql_1.InputType)({
        description: 'Discover page spotlight item',
    })
], DiscoverPageSpotlightItemInput);
exports.DiscoverPageSpotlightItemInput = DiscoverPageSpotlightItemInput;
//# sourceMappingURL=DiscoverPageSpotlightItemInput.js.map