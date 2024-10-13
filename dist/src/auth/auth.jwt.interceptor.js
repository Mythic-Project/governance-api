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
exports.AuthJwtInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const EI = require("fp-ts/Either");
const OP = require("fp-ts/Option");
const jsonwebtoken = require("jsonwebtoken");
const passport_jwt_1 = require("passport-jwt");
const config_service_1 = require("../config/config.service");
const user_service_1 = require("../user/user.service");
let AuthJwtInterceptor = class AuthJwtInterceptor {
    constructor(configService, userService) {
        this.configService = configService;
        this.userService = userService;
    }
    async intercept(context, next) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        try {
            const request = ctx.getContext().req;
            const rawAuthToken = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(request);
            if (rawAuthToken) {
                const token = jsonwebtoken.verify(rawAuthToken, this.configService.get('jwt.userSecret'));
                const userId = token.sub;
                if (typeof userId === 'string') {
                    const result = await this.userService.getUserById(userId)();
                    if (EI.isRight(result)) {
                        const user = OP.isSome(result.right) ? result.right.value : null;
                        if (user) {
                            request.user = Object.assign(Object.assign({}, user.data), { id: user.id, publicKey: new web3_js_1.PublicKey(user.publicKeyStr) });
                        }
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        return next.handle();
    }
};
AuthJwtInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        user_service_1.UserService])
], AuthJwtInterceptor);
exports.AuthJwtInterceptor = AuthJwtInterceptor;
//# sourceMappingURL=auth.jwt.interceptor.js.map