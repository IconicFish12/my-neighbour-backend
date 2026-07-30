"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmployeeManageController", {
    enumerable: true,
    get: function() {
        return EmployeeManageController;
    }
});
const _common = require("@nestjs/common");
const _employeemanageservice = require("./employee-manage.service");
const _createemployeemanagedto = require("../../../dtos/requests/create/create-employee-manage.dto");
const _updateemployeemanagedto = require("../../../dtos/requests/update/update-employee-manage.dto");
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
let EmployeeManageController = class EmployeeManageController {
    create(createEmployeeManageDto) {
        return this.employeeManageService.create(createEmployeeManageDto);
    }
    findAll() {
        return this.employeeManageService.findAll();
    }
    findOne(id) {
        return this.employeeManageService.findOne(id);
    }
    update(id, updateEmployeeManageDto) {
        return this.employeeManageService.update(id, updateEmployeeManageDto);
    }
    remove(id) {
        return this.employeeManageService.remove(id);
    }
    constructor(employeeManageService){
        this.employeeManageService = employeeManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createemployeemanagedto.CreateEmployeeManageDto === "undefined" ? Object : _createemployeemanagedto.CreateEmployeeManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], EmployeeManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], EmployeeManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], EmployeeManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateemployeemanagedto.UpdateEmployeeManageDto === "undefined" ? Object : _updateemployeemanagedto.UpdateEmployeeManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], EmployeeManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], EmployeeManageController.prototype, "remove", null);
EmployeeManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _employeemanageservice.EmployeeManageService === "undefined" ? Object : _employeemanageservice.EmployeeManageService
    ])
], EmployeeManageController);

//# sourceMappingURL=employee-manage.controller.js.map