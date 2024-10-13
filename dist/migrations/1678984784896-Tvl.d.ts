import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Tvl1678984784896 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
