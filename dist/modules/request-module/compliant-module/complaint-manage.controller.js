"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ComplaintManageController", {
    enumerable: true,
    get: function() {
        return ComplaintManageController;
    }
});
const _common = require("@nestjs/common");
const _complaintmanageservice = require("./complaint-manage.service");
const _createcomplaintmanagedto = require("../../../dtos/requests/create/create-complaint-manage.dto");
const _updatecomplaintmanagedto = require("../../../dtos/requests/update/update-complaint-manage.dto");
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
let ComplaintManageController = class ComplaintManageController {
    create(createComplaintManageDto) {
        return this.complaintManageService.create(createComplaintManageDto);
    }
    findAll() {
        return this.complaintManageService.findAll();
    }
    findOne(id) {
        return this.complaintManageService.findOne(id);
    }
    update(id, updateComplaintManageDto) {
        return this.complaintManageService.update(id, updateComplaintManageDto);
    }
    remove(id) {
        return this.complaintManageService.remove(id);
    }
    constructor(complaintManageService){
        this.complaintManageService = complaintManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createcomplaintmanagedto.CreateComplaintManageDto === "undefined" ? Object : _createcomplaintmanagedto.CreateComplaintManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ComplaintManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ComplaintManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ComplaintManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatecomplaintmanagedto.UpdateComplaintManageDto === "undefined" ? Object : _updatecomplaintmanagedto.UpdateComplaintManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ComplaintManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ComplaintManageController.prototype, "remove", null);
ComplaintManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _complaintmanageservice.ComplaintManageService === "undefined" ? Object : _complaintmanageservice.ComplaintManageService
    ])
], ComplaintManageController);

//# sourceMappingURL=complaint-manage.controller.js.map