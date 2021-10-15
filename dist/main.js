"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const morgan = require("morgan");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('APP_PORT'));
    app.use(morgan('dev'));
}
bootstrap();
//# sourceMappingURL=main.js.map