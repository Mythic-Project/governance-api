"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StaleCacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaleCacheService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
let StaleCacheService = StaleCacheService_1 = class StaleCacheService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.inFlight = new Map();
        this.logger = new common_1.Logger(StaleCacheService_1.name);
    }
    dedupe(fn, options) {
        const newFn = async (...args) => {
            const cacheKeyBase = fn.toString() +
                ((options === null || options === void 0 ? void 0 : options.dedupeKey)
                    ? options.dedupeKey(...args)
                    : args.map((arg) => String(arg)).join('-'));
            const cacheKey = `stale-cache-${cacheKeyBase}`;
            const maxStaleAgeMs = (options === null || options === void 0 ? void 0 : options.maxStaleAgeMs) || 10;
            const cachedValue = await this.cacheManager.get(cacheKey);
            let inFlightResponse = this.inFlight.get(cacheKey);
            if (!inFlightResponse) {
                inFlightResponse = new Promise((res, rej) => {
                    fn(...args)
                        .then((result) => {
                        return this.cacheManager.set(cacheKey, {
                            value: result,
                            time: Date.now(),
                        }, 0);
                    })
                        .then((result) => {
                        this.inFlight.delete(cacheKey);
                        res(result.value);
                    })
                        .catch((e) => {
                        if (e instanceof Error) {
                            this.logger.error({
                                name: e.name,
                                message: e.message,
                                stack: e.stack,
                            });
                        }
                        else {
                            this.logger.error(e);
                        }
                        this.inFlight.delete(cacheKey);
                        if (cachedValue) {
                            res(cachedValue.value);
                        }
                        else {
                            rej(e);
                        }
                    });
                });
                this.inFlight.set(cacheKey, inFlightResponse);
            }
            if (cachedValue &&
                Math.abs((0, date_fns_1.differenceInMilliseconds)(Date.now(), cachedValue.time)) < maxStaleAgeMs) {
                return cachedValue.value;
            }
            return inFlightResponse;
        };
        return newFn;
    }
};
StaleCacheService = StaleCacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], StaleCacheService);
exports.StaleCacheService = StaleCacheService;
//# sourceMappingURL=stale-cache.service.js.map