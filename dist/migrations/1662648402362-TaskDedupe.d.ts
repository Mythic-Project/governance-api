import { MigrationInterface, QueryRunner } from "typeorm";
export declare class TaskDedupe1662648402362 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
