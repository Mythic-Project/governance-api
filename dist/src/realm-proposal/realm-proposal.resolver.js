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
exports.RealmProposalResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const EI = require("fp-ts/Either");
const FN = require("fp-ts/function");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const CurrentUser_1 = require("../lib/decorators/CurrentUser");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const errors = require("../lib/errors/gql");
const Connection_1 = require("../lib/gqlTypes/Connection");
const PublicKey_1 = require("../lib/scalars/PublicKey");
const ClippedRichTextDocument_1 = require("../lib/gqlTypes/ClippedRichTextDocument");
const clipRichTextDocument_1 = require("../lib/textManipulation/clipRichTextDocument");
const pagination_1 = require("./dto/pagination");
const RealmProposal_1 = require("./dto/RealmProposal");
const realm_proposal_gql_service_1 = require("./realm-proposal.gql.service");
let RealmProposalResolver = class RealmProposalResolver {
    constructor(realmProposalGQLService) {
        this.realmProposalGQLService = realmProposalGQLService;
    }
    clippedDocument(charLimit = 400, attachmentLimit = 0, proposal) {
        return FN.pipe(EI.tryCatch(() => (0, clipRichTextDocument_1.clipRichTextDocument)(proposal.document, charLimit, attachmentLimit), (e) => new errors.Exception(e)));
    }
    proposals(args, realm, sort = pagination_1.RealmProposalSort.Alphabetical, environment, user) {
        return this.realmProposalGQLService.getGQLProposalList(realm, user ? user.publicKey : null, sort, environment, args.after, args.before, args.first, args.last);
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
    __metadata("design:paramtypes", [Object, Object, RealmProposal_1.RealmProposal]),
    __metadata("design:returntype", void 0)
], RealmProposalResolver.prototype, "clippedDocument", null);
__decorate([
    (0, graphql_1.Query)(() => pagination_1.RealmProposalConnection, {
        description: 'A list of proposals for a Realm',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)('realm', {
        description: 'Public key of the Realm',
        type: () => PublicKey_1.PublicKeyScalar,
    })),
    __param(2, (0, graphql_1.Args)('sort', {
        type: () => pagination_1.RealmProposalSort,
        description: 'Sort order for the list',
        defaultValue: pagination_1.RealmProposalSort.Time,
        nullable: true,
    })),
    __param(3, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(4, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs,
        web3_js_1.PublicKey, String, String, Object]),
    __metadata("design:returntype", void 0)
], RealmProposalResolver.prototype, "proposals", null);
RealmProposalResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmProposal_1.RealmProposal),
    __metadata("design:paramtypes", [realm_proposal_gql_service_1.RealmProposalGQLService])
], RealmProposalResolver);
exports.RealmProposalResolver = RealmProposalResolver;
//# sourceMappingURL=realm-proposal.resolver.js.map