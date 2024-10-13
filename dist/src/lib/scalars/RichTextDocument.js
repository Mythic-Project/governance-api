"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichTextDocumentScalar = void 0;
const EI = require("fp-ts/Either");
const FN = require("fp-ts/function");
const graphql_1 = require("graphql");
const graphql_type_json_1 = require("graphql-type-json");
const PathReporter_1 = require("io-ts/PathReporter");
const RichTextDocument_1 = require("../ioTypes/RichTextDocument");
exports.RichTextDocumentScalar = new graphql_1.GraphQLScalarType({
    name: 'RichTextDocument',
    description: 'A json object representing a Rich Text Document',
    parseLiteral: graphql_type_json_1.GraphQLJSONObject.parseLiteral,
    parseValue: ((value) => {
        const result = FN.pipe(value, RichTextDocument_1.RichTextDocument.decode);
        if (EI.isLeft(result)) {
            throw new TypeError(PathReporter_1.PathReporter.report(EI.left(result.left)).join('\n'));
        }
        return result.right;
    }),
    serialize: graphql_type_json_1.GraphQLJSONObject.serialize,
});
//# sourceMappingURL=RichTextDocument.js.map