"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmPostAuthor1661530384910 = void 0;
class RealmPostAuthor1661530384910 {
    constructor() {
        this.name = 'RealmPostAuthor1661530384910';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "realm_post"
            ADD "authorId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "realm_post"
            ADD CONSTRAINT "FK_9d06be18d3a8c7e9aa11c983716" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "realm_post" DROP CONSTRAINT "FK_9d06be18d3a8c7e9aa11c983716"
        `);
        await queryRunner.query(`
            ALTER TABLE "realm_post" DROP COLUMN "authorId"
        `);
    }
}
exports.RealmPostAuthor1661530384910 = RealmPostAuthor1661530384910;
//# sourceMappingURL=1661530384910-RealmPostAuthor.js.map