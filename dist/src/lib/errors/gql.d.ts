import mercurius from "mercurius";
export declare class Exception extends mercurius.ErrorWithProps {
    constructor(error?: unknown);
}
export declare class MalformedData extends mercurius.ErrorWithProps {
    constructor();
}
export declare class MalformedRequest extends mercurius.ErrorWithProps {
    constructor(message?: string);
}
export declare class NotFound extends mercurius.ErrorWithProps {
    constructor();
}
export declare class NotUnique extends mercurius.ErrorWithProps {
    constructor(field?: string);
}
export declare class RateLimit extends mercurius.ErrorWithProps {
    constructor(action?: string);
}
export declare class Unauthorized extends mercurius.ErrorWithProps {
    constructor();
}
export declare class Unsupported extends mercurius.ErrorWithProps {
    constructor();
}
export declare class UnsupportedDevnet extends mercurius.ErrorWithProps {
    constructor();
}
