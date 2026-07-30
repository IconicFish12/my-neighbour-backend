/* eslint-disable @typescript-eslint/no-unsafe-return */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the NestJS app for Vercel
"default", {
    enumerable: true,
    get: function() {
        return handler;
    }
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
let app;
async function bootstrap() {
    if (app) {
        return app;
    }
    app = await _core.NestFactory.create(_appmodule.AppModule, new _platformexpress.ExpressAdapter(), {
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
    app.useGlobalInterceptors(new _responsemappinginterceptor.ResponseMappingInterceptor(), new _prismaexceptioninterceptor.PrismaExceptionInterceptor(), new _errorresponseinterceptor.ErrorResponseInterceptor());
    await app.init();
    console.log('NestJS application initialized for Vercel');
    return app;
}
async function handler(req, res) {
    try {
        const nestApp = await bootstrap();
        const expressApp = nestApp.getHttpAdapter().getInstance();
        // Let Express handle the request
        return expressApp(req, res);
    } catch (error) {
        console.error('Handler error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

//# sourceMappingURL=main.js.map