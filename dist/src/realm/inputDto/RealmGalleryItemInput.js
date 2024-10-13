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
exports.RealmGalleryItemInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let RealmGalleryItemInput = class RealmGalleryItemInput {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'An optional caption for the item',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmGalleryItemInput.prototype, "caption", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'The height of the item',
    }),
    __metadata("design:type", Number)
], RealmGalleryItemInput.prototype, "height", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'The width of the item',
    }),
    __metadata("design:type", Number)
], RealmGalleryItemInput.prototype, "width", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'A url for the item',
    }),
    __metadata("design:type", String)
], RealmGalleryItemInput.prototype, "url", void 0);
RealmGalleryItemInput = __decorate([
    (0, graphql_1.InputType)({
        description: 'An item in the gallery',
    })
], RealmGalleryItemInput);
exports.RealmGalleryItemInput = RealmGalleryItemInput;
//# sourceMappingURL=RealmGalleryItemInput.js.map