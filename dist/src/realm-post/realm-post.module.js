"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmPostModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const RealmPost_entity_1 = require("./entities/RealmPost.entity");
const realm_post_resolver_1 = require("./realm-post.resolver");
const realm_post_service_1 = require("./realm-post.service");
let RealmPostModule = class RealmPostModule {
};
RealmPostModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([RealmPost_entity_1.RealmPost])],
        providers: [realm_post_resolver_1.RealmPostResolver, realm_post_service_1.RealmPostService],
        exports: [realm_post_service_1.RealmPostService],
    })
], RealmPostModule);
exports.RealmPostModule = RealmPostModule;
//# sourceMappingURL=realm-post.module.js.map