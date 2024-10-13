"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const altair_fastify_plugin_1 = require("altair-fastify-plugin");
const mercurius_upload_1 = require("mercurius-upload");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
async function bootstrap() {
    const fastifyAdapter = new platform_fastify_1.FastifyAdapter();
    const fastifyInstance = fastifyAdapter.getInstance();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, fastifyAdapter);
    const configService = app.get(config_service_1.ConfigService);
    app.register(altair_fastify_plugin_1.default, {
        baseURL: '/playground/',
        initialName: 'Governance API',
        path: '/playground/',
    });
    fastifyInstance.register(mercurius_upload_1.default);
    app.enableCors();
    const host = configService.get('app.host');
    const port = configService.get('app.port');
    if (host) {
        await app.listen(port, host);
    }
    else {
        await app.listen(port);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map