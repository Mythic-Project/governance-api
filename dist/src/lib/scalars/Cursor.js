"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorScalar = void 0;
const graphql_1 = require("graphql");
exports.CursorScalar = new graphql_1.GraphQLScalarType({
    name: 'Cursor',
    description: 'An opaque string used for pagination',
    parseLiteral: (ast) => (ast.kind === graphql_1.Kind.STRING ? ast.value : null),
    parseValue: (value) => value,
    serialize: (value) => value,
});
//# sourceMappingURL=Cursor.js.map