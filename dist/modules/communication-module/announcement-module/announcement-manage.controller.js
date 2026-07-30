"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnnouncementManageController", {
    enumerable: true,
    get: function() {
        return AnnouncementManageController;
    }
});
const _common = require("@nestjs/common");
const _announcementmanageservice = require("./announcement-manage.service");
const _createannouncementmanagedto = require("../../../dtos/requests/create/create-announcement-manage.dto");
const _updateannouncementmanagedto = require("../../../dtos/requests/update/update-announcement-manage.dto");
const _platformexpress = require("@nestjs/platform-express");
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
let AnnouncementManageController = class AnnouncementManageController {
    create(createAnnouncementManageDto, files) {
        return this.announcementManageService.create(createAnnouncementManageDto, files);
    }
    findAll() {
        return this.announcementManageService.findAll();
    }
    findOne(id) {
        return this.announcementManageService.findOne(id);
    }
    update(id, updateAnnouncementManageDto, files) {
        return this.announcementManageService.update(id, updateAnnouncementManageDto, files);
    }
    remove(id) {
        return this.announcementManageService.remove(id);
    }
    constructor(announcementManageService){
        this.announcementManageService = announcementManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseInterceptors)((0, _platformexpress.FilesInterceptor)('attachments', 5)),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.UploadedFiles)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createannouncementmanagedto.CreateAnnouncementManageDto === "undefined" ? Object : _createannouncementmanagedto.CreateAnnouncementManageDto,
        Array
    ]),
    _ts_metadata("design:returntype", void 0)
], AnnouncementManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], AnnouncementManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], AnnouncementManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _common.UseInterceptors)((0, _platformexpress.FilesInterceptor)('attachments', 5)),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.UploadedFiles)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateannouncementmanagedto.UpdateAnnouncementManageDto === "undefined" ? Object : _updateannouncementmanagedto.UpdateAnnouncementManageDto,
        Array
    ]),
    _ts_metadata("design:returntype", void 0)
], AnnouncementManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], AnnouncementManageController.prototype, "remove", null);
AnnouncementManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _announcementmanageservice.AnnouncementManageService === "undefined" ? Object : _announcementmanageservice.AnnouncementManageService
    ])
], AnnouncementManageController);

//# sourceMappingURL=announcement-manage.controller.js.map