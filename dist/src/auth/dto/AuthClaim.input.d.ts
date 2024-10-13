import { PublicKey } from '@solana/web3.js';
export declare class AuthClaimInput {
    onBehalfOf: PublicKey;
    nonce: string;
    created: Date;
}
