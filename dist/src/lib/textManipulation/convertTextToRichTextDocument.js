"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringBlockToRTDBlock = exports.convertTextToRichTextDocument = void 0;
const url_1 = require("url");
const buildPublicKeyEmbed_1 = require("./buildPublicKeyEmbed");
const RTD = require("../types/RichTextDocument");
const isValidUrl_1 = require("../url/isValidUrl");
async function convertTextToRichTextDocument(text) {
    const parts = text
        .split('\n')
        .map((part) => part.trim())
        .filter((part) => !!part);
    return {
        attachments: [],
        content: await Promise.all(parts.map(async (part) => ({
            t: RTD.BlockNodeType.Block,
            c: await convertStringBlockToRTDBlock(part),
            s: RTD.BlockStyle.P,
        }))),
    };
}
exports.convertTextToRichTextDocument = convertTextToRichTextDocument;
async function convertStringBlockToRTDBlock(stringBlock) {
    const parts = stringBlock.split(' ');
    const nodes = [];
    let contiguousStrings = [];
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLast = i === parts.length - 1;
        const publicKey = (0, buildPublicKeyEmbed_1.buildPublicKeyEmbed)(part);
        const isUrl = (0, isValidUrl_1.isValidUrl)(part, ['http', 'https']);
        if (isUrl || publicKey) {
            if (contiguousStrings.length) {
                const text = contiguousStrings.join(' ') + ' ';
                nodes.push({
                    t: RTD.InlineNodeType.Inline,
                    c: text,
                });
                contiguousStrings = [];
            }
            if (isUrl) {
                const urlParts = (0, url_1.parse)(part);
                nodes.push({
                    t: RTD.InlineNodeType.Anchor,
                    c: [
                        {
                            t: RTD.InlineNodeType.Inline,
                            c: (urlParts.host || 'link') + (urlParts.path ? urlParts.path.slice(0, 4) + "…" : ''),
                        },
                    ],
                    u: part,
                });
            }
            else if (publicKey) {
                nodes.push(publicKey);
            }
            if (!isLast) {
                nodes.push({
                    t: RTD.InlineNodeType.Inline,
                    c: ' ',
                });
            }
        }
        else {
            contiguousStrings.push(part);
        }
    }
    if (contiguousStrings.length) {
        const text = contiguousStrings.join(' ');
        nodes.push({
            t: RTD.InlineNodeType.Inline,
            c: text,
        });
    }
    return nodes;
}
exports.convertStringBlockToRTDBlock = convertStringBlockToRTDBlock;
//# sourceMappingURL=convertTextToRichTextDocument.js.map