"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nonce = exports.BrandedString = void 0;
const IT = require("io-ts");
const BrandedString = (name, refinement) => IT.brand(IT.string, (str) => refinement ? refinement(str) : typeof str === 'string', name);
exports.BrandedString = BrandedString;
exports.Nonce = (0, exports.BrandedString)('nonce');
//# sourceMappingURL=index.js.map