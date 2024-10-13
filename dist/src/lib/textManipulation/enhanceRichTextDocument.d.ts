import { AnchorNode, BlockNode, InlineNode, InlineNodeType, PublicKeyNode, RichTextDocument } from "@lib/types/RichTextDocument";
interface Props {
    twitterBearerToken: string;
}
export declare function enhanceRichTextDocument(document: RichTextDocument, props: Props): Promise<RichTextDocument>;
export declare function enhanceAnchorNodes(node: AnchorNode, props: Props): Promise<{
    node: {
        t: InlineNodeType.Anchor;
        c: (InlineNode | PublicKeyNode)[];
        u: string;
    };
    additionalBlocks: (import("@lib/types/RichTextDocument").ImageNode | BlockNode | import("@lib/types/RichTextDocument").TwitterEmbedNode)[];
}>;
export {};
