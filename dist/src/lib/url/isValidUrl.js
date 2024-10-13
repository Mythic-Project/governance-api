"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = void 0;
const url_1 = require("url");
function isValidUrl(text, protocols) {
    try {
        const url = new url_1.URL(text);
        return (protocols === null || protocols === void 0 ? void 0 : protocols.length)
            ? url.protocol
                ? protocols.map(x => `${x.toLowerCase()}:`).includes(url.protocol)
                : false
            : true;
    }
    catch (err) {
        return false;
    }
}
exports.isValidUrl = isValidUrl;
//# sourceMappingURL=isValidUrl.js.map