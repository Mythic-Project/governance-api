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
var TaskDedupeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDedupeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
const EI = require("fp-ts/Either");
const FN = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const typeorm_2 = require("typeorm");
const errors = require("../lib/errors/gql");
const exists_1 = require("../lib/typeGuards/exists");
const wait_1 = require("../lib/wait");
const TaskDedupe_entity_1 = require("./entities/TaskDedupe.entity");
let TaskDedupeService = TaskDedupeService_1 = class TaskDedupeService {
    constructor(cacheManager, taskDedupeRepository) {
        this.cacheManager = cacheManager;
        this.taskDedupeRepository = taskDedupeRepository;
        this.taskMap = new Map();
        this.logger = new common_1.Logger(TaskDedupeService_1.name);
    }
    dedupe(args) {
        const ttl = args.ttl || 1000;
        const processed = this.taskMap.get(args.key);
        if (processed) {
            this.logger.log(`In memory dedupe of ${args.key}`);
            return FN.pipe(() => processed);
        }
        let resolver;
        const promise = new Promise((resolve) => {
            resolver = resolve;
        });
        this.taskMap.set(args.key, promise);
        return FN.pipe(TE.tryCatch(() => this.cacheManager.get(args.key), (e) => new errors.Exception(e)), TE.chainW((result) => {
            if (result) {
                this.logger.log(`In memory cache of ${args.key}`);
                resolver(EI.right(result));
                this.taskMap.delete(args.key);
                return TE.right(result);
            }
            else {
                return FN.pipe(TE.tryCatch(() => this.taskDedupeRepository.findOne({ where: { key: args.key } }), (e) => new errors.Exception(e)), TE.chainW((existingTask) => {
                    if (existingTask &&
                        (0, exists_1.exists)(existingTask.result) &&
                        (0, date_fns_1.differenceInMilliseconds)(Date.now(), existingTask.updated) < ttl) {
                        this.logger.log(`Database cache of ${args.key}`);
                        return TE.right(existingTask.result);
                    }
                    else if (existingTask && (0, exists_1.exists)(existingTask.result)) {
                        this.logger.log(`Database cache expired, re-executing ${args.key}`);
                        existingTask.result = null;
                        return FN.pipe(TE.tryCatch(() => this.taskDedupeRepository.save(existingTask), (e) => new errors.Exception(e)), TE.chainW(() => args.fn), TE.chainW((result) => {
                            existingTask.result = result;
                            return TE.tryCatch(() => this.taskDedupeRepository.save(existingTask), (e) => new errors.Exception(e));
                        }), TE.map((task) => task.result));
                    }
                    else if (existingTask &&
                        (0, date_fns_1.differenceInMilliseconds)(Date.now(), existingTask.updated) < ttl) {
                        this.logger.log(`Waiting on results for ${args.key}`);
                        return FN.pipe((0, wait_1.waitTE)(1000), TE.chainW(() => this.dedupe(args)));
                    }
                    else {
                        this.logger.log(`No database cache, executing ${args.key}`);
                        const task = this.taskDedupeRepository.create({
                            key: args.key,
                            result: null,
                        });
                        return FN.pipe(TE.tryCatch(() => this.taskDedupeRepository.save(task), (e) => new errors.Exception(e)), TE.chainW(() => args.fn), TE.chainW((result) => {
                            task.result = result;
                            return TE.tryCatch(() => this.taskDedupeRepository.save(task), (e) => new errors.Exception(e));
                        }), TE.map((task) => task.result));
                    }
                }), TE.matchW((e) => {
                    resolver(EI.left(e));
                    this.taskMap.delete(args.key);
                    return EI.left(e);
                }, (r) => {
                    resolver(EI.right(r));
                    this.taskMap.delete(args.key);
                    return EI.right(r);
                }), TE.of, TE.flattenW, TE.chainW((result) => {
                    if (args.ttl) {
                        return TE.tryCatch(() => this.cacheManager.set(args.key, result, ttl / 1000), (e) => new errors.Exception(e));
                    }
                    return TE.right(result);
                }));
            }
        }));
    }
};
TaskDedupeService = TaskDedupeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_1.InjectRepository)(TaskDedupe_entity_1.TaskDedupe)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository])
], TaskDedupeService);
exports.TaskDedupeService = TaskDedupeService;
//# sourceMappingURL=task-dedupe.service.js.map