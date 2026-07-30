"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _costumevalidationpipe = require("./common/pipes/costume-validation.pipe");
const _platformexpress = require("@nestjs/platform-express");
const _responsemappinginterceptor = require("./common/interceptors/response-mapping.interceptor");
const _prismaexceptioninterceptor = require("./common/interceptors/prisma-exception.interceptor");
const _errorresponseinterceptor = require("./common/interceptors/error-response.interceptor");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule, new _platformexpress.ExpressAdapter(), {
        cors: true,
        bodyParser: true
    });
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    });
    (0, _classvalidator.useContainer)(app.select(_appmodule.AppModule, {
        abortOnError: true
    }), {
        fallbackOnErrors: true
    });
    app.useGlobalInterceptors(new _responsemappinginterceptor.ResponseMappingInterceptor(), new _prismaexceptioninterceptor.PrismaExceptionInterceptor(), new _errorresponseinterceptor.ErrorResponseInterceptor());
    app.useGlobalPipes(new _common.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (validationErrors = [])=>{
            const formatErrors = (errors)=>{
                const formattedErrors = [];
                for (const error of errors){
                    if (error.constraints) {
                        formattedErrors.push({
                            property: error.property,
                            errors: Object.values(error.constraints)
                        });
                    }
                    if (error.children && error.children.length > 0) {
                        formattedErrors.push(...formatErrors(error.children));
                    }
                }
                return formattedErrors;
            };
            return new _common.BadRequestException({
                message: 'Input Validation Is Failed',
                errors: formatErrors(validationErrors)
            });
        }
    }), new _costumevalidationpipe.CostumeValidationPipe());
    // Development-specific configurations
    const port = process.env.BACKEND_PORT || process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}
process.on('uncaughtException', (error)=>{
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise)=>{
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
bootstrap().catch((error)=>{
    console.error('Application failed to start:', error);
    process.exit(1);
});

//# sourceMappingURL=main.dev.js.map