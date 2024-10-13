/// <reference types="node" />
import { PublicKey } from '@solana/web3.js';
import * as TE from 'fp-ts/TaskEither';
import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    createAuthenticationClaim(publicKey: PublicKey): TE.TaskEither<import("../lib/errors/gql").Exception, {
        claim: string;
        onBehalfOf: PublicKey;
    }>;
    createAuthenticationToken(claim: string, signature: Buffer): TE.TaskEither<Error, string>;
}
