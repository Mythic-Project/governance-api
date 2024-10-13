"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EitherResolver = void 0;
const Either_1 = require("fp-ts/Either");
function EitherResolver() {
    return (target, key, descriptor) => {
        if (!descriptor.value) {
            throw new Error('Missing a description for the EitherResolver');
        }
        const original = descriptor.value;
        descriptor.value = async function (...args) {
            let result = original.bind(this)(...args);
            if (typeof result === 'function') {
                result = result();
            }
            if (result instanceof Promise) {
                result = await result;
            }
            if ((0, Either_1.isLeft)(result)) {
                console.error(JSON.stringify(result.left, null, 2));
                throw result.left;
            }
            else {
                return result.right;
            }
        };
    };
}
exports.EitherResolver = EitherResolver;
//# sourceMappingURL=EitherResolver.js.map