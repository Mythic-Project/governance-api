"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemCommentIDScalar = void 0;
const graphql_1 = require("graphql");
const RADIX = 36;
exports.RealmFeedItemCommentIDScalar = new graphql_1.GraphQLScalarType({
    name: "RealmFeedItemCommentID",
    description: 'An opaque id used to identify `RealmFeedItemComment`s',
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
//# sourceMappingURL=RealmFeedItemCommentID.js.map