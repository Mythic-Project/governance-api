declare class HeliusTransfer {
    amount: number;
    fromUserAccount: string;
    toUserAccount: string;
}
export declare class HeliusWebhookPayload {
    nativeTransfers: HeliusTransfer[];
    tokenTransfers: HeliusTransfer[];
    type: 'TRANSFER' | 'NFT_SALE';
    signature: string;
    events: {
        nft: {
            buyer: string;
            seller: string;
        };
    };
}
export {};
