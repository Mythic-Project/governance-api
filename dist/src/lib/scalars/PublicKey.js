"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKeyScalar = void 0;
const web3_js_1 = require("@solana/web3.js");
const graphql_1 = require("graphql");
exports.PublicKeyScalar = new graphql_1.GraphQLScalarType({
    name: 'PublicKey',
    description: 'A valid Public Key',
    parseLiteral: (ast) => ast.kind === graphql_1.Kind.STRING ? new web3_js_1.PublicKey(ast.value) : null,
    parseValue: (value) => new web3_js_1.PublicKey(value),
    serialize: (value) => value.toBase58(),
});
//# sourceMappingURL=PublicKey.js.map