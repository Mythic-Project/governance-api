"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedDevnet = exports.Unsupported = exports.Unauthorized = exports.RateLimit = exports.NotUnique = exports.NotFound = exports.MalformedRequest = exports.MalformedData = exports.Exception = void 0;
const mercurius_1 = require("mercurius");
class Exception extends mercurius_1.default.ErrorWithProps {
    constructor(error) {
        super("Internal server error", {
            message: error instanceof Error ? error.message : String(error),
            extensions: error,
        }, 500);
    }
}
exports.Exception = Exception;
class MalformedData extends mercurius_1.default.ErrorWithProps {
    constructor() {
        super("Malformed data", {}, 400);
    }
}
exports.MalformedData = MalformedData;
class MalformedRequest extends mercurius_1.default.ErrorWithProps {
    constructor(message) {
        super(message || "Malformed request", {}, 400);
    }
}
exports.MalformedRequest = MalformedRequest;
class NotFound extends mercurius_1.default.ErrorWithProps {
    constructor() {
        super("Not found", {}, 404);
    }
}
exports.NotFound = NotFound;
class NotUnique extends mercurius_1.default.ErrorWithProps {
    constructor(field) {
        super(field ? `"${field}" must be unique` : 'Not unique', { field }, 422);
    }
}
exports.NotUnique = NotUnique;
class RateLimit extends mercurius_1.default.ErrorWithProps {
    constructor(action) {
        super("You've hit the rate limit", { action }, 409);
    }
}
exports.RateLimit = RateLimit;
class Unauthorized extends mercurius_1.default.ErrorWithProps {
    constructor() {
        super("You are not authorized to perform that action", {}, 403);
    }
}
exports.Unauthorized = Unauthorized;
class Unsupported extends mercurius_1.default.ErrorWithProps {
    constructor() {
        super("That operation is unsupported", {}, 501);
    }
}
exports.Unsupported = Unsupported;
class UnsupportedDevnet extends mercurius_1.default.ErrorWithProps {
    constructor() {
        super("Devnet is not currently supported", {}, 501);
    }
}
exports.UnsupportedDevnet = UnsupportedDevnet;
//# sourceMappingURL=gql.js.map