"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemIDScalar = void 0;
const graphql_1 = require("graphql");
const RADIX = 36;
exports.RealmFeedItemIDScalar = new graphql_1.GraphQLScalarType({
    name: "RealmFeedItemID",
    description: 'An opaque id used to identify `RealmFeedItem`s',
    parseLiteral: (ast) => {
        return ast.kind === graphql_1.Kind.STRING ? parseInt(ast.value, RADIX) : null;
    },
    parseValue: (value) => {
        return parseInt(value, RADIX);
    },
    serialize: (value) => {
        return value.toString(RADIX);
    },
});
//# sourceMappingURL=RealmFeedItemID.js.map