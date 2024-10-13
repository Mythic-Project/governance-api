"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDedupeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const TaskDedupe_entity_1 = require("./entities/TaskDedupe.entity");
const task_dedupe_service_1 = require("./task-dedupe.service");
let TaskDedupeModule = class TaskDedupeModule {
};
TaskDedupeModule = __decorate([
    (0, common_1.Module)({
        imports: [common_1.CacheModule.register(), typeorm_1.TypeOrmModule.forFeature([TaskDedupe_entity_1.TaskDedupe])],
        providers: [task_dedupe_service_1.TaskDedupeService],
        exports: [task_dedupe_service_1.TaskDedupeService],
    })
], TaskDedupeModule);
exports.TaskDedupeModule = TaskDedupeModule;
//# sourceMappingURL=task-dedupe.module.js.map