"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentsManageService", {
    enumerable: true,
    get: function() {
        return PaymentsManageService;
    }
});
const _common = require("@nestjs/common");
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
let PaymentsManageService = class PaymentsManageService {
    create(createRequest) {
        return 'This action adds a new paymentsManage';
    }
    findAll() {
        return `This action returns all paymentsManage`;
    }
    findOne(id) {
        return `This action returns a #${id} paymentsManage`;
    }
    update(id, updateRequest) {
        return `This action updates a #${id} paymentsManage`;
    }
    remove(id) {
        return `This action removes a #${id} paymentsManage`;
    }
};
PaymentsManageService = _ts_decorate([
    (0, _common.Injectable)()
], PaymentsManageService);

//# sourceMappingURL=payments-manage.service.js.map