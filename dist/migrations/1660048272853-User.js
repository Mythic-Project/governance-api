"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User1660048272853 = void 0;
class User1660048272853 {
    constructor() {
        this.name = 'User1660048272853';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "data" jsonb NOT NULL,
                "authId" character varying NOT NULL,
                "publicKeyStr" character varying NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted" TIMESTAMP,
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_ad5065ee18a722baaa932d1c3c6" UNIQUE ("authId"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }
}
exports.User1660048272853 = User1660048272853;
//# sourceMappingURL=1660048272853-User.js.map