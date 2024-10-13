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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmPostResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const EI = require("fp-ts/Either");
const FN = require("fp-ts/function");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const errors = require("../lib/errors/gql");
const ClippedRichTextDocument_1 = require("../lib/gqlTypes/ClippedRichTextDocument");
const clipRichTextDocument_1 = require("../lib/textManipulation/clipRichTextDocument");
const RealmPost_1 = require("./dto/RealmPost");
let RealmPostResolver = class RealmPostResolver {
    clippedDocument(charLimit = 400, attachmentLimit = 0, post) {
        return FN.pipe(EI.tryCatch(() => (0, clipRichTextDocument_1.clipRichTextDocument)(post.document, charLimit, attachmentLimit), (e) => new errors.Exception(e)));
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => ClippedRichTextDocument_1.ClippedRichTextDocument, {
        description: 'A clipped version of the post document',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)('charLimit', {
        type: () => graphql_1.Int,
        description: 'The character count to clip the document at',
        nullable: true,
        defaultValue: 400,
    })),
    __param(1, (0, graphql_1.Args)('attachmentLimit', {
        type: () => graphql_1.Int,
        description: 'The maximum number of attachments to include',
        nullable: true,
        defaultValue: 0,
    })),
    __param(2, (0, graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, RealmPost_1.RealmPost]),
    __metadata("design:returntype", void 0)
], RealmPostResolver.prototype, "clippedDocument", null);
RealmPostResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmPost_1.RealmPost)
], RealmPostResolver);
exports.RealmPostResolver = RealmPostResolver;
//# sourceMappingURL=realm-post.resolver.js.map