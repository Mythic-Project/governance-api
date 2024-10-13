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
exports.RealmPostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const web3_js_1 = require("@solana/web3.js");
const AR = require("fp-ts/Array");
const EI = require("fp-ts/Either");
const FN = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const PathReporter_1 = require("io-ts/PathReporter");
const typeorm_2 = require("typeorm");
const errors = require("../lib/errors/gql");
const RichTextDocument_1 = require("../lib/ioTypes/RichTextDocument");
const RealmPost_entity_1 = require("./entities/RealmPost.entity");
const TITLE_LENGTH_LIMIT = 300;
let RealmPostService = class RealmPostService {
    constructor(realmPostRepository) {
        this.realmPostRepository = realmPostRepository;
    }
    createPost(realmPublicKey, title, document, requestingUser, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        if (title.length > TITLE_LENGTH_LIMIT) {
            return TE.left(new errors.MalformedRequest('Post title is too long'));
        }
        if (document.content.length === 0) {
            return TE.left(new errors.MalformedRequest('Post body cannot be empty'));
        }
        return FN.pipe(document, RichTextDocument_1.RichTextDocument.decode, TE.fromEither, TE.mapLeft((error) => new errors.MalformedRequest('Invalid document: ' + PathReporter_1.PathReporter.report(EI.left(error)).join('\n'))), TE.map((document) => this.realmPostRepository.create({
            authorId: requestingUser.id,
            data: {
                document,
                title,
            },
            environment,
            realmPublicKeyStr: realmPublicKey.toBase58(),
        })), TE.chainW((entity) => TE.tryCatch(() => this.realmPostRepository.save(entity), (e) => new errors.Exception(e))), TE.map((entity) => ({
            author: {
                publicKey: requestingUser.publicKey,
            },
            created: entity.created,
            document: entity.data.document,
            id: entity.id,
            title: entity.data.title,
            updated: entity.updated,
        })));
    }
    getPostsForRealmByIds(realmPublicKey, ids, requestingUser, environment) {
        if (environment === 'devnet') {
            return TE.left(new errors.UnsupportedDevnet());
        }
        return FN.pipe(TE.tryCatch(() => this.realmPostRepository.find({
            where: {
                environment,
                id: (0, typeorm_2.In)(ids),
                realmPublicKeyStr: realmPublicKey.toBase58(),
            },
            relations: ['author'],
        }), (e) => new errors.Exception(e)), TE.map(AR.map((entity) => ({
            author: {
                publicKey: new web3_js_1.PublicKey(entity.author.publicKeyStr),
            },
            created: entity.created,
            document: entity.data.document,
            id: entity.id,
            title: entity.data.title,
            updated: entity.updated,
        }))), TE.map(AR.reduce({}, (acc, post) => {
            acc[post.id] = post;
            return acc;
        })));
    }
};
RealmPostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(RealmPost_entity_1.RealmPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RealmPostService);
exports.RealmPostService = RealmPostService;
//# sourceMappingURL=realm-post.service.js.map