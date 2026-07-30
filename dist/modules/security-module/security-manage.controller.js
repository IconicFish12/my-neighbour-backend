"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SecurityManageController", {
    enumerable: true,
    get: function() {
        return SecurityManageController;
    }
});
const _common = require("@nestjs/common");
const _securitymanageservice = require("./security-manage.service");
const _createsecuritymanagedto = require("../../dtos/requests/create/create-security-manage.dto");
const _updatesecuritymanagedto = require("../../dtos/requests/update/update-security-manage.dto");
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
let SecurityManageController = class SecurityManageController {
    create(createSecurityManageDto) {
        return this.securityManageService.create(createSecurityManageDto);
    }
    findAll() {
        return this.securityManageService.findAll();
    }
    findOne(id) {
        return this.securityManageService.findOne(id);
    }
    update(id, updateSecurityManageDto) {
        return this.securityManageService.update(id, updateSecurityManageDto);
    }
    remove(id) {
        return this.securityManageService.remove(id);
    }
    constructor(securityManageService){
        this.securityManageService = securityManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createsecuritymanagedto.CreateSecurityManageDto === "undefined" ? Object : _createsecuritymanagedto.CreateSecurityManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], SecurityManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], SecurityManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SecurityManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatesecuritymanagedto.UpdateSecurityManageDto === "undefined" ? Object : _updatesecuritymanagedto.UpdateSecurityManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], SecurityManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], SecurityManageController.prototype, "remove", null);
SecurityManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _securitymanageservice.SecurityManageService === "undefined" ? Object : _securitymanageservice.SecurityManageService
    ])
], SecurityManageController);

//# sourceMappingURL=security-manage.controller.js.map