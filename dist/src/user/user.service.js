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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const FN = require("fp-ts/function");
const OP = require("fp-ts/Option");
const TE = require("fp-ts/TaskEither");
const typeorm_2 = require("typeorm");
const errors = require("../lib/errors/gql");
const User_entity_1 = require("./entities/User.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(authId, publicKey, data) {
        return FN.pipe(TE.of(this.userRepository.create({ authId, data, publicKeyStr: publicKey.toBase58() })), TE.chain((user) => TE.tryCatch(() => this.userRepository.save(user), (error) => new errors.Exception(error))));
    }
    getOrCreateUser(authId, publicKey) {
        return FN.pipe(this.getUserByAuthId(authId), TE.chainW((user) => OP.isSome(user) ? TE.right(user.value) : this.createUser(authId, publicKey, {})));
    }
    getUserById(id) {
        return FN.pipe(TE.tryCatch(() => this.userRepository.findOne({ where: { id } }), (error) => new errors.Exception(error)), TE.map((user) => (user ? OP.some(user) : OP.none)));
    }
    getUserByAuthId(authId) {
        return FN.pipe(TE.tryCatch(() => this.userRepository.findOne({ where: { authId } }), (error) => new errors.Exception(error)), TE.map((user) => (user ? OP.some(user) : OP.none)));
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map