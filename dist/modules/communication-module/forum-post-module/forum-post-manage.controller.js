"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForumPostManageController", {
    enumerable: true,
    get: function() {
        return ForumPostManageController;
    }
});
const _common = require("@nestjs/common");
const _forumpostmanageservice = require("./forum-post-manage.service");
const _createforumpostmanagedto = require("../../../dtos/requests/create/create-forum-post-manage.dto");
const _updateforumpostmanagedto = require("../../../dtos/requests/update/update-forum-post-manage.dto");
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
let ForumPostManageController = class ForumPostManageController {
    create(createForumPostManageDto, files) {
        return this.forumPostManageService.create(createForumPostManageDto, files);
    }
    findAll() {
        return this.forumPostManageService.findAll();
    }
    findOne(id) {
        return this.forumPostManageService.findOne(id);
    }
    update(id, updateForumPostManageDto, files) {
        return this.forumPostManageService.update(id, updateForumPostManageDto, files);
    }
    remove(id) {
        return this.forumPostManageService.remove(id);
    }
    constructor(forumPostManageService){
        this.forumPostManageService = forumPostManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseInterceptors)((0, _platformexpress.FilesInterceptor)('attachments', 5)),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.UploadedFiles)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createforumpostmanagedto.CreateForumPostManageDto === "undefined" ? Object : _createforumpostmanagedto.CreateForumPostManageDto,
        Array
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumPostManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ForumPostManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumPostManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _common.UseInterceptors)((0, _platformexpress.FilesInterceptor)('attachments', 5)),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.UploadedFiles)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateforumpostmanagedto.UpdateForumPostManageDto === "undefined" ? Object : _updateforumpostmanagedto.UpdateForumPostManageDto,
        Array
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumPostManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumPostManageController.prototype, "remove", null);
ForumPostManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _forumpostmanageservice.ForumPostManageService === "undefined" ? Object : _forumpostmanageservice.ForumPostManageService
    ])
], ForumPostManageController);

//# sourceMappingURL=forum-post-manage.controller.js.map