"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dedupe = void 0;
const date_fns_1 = require("date-fns");
const cache = new Map();
const inFlight = new Map();
let id = 0;
const dedupe = (fn, options) => {
    const key = (id++).toString();
    return ((...args) => {
        const cacheKey = (options === null || options === void 0 ? void 0 : options.key)
            ? key + options.key(...args)
            : key;
        const cachedValue = cache.get(cacheKey);
        let inFlightValue = inFlight.get(cacheKey);
        if (!inFlightValue) {
            inFlightValue = new Promise(res => {
                fn(...args).then((result) => {
                    cache.set(cacheKey, {
                        value: result,
                        time: Date.now(),
                    });
                    inFlight.delete(cacheKey);
                    res(result);
                });
            });
            inFlight.set(cacheKey, inFlightValue);
        }
        const ttl = (options === null || options === void 0 ? void 0 : options.ttl) || 10000;
        if (cachedValue && Math.abs((0, date_fns_1.differenceInMilliseconds)(Date.now(), cachedValue.time)) < ttl) {
            return Promise.resolve(cachedValue.value);
        }
        return inFlightValue;
    });
};
exports.dedupe = dedupe;
//# sourceMappingURL=index.js.map