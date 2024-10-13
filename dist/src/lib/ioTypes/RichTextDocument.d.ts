import * as IT from 'io-ts';
import * as RTD from '@lib/types/RichTextDocument';
export declare const InlineStyleBold: IT.LiteralC<RTD.InlineStyle.Bold>;
export declare const InlineStyleCode: IT.LiteralC<RTD.InlineStyle.Code>;
export declare const InlineStyleItalic: IT.LiteralC<RTD.InlineStyle.Italic>;
export declare const InlineStyleSmall: IT.LiteralC<RTD.InlineStyle.Small>;
export declare const InlineStyleStrikethrough: IT.LiteralC<RTD.InlineStyle.Strikethrough>;
export declare const InlineStyleUnderline: IT.LiteralC<RTD.InlineStyle.Underline>;
export declare const InlineStyle: IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>;
export declare const BlockStyleBlockquote: IT.LiteralC<RTD.BlockStyle.Blockquote>;
export declare const BlockStyleCodeblock: IT.LiteralC<RTD.BlockStyle.Codeblock>;
export declare const BlockStyleH1: IT.LiteralC<RTD.BlockStyle.H1>;
export declare const BlockStyleH2: IT.LiteralC<RTD.BlockStyle.H2>;
export declare const BlockStyleH3: IT.LiteralC<RTD.BlockStyle.H3>;
export declare const BlockStyleH4: IT.LiteralC<RTD.BlockStyle.H4>;
export declare const BlockStyleH5: IT.LiteralC<RTD.BlockStyle.H5>;
export declare const BlockStyleH6: IT.LiteralC<RTD.BlockStyle.H6>;
export declare const BlockStyleOL: IT.LiteralC<RTD.BlockStyle.OL>;
export declare const BlockStyleP: IT.LiteralC<RTD.BlockStyle.P>;
export declare const BlockStyleUL: IT.LiteralC<RTD.BlockStyle.UL>;
export declare const BlockStyle: IT.UnionC<[IT.LiteralC<RTD.BlockStyle.Blockquote>, IT.LiteralC<RTD.BlockStyle.Codeblock>, IT.LiteralC<RTD.BlockStyle.H1>, IT.LiteralC<RTD.BlockStyle.H2>, IT.LiteralC<RTD.BlockStyle.H3>, IT.LiteralC<RTD.BlockStyle.H4>, IT.LiteralC<RTD.BlockStyle.H5>, IT.LiteralC<RTD.BlockStyle.H6>, IT.LiteralC<RTD.BlockStyle.OL>, IT.LiteralC<RTD.BlockStyle.P>, IT.LiteralC<RTD.BlockStyle.UL>]>;
export declare const InlineNodeTypeAnchor: IT.LiteralC<RTD.InlineNodeType.Anchor>;
export declare const InlineNodeTypeInline: IT.LiteralC<RTD.InlineNodeType.Inline>;
export declare const InlineNodeTypePublicKey: IT.LiteralC<RTD.InlineNodeType.PublicKey>;
export declare const InlineNodeType: IT.UnionC<[IT.LiteralC<RTD.InlineNodeType.Anchor>, IT.LiteralC<RTD.InlineNodeType.Inline>, IT.LiteralC<RTD.InlineNodeType.PublicKey>]>;
export declare const BlockNodeTypeBlock: IT.LiteralC<RTD.BlockNodeType.Block>;
export declare const BlockNodeTypeImage: IT.LiteralC<RTD.BlockNodeType.Image>;
export declare const BlockNodeTypeTwitterEmbed: IT.LiteralC<RTD.BlockNodeType.TwitterEmbed>;
export declare const BlockNodeType: IT.UnionC<[IT.LiteralC<RTD.BlockNodeType.Block>, IT.LiteralC<RTD.BlockNodeType.Image>, IT.LiteralC<RTD.BlockNodeType.TwitterEmbed>]>;
export declare const AttachmentTypeTwitterEmbed: IT.LiteralC<RTD.AttachmentType>;
export declare const AttachmentType: IT.LiteralC<RTD.AttachmentType>;
export declare const InlineNode: IT.TypeC<{
    t: IT.LiteralC<RTD.InlineNodeType.Inline>;
    c: IT.StringC;
    s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
}>;
export declare const AnchorNode: IT.TypeC<{
    t: IT.LiteralC<RTD.InlineNodeType.Anchor>;
    c: IT.ArrayC<IT.TypeC<{
        t: IT.LiteralC<RTD.InlineNodeType.Inline>;
        c: IT.StringC;
        s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
    }>>;
    u: IT.StringC;
}>;
export declare const PublicKeyNode: IT.TypeC<{
    t: IT.LiteralC<RTD.InlineNodeType.PublicKey>;
    c: IT.StringC;
    k: IT.StringC;
    s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
}>;
export declare const ImageNode: IT.TypeC<{
    t: IT.LiteralC<RTD.BlockNodeType.Image>;
    c: IT.ArrayC<IT.TypeC<{
        t: IT.LiteralC<RTD.InlineNodeType.Inline>;
        c: IT.StringC;
        s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
    }>>;
    u: IT.StringC;
}>;
export declare const BlockNode: IT.TypeC<{
    t: IT.LiteralC<RTD.BlockNodeType.Block>;
    c: IT.ArrayC<IT.UnionC<[IT.TypeC<{
        t: IT.LiteralC<RTD.InlineNodeType.Anchor>;
        c: IT.ArrayC<IT.TypeC<{
            t: IT.LiteralC<RTD.InlineNodeType.Inline>;
            c: IT.StringC;
            s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
        }>>;
        u: IT.StringC;
    }>, IT.TypeC<{
        t: IT.LiteralC<RTD.InlineNodeType.Inline>;
        c: IT.StringC;
        s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
    }>, IT.TypeC<{
        t: IT.LiteralC<RTD.InlineNodeType.PublicKey>;
        c: IT.StringC;
        k: IT.StringC;
        s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
    }>]>>;
    s: IT.UnionC<[IT.LiteralC<RTD.BlockStyle.Blockquote>, IT.LiteralC<RTD.BlockStyle.Codeblock>, IT.LiteralC<RTD.BlockStyle.H1>, IT.LiteralC<RTD.BlockStyle.H2>, IT.LiteralC<RTD.BlockStyle.H3>, IT.LiteralC<RTD.BlockStyle.H4>, IT.LiteralC<RTD.BlockStyle.H5>, IT.LiteralC<RTD.BlockStyle.H6>, IT.LiteralC<RTD.BlockStyle.OL>, IT.LiteralC<RTD.BlockStyle.P>, IT.LiteralC<RTD.BlockStyle.UL>]>;
}>;
export declare const TwitterEmbedNode: IT.TypeC<{
    t: IT.LiteralC<RTD.BlockNodeType.TwitterEmbed>;
    c: IT.TypeC<{
        u: IT.StringC;
        t: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.StringC]>;
        h: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.StringC]>;
    }>;
}>;
export declare const TwitterEmbedAttachment: IT.TypeC<{
    t: IT.LiteralC<RTD.AttachmentType>;
    c: IT.TypeC<{
        u: IT.StringC;
        t: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.StringC]>;
        h: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.StringC]>;
    }>;
}>;
export declare const RichTextDocument: IT.TypeC<{
    attachments: IT.ArrayC<IT.TypeC<{
        t: IT.LiteralC<RTD.AttachmentType>;
        c: IT.TypeC<{
            u: IT.StringC;
            t: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.StringC]>;
            h: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.StringC]>;
        }>;
    }>>;
    content: IT.ArrayC<IT.UnionC<[IT.TypeC<{
        t: IT.LiteralC<RTD.BlockNodeType.Block>;
        c: IT.ArrayC<IT.UnionC<[IT.TypeC<{
            t: IT.LiteralC<RTD.InlineNodeType.Anchor>;
            c: IT.ArrayC<IT.TypeC<{
                t: IT.LiteralC<RTD.InlineNodeType.Inline>;
                c: IT.StringC;
                s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
            }>>;
            u: IT.StringC;
        }>, IT.TypeC<{
            t: IT.LiteralC<RTD.InlineNodeType.Inline>;
            c: IT.StringC;
            s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
        }>, IT.TypeC<{
            t: IT.LiteralC<RTD.InlineNodeType.PublicKey>;
            c: IT.StringC;
            k: IT.StringC;
            s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
        }>]>>;
        s: IT.UnionC<[IT.LiteralC<RTD.BlockStyle.Blockquote>, IT.LiteralC<RTD.BlockStyle.Codeblock>, IT.LiteralC<RTD.BlockStyle.H1>, IT.LiteralC<RTD.BlockStyle.H2>, IT.LiteralC<RTD.BlockStyle.H3>, IT.LiteralC<RTD.BlockStyle.H4>, IT.LiteralC<RTD.BlockStyle.H5>, IT.LiteralC<RTD.BlockStyle.H6>, IT.LiteralC<RTD.BlockStyle.OL>, IT.LiteralC<RTD.BlockStyle.P>, IT.LiteralC<RTD.BlockStyle.UL>]>;
    }>, IT.TypeC<{
        t: IT.LiteralC<RTD.BlockNodeType.Image>;
        c: IT.ArrayC<IT.TypeC<{
            t: IT.LiteralC<RTD.InlineNodeType.Inline>;
            c: IT.StringC;
            s: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.ArrayC<IT.UnionC<[IT.LiteralC<RTD.InlineStyle.Bold>, IT.LiteralC<RTD.InlineStyle.Code>, IT.LiteralC<RTD.InlineStyle.Italic>, IT.LiteralC<RTD.InlineStyle.Small>, IT.LiteralC<RTD.InlineStyle.Strikethrough>, IT.LiteralC<RTD.InlineStyle.Underline>]>>]>;
        }>>;
        u: IT.StringC;
    }>, IT.TypeC<{
        t: IT.LiteralC<RTD.BlockNodeType.TwitterEmbed>;
        c: IT.TypeC<{
            u: IT.StringC;
            t: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.StringC]>;
            h: IT.UnionC<[IT.NullC, IT.UndefinedC, IT.StringC]>;
        }>;
    }>]>>;
}>;
