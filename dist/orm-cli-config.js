"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const typeorm_1 = require("typeorm");
const env = dotenv.config({ path: '.env' });
dotenvExpand.expand(env);
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    connectTimeoutMS: 3000,
    database: process.env.DATABASE_NAME,
    entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
    migrations: ['./migrations/*.ts'],
    migrationsTableName: 'typeorm_migrations',
    password: process.env.DATABASE_PASSWORD,
    ssl: process.env.DATABASE_USE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : undefined,
    username: process.env.DATABASE_USERNAME,
});
//# sourceMappingURL=orm-cli-config.js.map