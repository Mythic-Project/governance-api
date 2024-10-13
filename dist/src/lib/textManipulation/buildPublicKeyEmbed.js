"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPublicKeyEmbed = void 0;
const abbreviateAddress_1 = require("./abbreviateAddress");
const RichTextDocument_1 = require("../types/RichTextDocument");
const isBase58 = (value) => /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
function buildPublicKeyEmbed(text) {
    if (text.length !== 44) {
        return null;
    }
    if (!isBase58(text)) {
        return null;
    }
    const node = {
        t: RichTextDocument_1.InlineNodeType.PublicKey,
        c: (0, abbreviateAddress_1.abbreviateAddress)(text),
        k: text,
    };
    return node;
}
exports.buildPublicKeyEmbed = buildPublicKeyEmbed;
//# sourceMappingURL=buildPublicKeyEmbed.js.map