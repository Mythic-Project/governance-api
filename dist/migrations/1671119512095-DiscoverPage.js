"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoverPage1671119512095 = void 0;
class DiscoverPage1671119512095 {
    constructor() {
        this.name = 'DiscoverPage1671119512095';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "discover_page" (
                "id" SERIAL NOT NULL,
                "data" jsonb NOT NULL,
                "environment" character varying NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted" TIMESTAMP,
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a1d0ed0726579c1087195dfe972" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "discover_page"
        `);
    }
}
exports.DiscoverPage1671119512095 = DiscoverPage1671119512095;
//# sourceMappingURL=1671119512095-DiscoverPage.js.map