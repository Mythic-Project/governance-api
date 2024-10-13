"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Realm1668616390010 = void 0;
class Realm1668616390010 {
    constructor() {
        this.name = 'Realm1668616390010';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "realm" (
                "id" SERIAL NOT NULL,
                "data" jsonb NOT NULL,
                "environment" character varying NOT NULL,
                "publicKeyStr" character varying NOT NULL,
                "symbol" character varying,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted" TIMESTAMP,
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_c7757698a0934c102bde0d7f105" UNIQUE ("symbol"),
                CONSTRAINT "UQ_8cf45582e754cc64f8db829ee21" UNIQUE ("publicKeyStr"),
                CONSTRAINT "PK_6537490af0806cafc07ee7c032f" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "realm"
        `);
    }
}
exports.Realm1668616390010 = Realm1668616390010;
//# sourceMappingURL=1668616390010-Realm.js.map