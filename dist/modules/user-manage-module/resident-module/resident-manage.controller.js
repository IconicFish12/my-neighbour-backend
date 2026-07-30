"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ResidentManageController", {
    enumerable: true,
    get: function() {
        return ResidentManageController;
    }
});
const _common = require("@nestjs/common");
const _residentmanageservice = require("./resident-manage.service");
const _createresidentmanagedto = require("../../../dtos/requests/create/create-resident-manage.dto");
const _updateresidentmanagedto = require("../../../dtos/requests/update/update-resident-manage.dto");
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
let ResidentManageController = class ResidentManageController {
    create(createResidentManageDto) {
        return this.residentManageService.create(createResidentManageDto);
    }
    findAll() {
        return this.residentManageService.findAll();
    }
    findOne(id) {
        return this.residentManageService.findOne(id);
    }
    update(id, updateResidentManageDto) {
        return this.residentManageService.update(id, updateResidentManageDto);
    }
    remove(id) {
        return this.residentManageService.remove(id);
    }
    constructor(residentManageService){
        this.residentManageService = residentManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createresidentmanagedto.CreateResidentManageDto === "undefined" ? Object : _createresidentmanagedto.CreateResidentManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ResidentManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ResidentManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ResidentManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateresidentmanagedto.UpdateResidentManageDto === "undefined" ? Object : _updateresidentmanagedto.UpdateResidentManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ResidentManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ResidentManageController.prototype, "remove", null);
ResidentManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _residentmanageservice.ResidentManageService === "undefined" ? Object : _residentmanageservice.ResidentManageService
    ])
], ResidentManageController);

//# sourceMappingURL=resident-manage.controller.js.map