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
exports.AuthService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const web3_js_1 = require("@solana/web3.js");
const date_fns_1 = require("date-fns");
const AR = require("fp-ts/Array");
const EI = require("fp-ts/Either");
const FN = require("fp-ts/function");
const OP = require("fp-ts/Option");
const TE = require("fp-ts/TaskEither");
const IT = require("io-ts");
const nacl = require("tweetnacl");
const typeorm_2 = require("typeorm");
const base64 = require("../lib/base64");
const errors = require("../lib/errors/gql");
const user_service_1 = require("../user/user.service");
const Auth_entity_1 = require("./entities/Auth.entity");
const AuthClaim_entity_1 = require("./entities/AuthClaim.entity");
const ClaimSentToClientCodec = IT.type({
    onBehalfOf: IT.string,
    nonce: IT.string,
    created: IT.number,
});
let AuthService = class AuthService {
    constructor(authRepository, authClaimRepository, jwtService, userService) {
        this.authRepository = authRepository;
        this.authClaimRepository = authClaimRepository;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    createAuthForPublicKey(publicKey) {
        return FN.pipe(this.authRepository.create({ data: {}, publicKeyStr: publicKey.toBase58() }), (auth) => TE.tryCatch(() => this.authRepository.save(auth), (error) => new errors.Exception(error)));
    }
    destroyExistingClaims(publicKey) {
        return FN.pipe(TE.tryCatch(() => this.authClaimRepository.delete({ onBehalfOf: publicKey.toBase58() }), (error) => new errors.Exception(error)), TE.map(() => true));
    }
    extractClaimFromClaimStr(claimStr) {
        return FN.pipe(claimStr, (str) => str.split(' '), AR.last, EI.fromOption(() => new errors.MalformedData()), EI.chain((payload) => EI.tryCatch(() => base64.decode(payload), () => new errors.MalformedData())), EI.chain((payload) => EI.tryCatch(() => JSON.parse(payload), () => new errors.MalformedData())), EI.chainW(ClaimSentToClientCodec.decode), EI.map((clientClaim) => ({
            onBehalfOf: new web3_js_1.PublicKey(clientClaim.onBehalfOf),
            nonce: clientClaim.nonce,
            created: new Date(clientClaim.created),
        })));
    }
    generateJWT(user) {
        return this.jwtService.sign({ sub: user.id });
    }
    getAuthById(id) {
        return FN.pipe(TE.tryCatch(() => this.authRepository.findOne({ where: { id } }), (error) => new errors.Exception(error)), TE.map((auth) => (auth ? OP.some(auth) : OP.none)));
    }
    getAuthByPublicKey(publicKey) {
        return FN.pipe(TE.tryCatch(() => this.authRepository.findOne({ where: { publicKeyStr: publicKey.toBase58() } }), (error) => new errors.Exception(error)), TE.map((auth) => (auth ? OP.some(auth) : OP.none)));
    }
    getOrCreateAuthByPublicKey(publicKey) {
        return FN.pipe(this.getAuthByPublicKey(publicKey), TE.chain((auth) => OP.isSome(auth) ? TE.right(auth.value) : this.createAuthForPublicKey(publicKey)));
    }
    generateClaim(publicKey) {
        return FN.pipe(this.destroyExistingClaims(publicKey), TE.map(() => this.authClaimRepository.create({
            nonce: (0, crypto_1.randomBytes)(64).toString('hex'),
            onBehalfOf: publicKey.toBase58(),
        })), TE.chain((claim) => TE.tryCatch(() => this.authClaimRepository.save(claim), (error) => new errors.Exception(error))), TE.map((claim) => {
            const payload = base64.encode(JSON.stringify({
                onBehalfOf: publicKey.toBase58(),
                nonce: claim.nonce,
                created: claim.created.getTime(),
            }));
            return {
                claim: [
                    'Log in to Realms',
                    '',
                    `Log in time: ${claim.created.toISOString()}`,
                    '',
                    `On behalf of: ${publicKey.toBase58()}`,
                    '',
                    `Payload: ${payload}`,
                ].join('\n'),
                onBehalfOf: publicKey,
            };
        }));
    }
    getClaim(publicKey) {
        return FN.pipe(TE.tryCatch(() => this.authClaimRepository.findOne({
            where: {
                onBehalfOf: publicKey.toBase58(),
            },
        }), (error) => new errors.Exception(error)), TE.map((claim) => (claim ? OP.some(claim) : OP.none)));
    }
    verifyClaim(claimStr, signature) {
        return FN.pipe(this.extractClaimFromClaimStr(claimStr), TE.fromEither, TE.mapLeft(() => new errors.Unauthorized()), TE.chain((decodedClaim) => FN.pipe(nacl.sign.detached.verify(new TextEncoder().encode(claimStr), signature, decodedClaim.onBehalfOf.toBuffer())
            ? TE.right(decodedClaim)
            : TE.left(new errors.Unauthorized()), TE.bindTo('claim'), TE.bind('existingClaim', ({ claim }) => this.getClaim(claim.onBehalfOf)), TE.chain(({ existingClaim, claim }) => OP.isNone(existingClaim)
            ? TE.left(new errors.Unauthorized())
            : TE.right({ claim, existingClaim: existingClaim.value })), TE.chain(({ claim, existingClaim }) => existingClaim.nonce !== claim.nonce ||
            !(0, date_fns_1.isEqual)(existingClaim.created, claim.created) ||
            (0, date_fns_1.differenceInMinutes)(Date.now(), existingClaim.created) > 10
            ? TE.left(new errors.Unauthorized())
            : TE.right(claim)), TE.matchW((error) => FN.pipe(this.destroyExistingClaims(decodedClaim.onBehalfOf), TE.chainW(() => TE.left(error))), (claim) => FN.pipe(this.destroyExistingClaims(claim.onBehalfOf), TE.chainW(() => this.getOrCreateAuthByPublicKey(claim.onBehalfOf)), TE.chainW((auth) => this.userService.getOrCreateUser(auth.id, claim.onBehalfOf)), TE.chainW((user) => TE.right(user)))), (te) => TE.fromTask(te), TE.flatten)));
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Auth_entity_1.Auth)),
    __param(1, (0, typeorm_1.InjectRepository)(AuthClaim_entity_1.AuthClaim)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map