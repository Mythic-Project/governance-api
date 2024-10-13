/// <reference types="node" />
import { AccountInfo } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
export declare function parseTokenAccountData(account: PublicKey, data: Buffer): AccountInfo;
