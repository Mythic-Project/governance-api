export declare const ENCRYPTION_CONFIG: {
    key: string;
    algorithm: string;
    ivLength: number;
};
export interface Data {
}
export declare class DiscordUser {
    id: string;
    authId: string;
    publicKeyStr: string;
    refreshToken: string;
    created: Date;
    deleted: Date;
    updated: Date;
}
