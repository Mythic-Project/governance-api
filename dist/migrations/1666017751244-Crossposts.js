"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crossposts1666017751244 = void 0;
class Crossposts1666017751244 {
    constructor() {
        this.name = 'Crossposts1666017751244';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "realm_feed_item"
            ADD "crosspostedRealms" character varying array
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "realm_feed_item" DROP COLUMN "crosspostedRealms"
        `);
    }
}
exports.Crossposts1666017751244 = Crossposts1666017751244;
//# sourceMappingURL=1666017751244-Crossposts.js.map