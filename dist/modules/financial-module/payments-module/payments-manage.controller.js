"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentsManageController", {
    enumerable: true,
    get: function() {
        return PaymentsManageController;
    }
});
const _common = require("@nestjs/common");
const _paymentsmanageservice = require("./payments-manage.service");
const _createpaymentsmanagedto = require("../../../dtos/requests/create/create-payments-manage.dto");
const _updatepaymentsmanagedto = require("../../../dtos/requests/update/update-payments-manage.dto");
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
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let PaymentsManageController = class PaymentsManageController {
    create(createPaymentsManageDto) {
        return this.paymentsManageService.create(createPaymentsManageDto);
    }
    findAll() {
        return this.paymentsManageService.findAll();
    }
    findOne(id) {
        return this.paymentsManageService.findOne(id);
    }
    update(id, updatePaymentsManageDto) {
        return this.paymentsManageService.update(id, updatePaymentsManageDto);
    }
    remove(id) {
        return this.paymentsManageService.remove(id);
    }
    constructor(paymentsManageService){
        this.paymentsManageService = paymentsManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpaymentsmanagedto.CreatePaymentsManageDto === "undefined" ? Object : _createpaymentsmanagedto.CreatePaymentsManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], PaymentsManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatepaymentsmanagedto.UpdatePaymentsManageDto === "undefined" ? Object : _updatepaymentsmanagedto.UpdatePaymentsManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsManageController.prototype, "remove", null);
PaymentsManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _paymentsmanageservice.PaymentsManageService === "undefined" ? Object : _paymentsmanageservice.PaymentsManageService
    ])
], PaymentsManageController);

//# sourceMappingURL=payments-manage.controller.js.map