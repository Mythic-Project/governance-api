import * as RTD from '@lib/types/RichTextDocument';
export declare function convertTextToRichTextDocument(text: string): Promise<RTD.RichTextDocument>;
export declare function convertStringBlockToRTDBlock(stringBlock: string): Promise<(RTD.InlineNode | RTD.AnchorNode | RTD.PublicKeyNode)[]>;
