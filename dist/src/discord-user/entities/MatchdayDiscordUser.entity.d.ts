export declare const ENCRYPTION_CONFIG: {
    key: string;
    algorithm: string;
    ivLength: number;
};
export interface Data {
}
export declare class MatchdayDiscordUser {
    id: string;
    authId: string;
    publicKeyStr: string;
    refreshToken: string;
    created: Date;
    deleted: Date;
    updated: Date;
}
