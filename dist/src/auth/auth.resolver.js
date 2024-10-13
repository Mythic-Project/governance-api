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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const FN = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const PublicKey_1 = require("../lib/scalars/PublicKey");
const Signature_1 = require("../lib/scalars/Signature");
const auth_service_1 = require("./auth.service");
const AuthClaim_1 = require("./dto/AuthClaim");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    createAuthenticationClaim(publicKey) {
        return this.authService.generateClaim(publicKey);
    }
    createAuthenticationToken(claim, signature) {
        return FN.pipe(this.authService.verifyClaim(claim, signature), TE.map((user) => this.authService.generateJWT(user)));
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => AuthClaim_1.AuthClaim, {
        description: 'Generate an authentication claim that a wallet can sign and trade for an auth token',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)('publicKey', {
        description: 'The public key of the wallet',
        type: () => PublicKey_1.PublicKeyScalar,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "createAuthenticationClaim", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, {
        description: 'Trade a signed authentication claim for an auth token',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)('claim', {
        description: 'The authentication claim payload used to generate a token',
        type: () => String,
    })),
    __param(1, (0, graphql_1.Args)('signature', {
        description: "The auth claim signed by the public key's corresponding private key in hex representation",
        type: () => Signature_1.SignatureScalar,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Buffer]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "createAuthenticationToken", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map