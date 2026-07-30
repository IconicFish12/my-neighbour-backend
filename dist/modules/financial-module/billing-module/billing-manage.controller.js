"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingManageController", {
    enumerable: true,
    get: function() {
        return BillingManageController;
    }
});
const _common = require("@nestjs/common");
const _billingmanageservice = require("./billing-manage.service");
const _createbillingmanagedto = require("../../../dtos/requests/create/create-billing-manage.dto");
const _updatebillingmanagedto = require("../../../dtos/requests/update/update-billing-manage.dto");
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
let BillingManageController = class BillingManageController {
    create(createBillingManageDto) {
        return this.billingManageService.create(createBillingManageDto);
    }
    findAll() {
        return this.billingManageService.findAll();
    }
    findOne(id) {
        return this.billingManageService.findOne(id);
    }
    update(id, updateBillingManageDto) {
        return this.billingManageService.update(id, updateBillingManageDto);
    }
    remove(id) {
        return this.billingManageService.remove(id);
    }
    constructor(billingManageService){
        this.billingManageService = billingManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createbillingmanagedto.CreateBillingManageDto === "undefined" ? Object : _createbillingmanagedto.CreateBillingManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], BillingManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatebillingmanagedto.UpdateBillingManageDto === "undefined" ? Object : _updatebillingmanagedto.UpdateBillingManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingManageController.prototype, "remove", null);
BillingManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _billingmanageservice.BillingManageService === "undefined" ? Object : _billingmanageservice.BillingManageService
    ])
], BillingManageController);

//# sourceMappingURL=billing-manage.controller.js.map