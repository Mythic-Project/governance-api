"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
function decode(a) {
    if (typeof window === 'undefined') {
        return Buffer.from(a, 'base64').toString('binary');
    }
    else {
        return window.atob(a);
    }
}
exports.decode = decode;
function encode(b) {
    if (typeof window === 'undefined') {
        return Buffer.from(b).toString('base64');
    }
    else {
        return window.btoa(b);
    }
}
exports.encode = encode;
//# sourceMappingURL=index.js.map