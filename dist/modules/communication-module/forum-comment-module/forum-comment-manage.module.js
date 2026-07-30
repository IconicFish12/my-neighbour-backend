"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForumCommentManageModule", {
    enumerable: true,
    get: function() {
        return ForumCommentManageModule;
    }
});
const _common = require("@nestjs/common");
const _forumcommentmanageservice = require("./forum-comment-manage.service");
const _forumcommentmanagecontroller = require("./forum-comment-manage.controller");
const _databaseservice = require("../../../database/database.service");
const _generalHelper = require("../../../common/helper/generalHelper");
const _appusermanagemodule = require("../../user-manage-module/app-users-module/app-user-manage.module");
const _employeemanagemodule = require("../../user-manage-module/employee-module/employee-manage.module");
const _residentmanagemodule = require("../../user-manage-module/resident-module/resident-manage.module");
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
let ForumCommentManageModule = class ForumCommentManageModule {
};
ForumCommentManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _appusermanagemodule.AppUserManageModule,
            _employeemanagemodule.EmployeeManageModule,
            _residentmanagemodule.ResidentManageModule
        ],
        controllers: [
            _forumcommentmanagecontroller.ForumCommentManageController
        ],
        providers: [
            _forumcommentmanageservice.ForumCommentManageService,
            _databaseservice.DatabaseService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _forumcommentmanageservice.ForumCommentManageService
        ]
    })
], ForumCommentManageModule);

//# sourceMappingURL=forum-comment-manage.module.js.map