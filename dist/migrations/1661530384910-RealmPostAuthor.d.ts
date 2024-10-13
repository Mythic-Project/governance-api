import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RealmPostAuthor1661530384910 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
