"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhanceAnchorNodes = exports.enhanceRichTextDocument = void 0;
const url_1 = require("url");
const convertTextToRichTextDocument_1 = require("./convertTextToRichTextDocument");
const fetchTwitterEmbed_1 = require("./fetchTwitterEmbed");
const RichTextDocument_1 = require("../types/RichTextDocument");
async function enhanceRichTextDocument(document, props) {
    const blocks = [];
    for (const block of document.content) {
        if (block.t === RichTextDocument_1.BlockNodeType.Image) {
            blocks.push(block);
        }
        else if (block.t === RichTextDocument_1.BlockNodeType.Block) {
            const children = [];
            const extraBlocks = [];
            for (const child of block.c) {
                if (child.t === RichTextDocument_1.InlineNodeType.Inline) {
                    const convertedChildren = await (0, convertTextToRichTextDocument_1.convertStringBlockToRTDBlock)(child.c);
                    const newChildren = [];
                    for (const newChild of convertedChildren) {
                        if (newChild.t === RichTextDocument_1.InlineNodeType.Anchor) {
                            const { node, additionalBlocks } = await enhanceAnchorNodes(Object.assign(Object.assign({}, newChild), { c: newChild.c.map(c => (Object.assign(Object.assign({}, c), { s: c.s || child.s }))) }), props);
                            extraBlocks.push(...additionalBlocks);
                            newChildren.push(node);
                        }
                        else {
                            newChildren.push(Object.assign(Object.assign({}, newChild), { s: child.s }));
                        }
                    }
                    children.push(...newChildren);
                }
                else if (child.t === RichTextDocument_1.InlineNodeType.Anchor) {
                    const { node, additionalBlocks } = await enhanceAnchorNodes(child, props);
                    children.push(node);
                    extraBlocks.push(...additionalBlocks);
                }
                else {
                    children.push(child);
                }
            }
            const newBlock = {
                t: RichTextDocument_1.BlockNodeType.Block,
                c: children,
                s: block.s,
            };
            blocks.push(newBlock);
            blocks.push(...extraBlocks);
        }
    }
    return {
        attachments: document.attachments,
        content: blocks,
    };
}
exports.enhanceRichTextDocument = enhanceRichTextDocument;
async function enhanceAnchorNodes(node, props) {
    var _a;
    const newNode = Object.assign({}, node);
    const additionalBlocks = [];
    const urlParts = (0, url_1.parse)(node.u);
    if (node.c.length === 1 && node.c[0].c === node.u) {
        newNode.c = [{
                t: RichTextDocument_1.InlineNodeType.Inline,
                c: (urlParts.host || 'link') + (urlParts.path ? urlParts.path.slice(0, 4) + "…" : '')
            }];
    }
    if ((_a = urlParts.host) === null || _a === void 0 ? void 0 : _a.includes('twitter')) {
        try {
            const embed = await (0, fetchTwitterEmbed_1.fetchTwitterEmbed)(node.u, props.twitterBearerToken);
            additionalBlocks.push(embed);
        }
        catch (e) {
            console.log(e);
        }
    }
    return {
        node: newNode,
        additionalBlocks,
    };
}
exports.enhanceAnchorNodes = enhanceAnchorNodes;
//# sourceMappingURL=enhanceRichTextDocument.js.map