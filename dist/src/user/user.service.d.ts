import { PublicKey } from '@solana/web3.js';
import * as OP from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import { Repository } from 'typeorm';
import * as errors from '@lib/errors/gql';
import { Data, User } from './entities/User.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(authId: string, publicKey: PublicKey, data: Data): TE.TaskEither<errors.Exception, User>;
    getOrCreateUser(authId: string, publicKey: PublicKey): TE.TaskEither<errors.Exception, User>;
    getUserById(id: string): TE.TaskEither<errors.Exception, OP.None | OP.Some<User>>;
    getUserByAuthId(authId: string): TE.TaskEither<errors.Exception, OP.None | OP.Some<User>>;
}
