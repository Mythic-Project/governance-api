import { MigrationInterface, QueryRunner } from "typeorm";
export declare class User1660048272853 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
