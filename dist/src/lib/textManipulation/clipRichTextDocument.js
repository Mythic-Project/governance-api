"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clipRichTextDocument = void 0;
const RichTextDocument_1 = require("../types/RichTextDocument");
function clipRichTextDocument(document, charLimit, attachmentLimit) {
    const clippedDocument = {
        attachments: [],
        content: [],
    };
    const maxParagraphs = Math.ceil(charLimit / 100);
    let budget = charLimit;
    let clippedIndex = 0;
    let isClipped = false;
    let nodesSkipped = false;
    for (let index = 0; index < document.content.length; index++) {
        const block = document.content[index];
        if (isClipped) {
            break;
        }
        if (index > maxParagraphs) {
            isClipped = true;
            clippedIndex = index;
            break;
        }
        if (block.t === RichTextDocument_1.BlockNodeType.Block) {
            const newBlock = Object.assign(Object.assign({}, block), { c: [] });
            for (const node of block.c) {
                if (isClipped) {
                    break;
                }
                if (node.t === RichTextDocument_1.InlineNodeType.Anchor) {
                    const newNode = Object.assign(Object.assign({}, node), { c: [] });
                    for (const i of node.c) {
                        if (isClipped) {
                            break;
                        }
                        const text = i.c;
                        if (budget > text.length) {
                            newNode.c.push(i);
                            budget -= text.length;
                        }
                        else {
                            const newInlineNode = Object.assign(Object.assign({}, i), { c: text.slice(0, budget) });
                            budget = 0;
                            isClipped = true;
                            clippedIndex = index;
                            newNode.c.push(newInlineNode);
                        }
                    }
                    newBlock.c.push(newNode);
                }
                else if (node.t === RichTextDocument_1.InlineNodeType.Inline ||
                    node.t === RichTextDocument_1.InlineNodeType.PublicKey) {
                    const newNode = Object.assign(Object.assign({}, node), { c: '' });
                    const text = node.c;
                    if (budget > text.length) {
                        newNode.c = text;
                        budget -= text.length;
                    }
                    else {
                        newNode.c = text.slice(0, budget);
                        budget = 0;
                        isClipped = true;
                        clippedIndex = index;
                    }
                    newBlock.c.push(newNode);
                }
            }
            clippedDocument.content.push(newBlock);
        }
        else if (block.t === RichTextDocument_1.BlockNodeType.TwitterEmbed) {
            if (clippedDocument.attachments.length < attachmentLimit && (!isClipped || (index === clippedIndex + 1))) {
                clippedDocument.attachments.push({
                    t: RichTextDocument_1.AttachmentType.TwitterEmbed,
                    c: block.c,
                });
            }
            else {
                nodesSkipped = true;
            }
        }
        else {
            nodesSkipped = true;
        }
    }
    return {
        document: clippedDocument,
        isClipped: isClipped || nodesSkipped,
    };
}
exports.clipRichTextDocument = clipRichTextDocument;
//# sourceMappingURL=clipRichTextDocument.js.map