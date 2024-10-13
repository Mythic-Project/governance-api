"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentType = exports.BlockNodeType = exports.InlineNodeType = exports.BlockStyle = exports.InlineStyle = void 0;
var InlineStyle;
(function (InlineStyle) {
    InlineStyle["Bold"] = "B";
    InlineStyle["Code"] = "C";
    InlineStyle["Italic"] = "I";
    InlineStyle["Small"] = "SM";
    InlineStyle["Strikethrough"] = "S";
    InlineStyle["Underline"] = "U";
})(InlineStyle = exports.InlineStyle || (exports.InlineStyle = {}));
var BlockStyle;
(function (BlockStyle) {
    BlockStyle["Blockquote"] = "BQ";
    BlockStyle["Codeblock"] = "CB";
    BlockStyle["H1"] = "H1";
    BlockStyle["H2"] = "H2";
    BlockStyle["H3"] = "H3";
    BlockStyle["H4"] = "H4";
    BlockStyle["H5"] = "H5";
    BlockStyle["H6"] = "H6";
    BlockStyle["OL"] = "OL";
    BlockStyle["P"] = "P";
    BlockStyle["UL"] = "UL";
})(BlockStyle = exports.BlockStyle || (exports.BlockStyle = {}));
var InlineNodeType;
(function (InlineNodeType) {
    InlineNodeType["Anchor"] = "A";
    InlineNodeType["Inline"] = "I";
    InlineNodeType["PublicKey"] = "PK";
})(InlineNodeType = exports.InlineNodeType || (exports.InlineNodeType = {}));
var BlockNodeType;
(function (BlockNodeType) {
    BlockNodeType["Block"] = "B";
    BlockNodeType["Image"] = "IM";
    BlockNodeType["TwitterEmbed"] = "TWE";
})(BlockNodeType = exports.BlockNodeType || (exports.BlockNodeType = {}));
var AttachmentType;
(function (AttachmentType) {
    AttachmentType["TwitterEmbed"] = "TWE";
})(AttachmentType = exports.AttachmentType || (exports.AttachmentType = {}));
//# sourceMappingURL=RichTextDocument.js.map