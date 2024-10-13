import type { PublicKey } from "@solana/web3.js";
export declare function getSolAccounts(owners: PublicKey[], commitment?: string): Promise<{
    owner: PublicKey;
    value: null | {
        data: any[];
        executable: boolean;
        lamports: number;
        owner: string;
        rentEpoch: number;
    };
}[]>;
