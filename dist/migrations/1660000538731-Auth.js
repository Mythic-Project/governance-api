"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth1660000538731 = void 0;
class Auth1660000538731 {
    constructor() {
        this.name = 'Auth1660000538731';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "auth" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "data" jsonb NOT NULL,
                "publicKeyStr" character varying NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted" TIMESTAMP,
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "auth"
        `);
    }
}
exports.Auth1660000538731 = Auth1660000538731;
//# sourceMappingURL=1660000538731-Auth.js.map