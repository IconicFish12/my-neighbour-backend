/* eslint-disable @typescript-eslint/no-unsafe-member-access */ /* eslint-disable @typescript-eslint/no-unsafe-assignment */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PrismaExceptionFilter", {
    enumerable: true,
    get: function() {
        return PrismaExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _clientts = require("../../database/generated/prisma/client.ts");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PrismaExceptionFilter = class PrismaExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = _common.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Terjadi kesalahan tak terduga di server.';
        let errorType = 'InternalServerError';
        let prismaCode;
        let targetField;
        if (exception instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
            prismaCode = exception.code;
            targetField = exception.meta?.target;
            switch(exception.code){
                case 'P2000':
                    status = _common.HttpStatus.BAD_REQUEST;
                    message = `Value too long for column: ${targetField || 'undefined'}.`;
                    errorType = 'BadRequest';
                    break;
                case 'P2002':
                    status = _common.HttpStatus.CONFLICT;
                    message = `Data already exists for ${targetField ? `column '${targetField}'` : 'unique entry'}.`;
                    errorType = 'Conflict';
                    break;
                case 'P2003':
                    status = _common.HttpStatus.BAD_REQUEST;
                    message = `Data cannot be processed due to invalid relation.`;
                    errorType = 'ForeignKeyConstraintViolation';
                    break;
                case 'P2025':
                    status = _common.HttpStatus.NOT_FOUND;
                    message = `Resource not found.`;
                    errorType = 'NotFound';
                    break;
                case 'P1000':
                case 'P1001':
                case 'P1002':
                    status = _common.HttpStatus.SERVICE_UNAVAILABLE;
                    message = 'Unable to connect to the database. Please try again later.';
                    errorType = 'DatabaseConnectionError';
                    break;
                default:
                    status = _common.HttpStatus.INTERNAL_SERVER_ERROR;
                    message = `A database error occurred: ${exception.message.split('\n')[0]}`;
                    errorType = 'PrismaKnownError';
                    break;
            }
            this.logger.error(`Prisma Known Error (${exception.code}): ${exception.message}`, exception.stack);
        } else if (exception instanceof _clientts.Prisma.PrismaClientValidationError) {
            status = _common.HttpStatus.BAD_REQUEST;
            message = `Database query validation error. Please check your input.`;
            errorType = 'PrismaValidationError';
            this.logger.error(`Prisma Validation Error: ${exception.message}`, exception.stack);
        } else if (exception instanceof _clientts.Prisma.PrismaClientInitializationError) {
            status = _common.HttpStatus.SERVICE_UNAVAILABLE;
            message = 'The application failed to connect to the database on startup.';
            errorType = 'PrismaInitializationError';
            this.logger.error(`Prisma Initialization Error: ${exception.message}`, exception.stack);
        }
        response.status(status).json({
            statusCode: status,
            message: message,
            error: errorType,
            prismaCode: process.env.NODE_ENV !== 'production' ? prismaCode : undefined,
            target: process.env.NODE_ENV !== 'production' ? targetField : undefined
        });
    }
    constructor(){
        this.logger = new _common.Logger(PrismaExceptionFilter.name);
    }
};
PrismaExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_clientts.Prisma.PrismaClientKnownRequestError, _clientts.Prisma.PrismaClientValidationError, _clientts.Prisma.PrismaClientInitializationError)
], PrismaExceptionFilter);

//# sourceMappingURL=prisma-exception.filter.js.map