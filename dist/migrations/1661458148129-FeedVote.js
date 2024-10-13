"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedVote1661458148129 = void 0;
class FeedVote1661458148129 {
    constructor() {
        this.name = 'FeedVote1661458148129';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "realm_feed_item_vote" (
                "feedItemId" integer NOT NULL,
                "userId" uuid NOT NULL,
                "realmPublicKeyStr" character varying NOT NULL,
                "data" jsonb NOT NULL,
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted" TIMESTAMP,
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b38f37a82c7f2026c4615998e67" PRIMARY KEY ("feedItemId", "userId", "realmPublicKeyStr")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "realm_feed_item_vote"
        `);
    }
}
exports.FeedVote1661458148129 = FeedVote1661458148129;
//# sourceMappingURL=1661458148129-FeedVote.js.map