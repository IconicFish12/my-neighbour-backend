"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForumTagManageController", {
    enumerable: true,
    get: function() {
        return ForumTagManageController;
    }
});
const _common = require("@nestjs/common");
const _forumtagmanageservice = require("./forum-tag-manage.service");
const _createforumtagmanagedto = require("../../../dtos/requests/create/create-forum-tag-manage.dto");
const _updateforumtagmanagedto = require("../../../dtos/requests/update/update-forum-tag-manage.dto");
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
let ForumTagManageController = class ForumTagManageController {
    create(createForumTagManageDto) {
        return this.forumTagManageService.create(createForumTagManageDto);
    }
    findAll() {
        return this.forumTagManageService.findAll();
    }
    findOne(id) {
        return this.forumTagManageService.findOne(+id);
    }
    update(id, updateForumTagManageDto) {
        return this.forumTagManageService.update(+id, updateForumTagManageDto);
    }
    remove(id) {
        return this.forumTagManageService.remove(+id);
    }
    constructor(forumTagManageService){
        this.forumTagManageService = forumTagManageService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createforumtagmanagedto.CreateForumTagManageDto === "undefined" ? Object : _createforumtagmanagedto.CreateForumTagManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumTagManageController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], ForumTagManageController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumTagManageController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateforumtagmanagedto.UpdateForumTagManageDto === "undefined" ? Object : _updateforumtagmanagedto.UpdateForumTagManageDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumTagManageController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ForumTagManageController.prototype, "remove", null);
ForumTagManageController = _ts_decorate([
    (0, _common.Controller)('forum-tag-manage'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _forumtagmanageservice.ForumTagManageService === "undefined" ? Object : _forumtagmanageservice.ForumTagManageService
    ])
], ForumTagManageController);

//# sourceMappingURL=forum-tag-manage.controller.js.map