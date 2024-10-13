"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureScalar = void 0;
const buffer_1 = require("buffer");
const graphql_1 = require("graphql");
exports.SignatureScalar = new graphql_1.GraphQLScalarType({
    name: "Signature",
    description: 'The output of a message signed by a private key, represented as a Hex string',
    parseLiteral: (ast) => ast.kind === graphql_1.Kind.STRING ? buffer_1.Buffer.from(ast.value, 'hex') : null,
    parseValue: (value) => buffer_1.Buffer.from(value, 'hex'),
    serialize: (value) => value.toString('hex')
});
//# sourceMappingURL=Signature.js.map