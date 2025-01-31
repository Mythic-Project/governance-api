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
exports.RealmAboutSectionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
let RealmAboutSectionInput = class RealmAboutSectionInput {
};
__decorate([
    (0, graphql_1.Field)({
        description: 'An optional title for the section',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmAboutSectionInput.prototype, "heading", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'A rich text document containing the body of the section',
    }),
    __metadata("design:type", Object)
], RealmAboutSectionInput.prototype, "content", void 0);
RealmAboutSectionInput = __decorate([
    (0, graphql_1.InputType)({
        description: "A single section in a Realm's hub info",
    })
], RealmAboutSectionInput);
exports.RealmAboutSectionInput = RealmAboutSectionInput;
//# sourceMappingURL=RealmAboutSectionInput.js.map