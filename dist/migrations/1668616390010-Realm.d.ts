import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Realm1668616390010 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
