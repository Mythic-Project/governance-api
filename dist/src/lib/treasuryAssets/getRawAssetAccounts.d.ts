import type { PublicKey } from "@solana/web3.js";
export declare function getRawAssetAccounts(owners: PublicKey[], commitment?: string): Promise<{
    result: {
        account: {
            data: any[];
            executable: boolean;
            lamports: number;
            owner: string;
            rentEpoch: number;
        };
        pubkey: string;
    }[];
}[]>;
