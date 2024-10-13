interface Options<R, F extends ((...args: any[]) => Promise<R>)> {
    ttl?: number;
    key?: (...args: Parameters<F>) => string;
}
export declare const dedupe: <R, F extends (...args: any[]) => Promise<R>>(fn: F, options?: Options<R, F> | undefined) => F;
export {};
