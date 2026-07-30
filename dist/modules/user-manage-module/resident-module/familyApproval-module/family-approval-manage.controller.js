"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FamilyApprovalManageController", {
    enumerable: true,
    get: function() {
        return FamilyApprovalManageController;
    }
});
const _common = require("@nestjs/common");
const _familyapprovalmanageservice = require("./family-approval-manage.service");
const _createfamilyapprovalmanagedto = require("../../../../dtos/requests/create/create-family-approval-manage.dto");
const _updatefamilyapprovalmanagedto = require("../../../../dtos/requests/update/update-family-approval-manage.dto");
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
let FamilyApprovalManageController = class FamilyApprovalManageController {
    create(createFamilyApprovalManageDto) {
        return this.familyApprovalManageService.create(createFamilyApprovalManageDto);
    }
    findAll() {
        return this.familyApprovalManageService.findAll();
    }
    findOne(id) {
        return this.familyApprovalManageService.findOne(id);
    }
    update(id, updateFamilyApprovalManageDto) {
        return this.familyApprovalManageService.update(id, updateFamilyApprovalManageDto);
    }
    remove(id) {
        return this.familyApprovalManageService.remove(id);
    }
    constructor(familyApprovalManageService){
        this.familyApprovalManageService = familyApprovalManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createfamilyapprovalmanagedto.CreateFamilyApprovalManageDto === "undefined" ? Object : _createfamilyapprovalmanagedto.CreateFamilyApprovalManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], FamilyApprovalManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], FamilyApprovalManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], FamilyApprovalManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatefamilyapprovalmanagedto.UpdateFamilyApprovalManageDto === "undefined" ? Object : _updatefamilyapprovalmanagedto.UpdateFamilyApprovalManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], FamilyApprovalManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], FamilyApprovalManageController.prototype, "remove", null);
FamilyApprovalManageController = _ts_decorate([
    (0, _common.Controller)('family-approval-manage'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _familyapprovalmanageservice.FamilyApprovalManageService === "undefined" ? Object : _familyapprovalmanageservice.FamilyApprovalManageService
    ])
], FamilyApprovalManageController);

//# sourceMappingURL=family-approval-manage.controller.js.map