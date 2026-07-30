"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ResponseMappingInterceptor", {
    enumerable: true,
    get: function() {
        return ResponseMappingInterceptor;
    }
});
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
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
let ResponseMappingInterceptor = class ResponseMappingInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        let defaultMessage;
        switch(request.method){
            case 'POST':
                defaultMessage = 'Data created successfully.';
                break;
            case 'GET':
                defaultMessage = 'Data retrieved successfully.';
                break;
            case 'PUT':
            case 'PATCH':
                defaultMessage = 'Data updated successfully.';
                break;
            case 'DELETE':
                defaultMessage = 'Data was successfully deleted.';
                break;
            default:
                defaultMessage = 'The operation was successful.';
        }
        return next.handle().pipe((0, _rxjs.map)((data)=>({
                statusCode,
                message: defaultMessage,
                data: data
            })));
    }
};
ResponseMappingInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], ResponseMappingInterceptor);

//# sourceMappingURL=response-mapping.interceptor.js.map