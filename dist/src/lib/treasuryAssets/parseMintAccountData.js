"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMintAccountData = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
function parseMintAccountData(data) {
    const mintInfo = spl_token_1.MintLayout.decode(data);
    if (mintInfo.mintAuthorityOption === 0) {
        mintInfo.mintAuthority = null;
    }
    else {
        mintInfo.mintAuthority = new web3_js_1.PublicKey(mintInfo.mintAuthority);
    }
    mintInfo.supply = spl_token_1.u64.fromBuffer(mintInfo.supply);
    mintInfo.isInitialized = mintInfo.isInitialized != 0;
    if (mintInfo.freezeAuthorityOption === 0) {
        mintInfo.freezeAuthority = null;
    }
    else {
        mintInfo.freezeAuthority = new web3_js_1.PublicKey(mintInfo.freezeAuthority);
    }
    return mintInfo;
}
exports.parseMintAccountData = parseMintAccountData;
//# sourceMappingURL=parseMintAccountData.js.map