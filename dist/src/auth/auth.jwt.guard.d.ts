import type { ExecutionContext } from '@nestjs/common';
declare const AuthJwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthJwtGuard extends AuthJwtGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
