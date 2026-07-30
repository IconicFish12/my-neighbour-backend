"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppUserManageController", {
    enumerable: true,
    get: function() {
        return AppUserManageController;
    }
});
const _common = require("@nestjs/common");
const _appusermanageservice = require("./app-user-manage.service");
const _createappusermanagedto = require("../../../dtos/requests/create/create-app-user-manage.dto");
const _updateappusermanagedto = require("../../../dtos/requests/update/update-app-user-manage.dto");
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
let AppUserManageController = class AppUserManageController {
    create(createAppUserManageDto) {
        return this.appUserManageService.create(createAppUserManageDto);
    }
    findAll() {
        return this.appUserManageService.findAll();
    }
    findOne(id) {
        return this.appUserManageService.findOne(id);
    }
    update(id, updateAppUserManageDto) {
        return this.appUserManageService.update(id, updateAppUserManageDto);
    }
    remove(id) {
        return this.appUserManageService.remove(id);
    }
    constructor(appUserManageService){
        this.appUserManageService = appUserManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createappusermanagedto.CreateAppUserManageDto === "undefined" ? Object : _createappusermanagedto.CreateAppUserManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], AppUserManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], AppUserManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], AppUserManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateappusermanagedto.UpdateAppUserManageDto === "undefined" ? Object : _updateappusermanagedto.UpdateAppUserManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], AppUserManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], AppUserManageController.prototype, "remove", null);
AppUserManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _appusermanageservice.AppUserManageService === "undefined" ? Object : _appusermanageservice.AppUserManageService
    ])
], AppUserManageController);

//# sourceMappingURL=app-user-manage.controller.js.map