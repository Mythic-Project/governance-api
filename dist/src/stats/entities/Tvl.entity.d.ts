export interface Data {
    ownTokens: {
        [mintAddress: string]: string;
    };
    tvl: {
        [mintAddress: string]: string;
    };
}
export declare class Tvl {
    id: string;
    data: Data;
    created: Date;
    pending: boolean;
    deleted: Date;
    updated: Date;
}
