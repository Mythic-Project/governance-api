"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigNumberScalar = void 0;
const bignumber_js_1 = require("bignumber.js");
const graphql_1 = require("graphql");
exports.BigNumberScalar = new graphql_1.GraphQLScalarType({
    name: 'BigNumber',
    description: 'A potentially large number value. Compatible with `BigNumber.js`',
    parseLiteral: (ast) => ast.kind === graphql_1.Kind.STRING ? new bignumber_js_1.BigNumber(ast.value) : null,
    parseValue: (value) => new bignumber_js_1.BigNumber(value),
    serialize: (value) => value.toString(),
});
//# sourceMappingURL=BigNumber.js.map