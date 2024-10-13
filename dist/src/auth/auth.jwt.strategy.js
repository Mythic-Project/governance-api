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
exports.AuthJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const web3_js_1 = require("@solana/web3.js");
const FN = require("fp-ts/function");
const OP = require("fp-ts/Option");
const TE = require("fp-ts/TaskEither");
const passport_jwt_1 = require("passport-jwt");
const config_service_1 = require("../config/config.service");
const user_service_1 = require("../user/user.service");
let AuthJwtStrategy = class AuthJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'authJwt') {
    constructor(configService, userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('jwt.userSecret'),
        });
        this.configService = configService;
        this.userService = userService;
    }
    validate(payload) {
        return FN.pipe(this.userService.getUserById(payload.sub), TE.matchW(() => null, (user) => OP.isSome(user)
            ? Object.assign(Object.assign({}, user.value.data), { id: user.value.id, publicKey: new web3_js_1.PublicKey(user.value.publicKeyStr) }) : null))();
    }
};
AuthJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        user_service_1.UserService])
], AuthJwtStrategy);
exports.AuthJwtStrategy = AuthJwtStrategy;
//# sourceMappingURL=auth.jwt.strategy.js.map