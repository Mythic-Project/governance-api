"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClaim1659985471735 = void 0;
class AuthClaim1659985471735 {
    constructor() {
        this.name = 'AuthClaim1659985471735';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "auth_claim" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nonce" character varying NOT NULL,
                "onBehalfOf" character varying NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted" TIMESTAMP,
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b0d640283a501763c9f7e6e942d" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "auth_claim"
        `);
    }
}
exports.AuthClaim1659985471735 = AuthClaim1659985471735;
//# sourceMappingURL=1659985471735-AuthClaim.js.map