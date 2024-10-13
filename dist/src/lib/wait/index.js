"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitTE = exports.waitT = exports.wait = void 0;
const TE = require("fp-ts/TaskEither");
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), ms);
    });
}
exports.wait = wait;
function waitT(ms) {
    return () => wait(ms);
}
exports.waitT = waitT;
function waitTE(ms) {
    return TE.fromTask(waitT(ms));
}
exports.waitTE = waitTE;
//# sourceMappingURL=index.js.map