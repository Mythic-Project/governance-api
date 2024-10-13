"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSolAccounts = void 0;
function getSolAccounts(owners, commitment) {
    return fetch(process.env.RPC_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(owners.map((pk) => ({
            jsonrpc: '2.0',
            id: 1,
            method: 'getAccountInfo',
            params: [
                pk.toBase58(),
                {
                    commitment,
                    encoding: 'jsonParsed',
                },
            ],
        }))),
    }).then((resp) => resp.json())
        .then(resp => resp.map(({ result }) => result).flat())
        .then(results => results.map((result, i) => (Object.assign(Object.assign({}, result), { owner: owners[i] }))));
}
exports.getSolAccounts = getSolAccounts;
//# sourceMappingURL=getSolAccounts.js.map