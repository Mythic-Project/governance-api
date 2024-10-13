import { PublicKey } from '@solana/web3.js';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@src/config/config.service';
import { UserService } from '@src/user/user.service';
declare const AuthJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class AuthJwtStrategy extends AuthJwtStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(payload: {
        sub: string;
    }): Promise<{
        id: string;
        publicKey: PublicKey;
        realmsFollowed?: string[] | undefined;
    } | null>;
}
export {};
