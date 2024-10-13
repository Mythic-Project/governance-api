import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Feed1661291478011 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
