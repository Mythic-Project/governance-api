import type { PublicKey } from '@solana/web3.js';
import { Data } from '@src/user/entities/User.entity';
export interface User extends Data {
    id: string;
    publicKey: PublicKey;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
