"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FamilyCodeManageController", {
    enumerable: true,
    get: function() {
        return FamilyCodeManageController;
    }
});
const _common = require("@nestjs/common");
const _familycodemanageservice = require("./family-code-manage.service");
const _createfamilycodemanagedto = require("../../../../dtos/requests/create/create-family-code-manage.dto");
const _updatefamilycodemanagedto = require("../../../../dtos/requests/update/update-family-code-manage.dto");
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
let FamilyCodeManageController = class FamilyCodeManageController {
    create(createFamilyCodeManageDto) {
        return this.familyCodeManageService.create(createFamilyCodeManageDto);
    }
    findAll() {
        return this.familyCodeManageService.findAll();
    }
    findOne(id) {
        return this.familyCodeManageService.findOne(id);
    }
    update(id, updateFamilyCodeManageDto) {
        return this.familyCodeManageService.update(id, updateFamilyCodeManageDto);
    }
    remove(id) {
        return this.familyCodeManageService.remove(id);
    }
    constructor(familyCodeManageService){
        this.familyCodeManageService = familyCodeManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createfamilycodemanagedto.CreateFamilyCodeManageDto === "undefined" ? Object : _createfamilycodemanagedto.CreateFamilyCodeManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], FamilyCodeManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], FamilyCodeManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], FamilyCodeManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatefamilycodemanagedto.UpdateFamilyCodeManageDto === "undefined" ? Object : _updatefamilycodemanagedto.UpdateFamilyCodeManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], FamilyCodeManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], FamilyCodeManageController.prototype, "remove", null);
FamilyCodeManageController = _ts_decorate([
    (0, _common.Controller)('family-code-manage'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _familycodemanageservice.FamilyCodeManageService === "undefined" ? Object : _familycodemanageservice.FamilyCodeManageService
    ])
], FamilyCodeManageController);

//# sourceMappingURL=family-code-manage.controller.js.map