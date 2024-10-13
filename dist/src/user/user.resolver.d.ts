import { Environment } from '@lib/decorators/CurrentEnvironment';
import { User as UserModel } from '@lib/decorators/CurrentUser';
import * as errors from '@lib/errors/gql';
import { ConfigService } from '@src/config/config.service';
import { RealmMemberService } from '@src/realm-member/realm-member.service';
import { Realm } from '@src/realm/dto/Realm';
import { RealmService } from '@src/realm/realm.service';
import { User } from './dto/User';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly configService;
    private readonly realmMemberService;
    private readonly realmService;
    private readonly userService;
    constructor(configService: ConfigService, realmMemberService: RealmMemberService, realmService: RealmService, userService: UserService);
    amSiteAdmin(member: User): true | null;
    civicInfo(member: User, environment: Environment): import("fp-ts/lib/TaskEither").TaskEither<errors.Exception, {
        handle: string;
        avatarlUrl?: string | undefined;
        isVerified: boolean;
    } | undefined>;
    followedRealms(user: User, currentUser: UserModel | null, environment: Environment): Promise<Realm[]>;
    twitterInfo(user: User, environment: Environment): import("fp-ts/lib/TaskEither").TaskEither<errors.Exception, {
        handle: string;
        avatarlUrl?: string | undefined;
    }>;
    me(user: User | null): User | null;
}
