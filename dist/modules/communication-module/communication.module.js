"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommunicationModule", {
    enumerable: true,
    get: function() {
        return CommunicationModule;
    }
});
const _common = require("@nestjs/common");
const _announcementmanagemodule = require("./announcement-module/announcement-manage.module");
const _forumpostmanagemodule = require("./forum-post-module/forum-post-manage.module");
const _forumcommentmanagemodule = require("./forum-comment-module/forum-comment-manage.module");
const _databasemodule = require("../../database/database.module");
const _residentmanagemodule = require("../user-manage-module/resident-module/resident-manage.module");
const _employeemanagemodule = require("../user-manage-module/employee-module/employee-manage.module");
const _forumtagmanagemodule = require("./forum-tag-module/forum-tag-manage.module");
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
let CommunicationModule = class CommunicationModule {
};
CommunicationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _announcementmanagemodule.AnnouncementManageModule,
            _forumpostmanagemodule.ForumPostManageModule,
            _forumcommentmanagemodule.ForumCommentManageModule,
            _residentmanagemodule.ResidentManageModule,
            _employeemanagemodule.EmployeeManageModule,
            _forumtagmanagemodule.ForumTagManageModule
        ],
        exports: [
            _announcementmanagemodule.AnnouncementManageModule,
            _forumpostmanagemodule.ForumPostManageModule,
            _forumcommentmanagemodule.ForumCommentManageModule
        ]
    })
], CommunicationModule);

//# sourceMappingURL=communication.module.js.map