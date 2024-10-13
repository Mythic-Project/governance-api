"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonceScalar = void 0;
const graphql_1 = require("graphql");
exports.NonceScalar = new graphql_1.GraphQLScalarType({
    name: 'Nonce',
    description: 'A random nonsense value',
    parseLiteral: (ast) => (ast.kind === graphql_1.Kind.STRING ? ast.value : null),
    parseValue: (value) => value,
    serialize: (value) => value,
});
//# sourceMappingURL=Nonce.js.map