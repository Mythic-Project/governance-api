import { RichTextDocument } from "../types/RichTextDocument";
export declare function clipRichTextDocument(document: RichTextDocument, charLimit: number, attachmentLimit: number): {
    document: RichTextDocument;
    isClipped: boolean;
};
