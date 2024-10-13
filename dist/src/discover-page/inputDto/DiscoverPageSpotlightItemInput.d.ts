import { PublicKey } from '@solana/web3.js';
import { DiscoverPageSpotlightItemStatInput } from './DiscoverPageSpotlightItemStatInput';
export declare class DiscoverPageSpotlightItemInput {
    heroImageUrl: string;
    title: string;
    publicKey: PublicKey;
    description: string;
    stats: DiscoverPageSpotlightItemStatInput[];
}
