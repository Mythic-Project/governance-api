import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ConfigService } from '@src/config/config.service';
import { UserService } from '@src/user/user.service';
export declare class AuthJwtInterceptor implements NestInterceptor {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UserService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<import("rxjs").Observable<any>>;
}
