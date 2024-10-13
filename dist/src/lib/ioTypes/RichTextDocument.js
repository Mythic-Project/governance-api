"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichTextDocument = exports.TwitterEmbedAttachment = exports.TwitterEmbedNode = exports.BlockNode = exports.ImageNode = exports.PublicKeyNode = exports.AnchorNode = exports.InlineNode = exports.AttachmentType = exports.AttachmentTypeTwitterEmbed = exports.BlockNodeType = exports.BlockNodeTypeTwitterEmbed = exports.BlockNodeTypeImage = exports.BlockNodeTypeBlock = exports.InlineNodeType = exports.InlineNodeTypePublicKey = exports.InlineNodeTypeInline = exports.InlineNodeTypeAnchor = exports.BlockStyle = exports.BlockStyleUL = exports.BlockStyleP = exports.BlockStyleOL = exports.BlockStyleH6 = exports.BlockStyleH5 = exports.BlockStyleH4 = exports.BlockStyleH3 = exports.BlockStyleH2 = exports.BlockStyleH1 = exports.BlockStyleCodeblock = exports.BlockStyleBlockquote = exports.InlineStyle = exports.InlineStyleUnderline = exports.InlineStyleStrikethrough = exports.InlineStyleSmall = exports.InlineStyleItalic = exports.InlineStyleCode = exports.InlineStyleBold = void 0;
const IT = require("io-ts");
const RTD = require("../types/RichTextDocument");
exports.InlineStyleBold = IT.literal(RTD.InlineStyle.Bold);
exports.InlineStyleCode = IT.literal(RTD.InlineStyle.Code);
exports.InlineStyleItalic = IT.literal(RTD.InlineStyle.Italic);
exports.InlineStyleSmall = IT.literal(RTD.InlineStyle.Small);
exports.InlineStyleStrikethrough = IT.literal(RTD.InlineStyle.Strikethrough);
exports.InlineStyleUnderline = IT.literal(RTD.InlineStyle.Underline);
exports.InlineStyle = IT.union([
    exports.InlineStyleBold,
    exports.InlineStyleCode,
    exports.InlineStyleItalic,
    exports.InlineStyleSmall,
    exports.InlineStyleStrikethrough,
    exports.InlineStyleUnderline,
]);
exports.BlockStyleBlockquote = IT.literal(RTD.BlockStyle.Blockquote);
exports.BlockStyleCodeblock = IT.literal(RTD.BlockStyle.Codeblock);
exports.BlockStyleH1 = IT.literal(RTD.BlockStyle.H1);
exports.BlockStyleH2 = IT.literal(RTD.BlockStyle.H2);
exports.BlockStyleH3 = IT.literal(RTD.BlockStyle.H3);
exports.BlockStyleH4 = IT.literal(RTD.BlockStyle.H4);
exports.BlockStyleH5 = IT.literal(RTD.BlockStyle.H5);
exports.BlockStyleH6 = IT.literal(RTD.BlockStyle.H6);
exports.BlockStyleOL = IT.literal(RTD.BlockStyle.OL);
exports.BlockStyleP = IT.literal(RTD.BlockStyle.P);
exports.BlockStyleUL = IT.literal(RTD.BlockStyle.UL);
exports.BlockStyle = IT.union([
    exports.BlockStyleBlockquote,
    exports.BlockStyleCodeblock,
    exports.BlockStyleH1,
    exports.BlockStyleH2,
    exports.BlockStyleH3,
    exports.BlockStyleH4,
    exports.BlockStyleH5,
    exports.BlockStyleH6,
    exports.BlockStyleOL,
    exports.BlockStyleP,
    exports.BlockStyleUL,
]);
exports.InlineNodeTypeAnchor = IT.literal(RTD.InlineNodeType.Anchor);
exports.InlineNodeTypeInline = IT.literal(RTD.InlineNodeType.Inline);
exports.InlineNodeTypePublicKey = IT.literal(RTD.InlineNodeType.PublicKey);
exports.InlineNodeType = IT.union([
    exports.InlineNodeTypeAnchor,
    exports.InlineNodeTypeInline,
    exports.InlineNodeTypePublicKey,
]);
exports.BlockNodeTypeBlock = IT.literal(RTD.BlockNodeType.Block);
exports.BlockNodeTypeImage = IT.literal(RTD.BlockNodeType.Image);
exports.BlockNodeTypeTwitterEmbed = IT.literal(RTD.BlockNodeType.TwitterEmbed);
exports.BlockNodeType = IT.union([
    exports.BlockNodeTypeBlock,
    exports.BlockNodeTypeImage,
    exports.BlockNodeTypeTwitterEmbed,
]);
exports.AttachmentTypeTwitterEmbed = IT.literal(RTD.AttachmentType.TwitterEmbed);
exports.AttachmentType = exports.AttachmentTypeTwitterEmbed;
exports.InlineNode = IT.type({
    t: exports.InlineNodeTypeInline,
    c: IT.string,
    s: IT.union([IT.null, IT.undefined, IT.array(exports.InlineStyle)]),
});
exports.AnchorNode = IT.type({
    t: exports.InlineNodeTypeAnchor,
    c: IT.array(exports.InlineNode),
    u: IT.string,
});
exports.PublicKeyNode = IT.type({
    t: exports.InlineNodeTypePublicKey,
    c: IT.string,
    k: IT.string,
    s: IT.union([IT.null, IT.undefined, IT.array(exports.InlineStyle)]),
});
exports.ImageNode = IT.type({
    t: exports.BlockNodeTypeImage,
    c: IT.array(exports.InlineNode),
    u: IT.string,
});
exports.BlockNode = IT.type({
    t: exports.BlockNodeTypeBlock,
    c: IT.array(IT.union([exports.AnchorNode, exports.InlineNode, exports.PublicKeyNode])),
    s: exports.BlockStyle,
});
exports.TwitterEmbedNode = IT.type({
    t: exports.BlockNodeTypeTwitterEmbed,
    c: IT.type({
        u: IT.string,
        t: IT.union([IT.null, IT.undefined, IT.string]),
        h: IT.union([IT.null, IT.undefined, IT.string]),
    }),
});
exports.TwitterEmbedAttachment = IT.type({
    t: exports.AttachmentTypeTwitterEmbed,
    c: IT.type({
        u: IT.string,
        t: IT.union([IT.null, IT.undefined, IT.string]),
        h: IT.union([IT.null, IT.undefined, IT.string]),
    }),
});
exports.RichTextDocument = IT.type({
    attachments: IT.array(exports.TwitterEmbedAttachment),
    content: IT.array(IT.union([exports.BlockNode, exports.ImageNode, exports.TwitterEmbedNode])),
});
//# sourceMappingURL=RichTextDocument.js.map