"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRawAssetAccounts = void 0;
const spl_governance_1 = require("@solana/spl-governance");
const TOKEN_ACCOUNT_LAYOUT_SPAN = 165;
const TOKEN_OWNER_OFFSET = 32;
function getRawAssetAccounts(owners, commitment) {
    return fetch('http://realms-realms-c335.mainnet.rpcpool.com/258d3727-bb96-409d-abea-0b1b4c48af29/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(owners.map((pk) => ({
            jsonrpc: '2.0',
            id: 1,
            method: 'getProgramAccounts',
            params: [
                spl_governance_1.TOKEN_PROGRAM_ID.toBase58(),
                {
                    commitment,
                    encoding: 'base64',
                    filters: [
                        {
                            dataSize: TOKEN_ACCOUNT_LAYOUT_SPAN,
                        },
                        {
                            memcmp: {
                                offset: TOKEN_OWNER_OFFSET,
                                bytes: pk.toBase58(),
                            },
                        },
                    ],
                },
            ],
        }))),
    }).then((resp) => resp.json());
}
exports.getRawAssetAccounts = getRawAssetAccounts;
//# sourceMappingURL=getRawAssetAccounts.js.map