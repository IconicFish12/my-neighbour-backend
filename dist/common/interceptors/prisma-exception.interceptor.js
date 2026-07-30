"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PrismaExceptionInterceptor", {
    enumerable: true,
    get: function() {
        return PrismaExceptionInterceptor;
    }
});
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
const _operators = require("rxjs/operators");
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
let PrismaExceptionInterceptor = class PrismaExceptionInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, _operators.catchError)((error)=>{
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                return (0, _rxjs.throwError)(()=>this.handlePrismaKnownError(error));
            }
            if (error instanceof _clientts.Prisma.PrismaClientValidationError) {
                return (0, _rxjs.throwError)(()=>this.handlePrismaValidationError(error));
            }
            if (error instanceof _clientts.Prisma.PrismaClientUnknownRequestError) {
                return (0, _rxjs.throwError)(()=>this.handlePrismaUnknownError(error));
            }
            if (error instanceof _clientts.Prisma.PrismaClientInitializationError) {
                return (0, _rxjs.throwError)(()=>this.handlePrismaInitError(error));
            }
            return (0, _rxjs.throwError)(()=>error);
        }));
    }
    handlePrismaKnownError(error) {
        const { code, meta } = error;
        switch(code){
            case 'P2000':
                return new _common.HttpException('The provided value is too long for the field', _common.HttpStatus.BAD_REQUEST);
            case 'P2001':
                return new _common.HttpException('The record searched for does not exist', _common.HttpStatus.NOT_FOUND);
            case 'P2002':
                {
                    const target = meta?.target;
                    const field = target ? target.join(', ') : 'field';
                    return new _common.HttpException(`Duplicate entry: ${field} already exists`, _common.HttpStatus.CONFLICT);
                }
            case 'P2003':
                return new _common.HttpException('Foreign key constraint failed', _common.HttpStatus.BAD_REQUEST);
            case 'P2004':
                return new _common.HttpException('A constraint failed on the database', _common.HttpStatus.BAD_REQUEST);
            case 'P2005':
                return new _common.HttpException('The value stored in the database is invalid for the field type', _common.HttpStatus.BAD_REQUEST);
            case 'P2006':
                return new _common.HttpException('The provided value is not valid', _common.HttpStatus.BAD_REQUEST);
            case 'P2007':
                return new _common.HttpException('Data validation error', _common.HttpStatus.BAD_REQUEST);
            case 'P2008':
                return new _common.HttpException('Failed to parse the query', _common.HttpStatus.BAD_REQUEST);
            case 'P2009':
                return new _common.HttpException('Failed to validate the query', _common.HttpStatus.BAD_REQUEST);
            case 'P2010':
                return new _common.HttpException('Raw query failed', _common.HttpStatus.BAD_REQUEST);
            case 'P2011':
                return new _common.HttpException('Null constraint violation', _common.HttpStatus.BAD_REQUEST);
            case 'P2012':
                return new _common.HttpException('Missing a required value', _common.HttpStatus.BAD_REQUEST);
            case 'P2013':
                return new _common.HttpException('Missing required argument', _common.HttpStatus.BAD_REQUEST);
            case 'P2014':
                return new _common.HttpException('The change would violate a relation constraint', _common.HttpStatus.BAD_REQUEST);
            case 'P2015':
                return new _common.HttpException('A related record could not be found', _common.HttpStatus.NOT_FOUND);
            case 'P2016':
                return new _common.HttpException('Query interpretation error', _common.HttpStatus.BAD_REQUEST);
            case 'P2017':
                return new _common.HttpException('The records for relation are not connected', _common.HttpStatus.BAD_REQUEST);
            case 'P2018':
                return new _common.HttpException('The required connected records were not found', _common.HttpStatus.NOT_FOUND);
            case 'P2019':
                return new _common.HttpException('Input error', _common.HttpStatus.BAD_REQUEST);
            case 'P2020':
                return new _common.HttpException('Value out of range for the type', _common.HttpStatus.BAD_REQUEST);
            case 'P2021':
                return new _common.HttpException('The table does not exist in the database', _common.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2022':
                return new _common.HttpException('The column does not exist in the database', _common.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2025':
                return new _common.HttpException('Record not found', _common.HttpStatus.NOT_FOUND);
            default:
                return new _common.HttpException(`Database error: ${error.message}`, _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    handlePrismaValidationError(_error) {
        return new _common.HttpException('Invalid query parameters or data validation failed', _common.HttpStatus.BAD_REQUEST);
    }
    handlePrismaUnknownError(_error) {
        return new _common.HttpException('An unknown database error occurred', _common.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    handlePrismaInitError(_error) {
        return new _common.HttpException('Database connection failed', _common.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
PrismaExceptionInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], PrismaExceptionInterceptor);

//# sourceMappingURL=prisma-exception.interceptor.js.map