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
exports.RealmHubInfoFaqItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
let RealmHubInfoFaqItem = class RealmHubInfoFaqItem {
};
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'The answer to a FAQ item question',
    }),
    __metadata("design:type", Object)
], RealmHubInfoFaqItem.prototype, "answer", void 0);
__decorate([
    (0, graphql_1.Field)({
        description: 'The question being asked in the FAQ item',
    }),
    __metadata("design:type", String)
], RealmHubInfoFaqItem.prototype, "question", void 0);
RealmHubInfoFaqItem = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A single FAQ item in the Realm Hub',
    })
], RealmHubInfoFaqItem);
exports.RealmHubInfoFaqItem = RealmHubInfoFaqItem;
//# sourceMappingURL=RealmHubInfoFaqItem.js.map