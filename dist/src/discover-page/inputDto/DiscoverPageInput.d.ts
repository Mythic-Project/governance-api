import { PublicKey } from '@solana/web3.js';
import { DiscoverPageSpotlightItemInput } from './DiscoverPageSpotlightItemInput';
export declare class DiscoverPageInput {
    daoTooling: PublicKey[];
    defi: PublicKey[];
    gaming: PublicKey[];
    hackathonWinners: PublicKey[];
    keyAnnouncements: number[];
    nftCollections: PublicKey[];
    popular: PublicKey[];
    spotlight: DiscoverPageSpotlightItemInput[];
    trending: PublicKey[];
    web3: PublicKey[];
}
