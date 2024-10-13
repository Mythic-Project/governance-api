/// <reference types="node" />
import { JwtService } from '@nestjs/jwt';
import { PublicKey } from '@solana/web3.js';
import * as EI from 'fp-ts/Either';
import * as OP from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import * as IT from 'io-ts';
import { Repository } from 'typeorm';
import * as errors from '@lib/errors/gql';
import { User } from '@src/user/entities/User.entity';
import { UserService } from '@src/user/user.service';
import { Auth } from './entities/Auth.entity';
import { AuthClaim } from './entities/AuthClaim.entity';
export declare class AuthService {
    private readonly authRepository;
    private readonly authClaimRepository;
    private readonly jwtService;
    private readonly userService;
    constructor(authRepository: Repository<Auth>, authClaimRepository: Repository<AuthClaim>, jwtService: JwtService, userService: UserService);
    createAuthForPublicKey(publicKey: PublicKey): TE.TaskEither<errors.Exception, Auth>;
    destroyExistingClaims(publicKey: PublicKey): TE.TaskEither<errors.Exception, boolean>;
    extractClaimFromClaimStr(claimStr: string): EI.Either<IT.Errors | errors.MalformedData, {
        onBehalfOf: PublicKey;
        nonce: string;
        created: Date;
    }>;
    generateJWT(user: User): string;
    getAuthById(id: string): TE.TaskEither<errors.Exception, OP.None | OP.Some<Auth>>;
    getAuthByPublicKey(publicKey: PublicKey): TE.TaskEither<errors.Exception, OP.None | OP.Some<Auth>>;
    getOrCreateAuthByPublicKey(publicKey: PublicKey): TE.TaskEither<errors.Exception, Auth>;
    generateClaim(publicKey: PublicKey): TE.TaskEither<errors.Exception, {
        claim: string;
        onBehalfOf: PublicKey;
    }>;
    getClaim(publicKey: PublicKey): TE.TaskEither<errors.Exception, OP.None | OP.Some<AuthClaim>>;
    verifyClaim(claimStr: string, signature: Buffer): TE.TaskEither<Error, User>;
}
