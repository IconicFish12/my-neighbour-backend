"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UnitManageController", {
    enumerable: true,
    get: function() {
        return UnitManageController;
    }
});
const _common = require("@nestjs/common");
const _unitmanageservice = require("./unit-manage.service");
const _createunitmanagedto = require("../../dtos/requests/create/create-unit-manage.dto");
const _updateunitmanagedto = require("../../dtos/requests/update/update-unit-manage.dto");
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
let UnitManageController = class UnitManageController {
    create(createUnitManageDto) {
        return this.unitManageService.create(createUnitManageDto);
    }
    findAll() {
        return this.unitManageService.findAll();
    }
    findOne(id) {
        return this.unitManageService.findOne(id);
    }
    update(id, updateUnitManageDto) {
        return this.unitManageService.update(id, updateUnitManageDto);
    }
    remove(id) {
        return this.unitManageService.remove(id);
    }
    constructor(unitManageService){
        this.unitManageService = unitManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createunitmanagedto.CreateUnitManageDto === "undefined" ? Object : _createunitmanagedto.CreateUnitManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], UnitManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], UnitManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], UnitManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateunitmanagedto.UpdateUnitManageDto === "undefined" ? Object : _updateunitmanagedto.UpdateUnitManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], UnitManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], UnitManageController.prototype, "remove", null);
UnitManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _unitmanageservice.UnitManageService === "undefined" ? Object : _unitmanageservice.UnitManageService
    ])
], UnitManageController);

//# sourceMappingURL=unit-manage.controller.js.map