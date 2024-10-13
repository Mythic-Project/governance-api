import { Cache } from 'cache-manager';
interface Options<R, F extends (...args: any[]) => Promise<R>> {
    maxStaleAgeMs?: number;
    dedupeKey?: (...args: Parameters<F>) => string;
}
export declare class StaleCacheService {
    private readonly cacheManager;
    private readonly inFlight;
    private readonly logger;
    constructor(cacheManager: Cache);
    dedupe<R, F extends (...args: any[]) => Promise<R>>(fn: F, options?: Options<R, F>): F;
}
export {};
