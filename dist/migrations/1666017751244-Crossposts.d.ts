import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Crossposts1666017751244 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
