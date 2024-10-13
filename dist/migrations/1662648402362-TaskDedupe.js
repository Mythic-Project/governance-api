"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDedupe1662648402362 = void 0;
class TaskDedupe1662648402362 {
    constructor() {
        this.name = 'TaskDedupe1662648402362';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "task_dedupe" (
                "id" SERIAL NOT NULL,
                "result" jsonb,
                "key" character varying NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f5fa46cee20cf088a51b8c74a81" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "task_dedupe"
        `);
    }
}
exports.TaskDedupe1662648402362 = TaskDedupe1662648402362;
//# sourceMappingURL=1662648402362-TaskDedupe.js.map