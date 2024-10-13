"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batch = void 0;
function batch(items, batchSize = 100) {
    if (items.length <= batchSize) {
        return [items];
    }
    const some = items.slice(0, batchSize);
    const rest = items.slice(batchSize);
    return [some, ...batch(rest, batchSize)];
}
exports.batch = batch;
//# sourceMappingURL=index.js.map