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
exports.ClippedRichTextDocument = void 0;
const graphql_1 = require("@nestjs/graphql");
const RichTextDocument_1 = require("../scalars/RichTextDocument");
let ClippedRichTextDocument = class ClippedRichTextDocument {
};
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'The clipped document',
    }),
    __metadata("design:type", Object)
], ClippedRichTextDocument.prototype, "document", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        description: 'Indicates whether the document was clipped. If the document is shorter than the given character count, it may not be clipped',
    }),
    __metadata("design:type", Boolean)
], ClippedRichTextDocument.prototype, "isClipped", void 0);
ClippedRichTextDocument = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A rich text document that has been clipped at a given character count',
    })
], ClippedRichTextDocument);
exports.ClippedRichTextDocument = ClippedRichTextDocument;
//# sourceMappingURL=ClippedRichTextDocument.js.map