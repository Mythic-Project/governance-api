import { PublicKey } from '@solana/web3.js';
import { DiscoverPageSpotlightItemStat } from './DiscoverPageSpotlightItemStat';
export declare class DiscoverPageSpotlightItem {
    heroImageUrl: string;
    title: string;
    publicKey: PublicKey;
    description: string;
    stats: DiscoverPageSpotlightItemStat[];
}
