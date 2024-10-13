"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrations1668717005862 = void 0;
class migrations1668717005862 {
    constructor() {
        this.name = 'migrations1668717005862';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "discord_user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "authId" character varying NOT NULL,
                "publicKeyStr" character varying NOT NULL,
                "refreshToken" character varying NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted" TIMESTAMP,
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_f1a1fe2a331511fcb2bd709fd35" UNIQUE ("authId"),
                CONSTRAINT "PK_2c465db058d41ca3a50f819b0a1" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "discord_user"
        `);
    }
}
exports.migrations1668717005862 = migrations1668717005862;
//# sourceMappingURL=1668717005862-migrations.js.map