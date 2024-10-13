"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentEnvironment = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentEnvironment = (0, common_1.createParamDecorator)((data, context) => {
    var _a, _b;
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const environment = (_b = (_a = ctx.getContext().req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b['x-environment'];
    if (environment === 'devnet') {
        return 'devnet';
    }
    return 'mainnet';
});
//# sourceMappingURL=CurrentEnvironment.js.map