"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrations1669226392574 = void 0;
class migrations1669226392574 {
    constructor() {
        this.name = 'migrations1669226392574';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "matchday_discord_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "authId" character varying NOT NULL, "publicKeyStr" character varying NOT NULL, "refreshToken" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_37fc7ec75dafb5067b39c06c4da" UNIQUE ("authId"), CONSTRAINT "PK_8e842800c3a962d0884febfb3e5" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "matchday_discord_user"`);
    }
}
exports.migrations1669226392574 = migrations1669226392574;
//# sourceMappingURL=1669226392574-migrations.js.map