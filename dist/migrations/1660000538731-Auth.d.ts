import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Auth1660000538731 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
