import { OnModuleInit } from '@nestjs/common';
import { DialectSdk } from './dialect-sdk';
export declare const DIALECT_NOTIF_TYPE_ID_UPVOTE = "7df99a10-ec99-463b-ad5f-a82a7de37a3d";
export declare const DIALECT_NOTIF_TYPE_ID_REPLY = "c3379351-58c5-4eb4-9a2d-75c9abe97a33";
export declare class DialectService implements OnModuleInit {
    private readonly sdk;
    private realmsDapp;
    constructor(sdk: DialectSdk);
    onModuleInit(): Promise<void>;
    sendMessage(title: string, message: string, notificationTypeId: string, recipients?: string[]): Promise<void>;
}
