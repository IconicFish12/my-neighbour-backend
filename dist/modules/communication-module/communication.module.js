"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationModule = void 0;
const common_1 = require("@nestjs/common");
const announcement_manage_module_1 = require("./announcement-module/announcement-manage.module");
const forum_post_manage_module_1 = require("./forum-post-module/forum-post-manage.module");
const forum_comment_manage_module_1 = require("./forum-comment-module/forum-comment-manage.module");
const database_module_1 = require("../../common/database/database.module");
const resident_manage_module_1 = require("../user-manage-module/resident-module/resident-manage.module");
const employee_manage_module_1 = require("../user-manage-module/employee-module/employee-manage.module");
const forum_tag_manage_module_1 = require("./forum-tag-module/forum-tag-manage.module");
let CommunicationModule = class CommunicationModule {
};
exports.CommunicationModule = CommunicationModule;
exports.CommunicationModule = CommunicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            announcement_manage_module_1.AnnouncementManageModule,
            forum_post_manage_module_1.ForumPostManageModule,
            forum_comment_manage_module_1.ForumCommentManageModule,
            resident_manage_module_1.ResidentManageModule,
            employee_manage_module_1.EmployeeManageModule,
            forum_tag_manage_module_1.ForumTagManageModule,
        ],
        exports: [
            announcement_manage_module_1.AnnouncementManageModule,
            forum_post_manage_module_1.ForumPostManageModule,
            forum_comment_manage_module_1.ForumCommentManageModule,
        ],
    })
], CommunicationModule);
//# sourceMappingURL=communication.module.js.map