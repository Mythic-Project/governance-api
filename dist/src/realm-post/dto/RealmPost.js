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
exports.RealmPost = void 0;
const graphql_1 = require("@nestjs/graphql");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
const RealmMember_1 = require("../../realm-member/dto/RealmMember");
let RealmPost = class RealmPost {
};
__decorate([
    (0, graphql_1.Field)(() => RealmMember_1.RealmMember, {
        description: 'The creator of the post',
    }),
    __metadata("design:type", RealmMember_1.RealmMember)
], RealmPost.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'Creation timestamp',
    }),
    __metadata("design:type", Date)
], RealmPost.prototype, "created", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'Post body text',
    }),
    __metadata("design:type", Object)
], RealmPost.prototype, "document", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {
        description: 'A unique identifier for the post',
    }),
    __metadata("design:type", String)
], RealmPost.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Title for the post',
    }),
    __metadata("design:type", String)
], RealmPost.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'Update timestamp',
    }),
    __metadata("design:type", Date)
], RealmPost.prototype, "updated", void 0);
RealmPost = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A post in a Realm',
    })
], RealmPost);
exports.RealmPost = RealmPost;
//# sourceMappingURL=RealmPost.js.map