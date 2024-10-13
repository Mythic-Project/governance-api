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
exports.DiscoverPageSpotlightItemStat = void 0;
const graphql_1 = require("@nestjs/graphql");
let DiscoverPageSpotlightItemStat = class DiscoverPageSpotlightItemStat {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'The value to display for the stat',
    }),
    __metadata("design:type", String)
], DiscoverPageSpotlightItemStat.prototype, "value", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'A label for the stat',
    }),
    __metadata("design:type", String)
], DiscoverPageSpotlightItemStat.prototype, "label", void 0);
DiscoverPageSpotlightItemStat = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'Discover page spotlight item',
    })
], DiscoverPageSpotlightItemStat);
exports.DiscoverPageSpotlightItemStat = DiscoverPageSpotlightItemStat;
//# sourceMappingURL=DiscoverPageSpotlightItemStat.js.map