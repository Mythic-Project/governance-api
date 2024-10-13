"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tvl1678984784896 = void 0;
class Tvl1678984784896 {
    constructor() {
        this.name = 'Tvl1678984784896';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "tvl" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "data" jsonb NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "pending" boolean NOT NULL,
                "deleted" TIMESTAMP,
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_e5d299acd9e2c7281078c306d1d" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "tvl"
        `);
    }
}
exports.Tvl1678984784896 = Tvl1678984784896;
//# sourceMappingURL=1678984784896-Tvl.js.map