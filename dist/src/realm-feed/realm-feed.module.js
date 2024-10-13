"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedModule = void 0;
const common_1 = require("@nestjs/common");
const realm_feed_item_module_1 = require("../realm-feed-item/realm-feed-item.module");
const realm_proposal_module_1 = require("../realm-proposal/realm-proposal.module");
const realm_feed_resolver_1 = require("./realm-feed.resolver");
const realm_feed_service_1 = require("./realm-feed.service");
let RealmFeedModule = class RealmFeedModule {
};
RealmFeedModule = __decorate([
    (0, common_1.Module)({
        imports: [realm_feed_item_module_1.RealmFeedItemModule, realm_proposal_module_1.RealmProposalModule],
        providers: [realm_feed_resolver_1.RealmFeedResolver, realm_feed_service_1.RealmFeedService],
        exports: [realm_feed_service_1.RealmFeedService],
    })
], RealmFeedModule);
exports.RealmFeedModule = RealmFeedModule;
//# sourceMappingURL=realm-feed.module.js.map