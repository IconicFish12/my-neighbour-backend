"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForumCommentManageController", {
    enumerable: true,
    get: function() {
        return ForumCommentManageController;
    }
});
const _common = require("@nestjs/common");
const _forumcommentmanageservice = require("./forum-comment-manage.service");
const _createforumcommentmanagedto = require("../../../dtos/requests/create/create-forum-comment-manage.dto");
const _updateforumcommentmanagedto = require("../../../dtos/requests/update/update-forum-comment-manage.dto");
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
let ForumCommentManageController = class ForumCommentManageController {
    create(createForumCommentManageDto) {
        return this.forumCommentManageService.create(createForumCommentManageDto);
    }
    findAll() {
        return this.forumCommentManageService.findAll();
    }
    findOne(id) {
        return this.forumCommentManageService.findOne(id);
    }
    update(id, updateForumCommentManageDto) {
        return this.forumCommentManageService.update(id, updateForumCommentManageDto);
    }
    remove(id) {
        return this.forumCommentManageService.remove(id);
    }
    constructor(forumCommentManageService){
        this.forumCommentManageService = forumCommentManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createforumcommentmanagedto.CreateForumCommentManageDto === "undefined" ? Object : _createforumcommentmanagedto.CreateForumCommentManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumCommentManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ForumCommentManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumCommentManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateforumcommentmanagedto.UpdateForumCommentManageDto === "undefined" ? Object : _updateforumcommentmanagedto.UpdateForumCommentManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumCommentManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumCommentManageController.prototype, "remove", null);
ForumCommentManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _forumcommentmanageservice.ForumCommentManageService === "undefined" ? Object : _forumcommentmanageservice.ForumCommentManageService
    ])
], ForumCommentManageController);

//# sourceMappingURL=forum-comment-manage.controller.js.map