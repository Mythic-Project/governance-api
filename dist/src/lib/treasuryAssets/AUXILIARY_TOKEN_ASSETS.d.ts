import { PublicKey } from "@solana/web3.js";
interface Asset {
    owner: PublicKey;
    accounts: PublicKey[];
}
interface AssetDefinition {
    [key: string]: Asset[];
}
export declare const AUXILIARY_TOKEN_ASSETS: AssetDefinition;
export {};
