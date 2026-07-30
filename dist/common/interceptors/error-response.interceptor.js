"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ErrorResponseInterceptor", {
    enumerable: true,
    get: function() {
        return ErrorResponseInterceptor;
    }
});
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
const _operators = require("rxjs/operators");
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
let ErrorResponseInterceptor = class ErrorResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, _operators.catchError)((error)=>{
            const ctx = context.switchToHttp();
            const response = ctx.getResponse();
            let status = _common.HttpStatus.INTERNAL_SERVER_ERROR;
            let message = 'An unexpected error occurred';
            let errors = null;
            if (error instanceof _common.HttpException) {
                status = error.getStatus();
                const responseContent = error.getResponse();
                if (typeof responseContent === 'object' && responseContent !== null) {
                    message = responseContent.message || error.message;
                    errors = responseContent.errors || null;
                } else {
                    message = responseContent;
                }
            } else if (error instanceof Error) {
                message = error.message;
            }
            // Set status code directly on the Express response object
            response.status(status);
            // Map and throw formatted error
            return (0, _rxjs.throwError)(()=>new _common.HttpException({
                    statusCode: status,
                    message,
                    errors
                }, status));
        }));
    }
};
ErrorResponseInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], ErrorResponseInterceptor);

//# sourceMappingURL=error-response.interceptor.js.map