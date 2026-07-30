"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForumPostManageModule", {
    enumerable: true,
    get: function() {
        return ForumPostManageModule;
    }
});
const _common = require("@nestjs/common");
const _forumpostmanageservice = require("./forum-post-manage.service");
const _forumpostmanagecontroller = require("./forum-post-manage.controller");
const _databaseservice = require("../../../database/database.service");
const _generalHelper = require("../../../common/helper/generalHelper");
const _appusermanagemodule = require("../../user-manage-module/app-users-module/app-user-manage.module");
const _employeemanagemodule = require("../../user-manage-module/employee-module/employee-manage.module");
const _residentmanagemodule = require("../../user-manage-module/resident-module/resident-manage.module");
const _platformexpress = require("@nestjs/platform-express");
const _uploadsconfiguration = require("../../../common/helper/uploads/uploads-configuration");
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
let ForumPostManageModule = class ForumPostManageModule {
};
ForumPostManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _appusermanagemodule.AppUserManageModule,
            _employeemanagemodule.EmployeeManageModule,
            _residentmanagemodule.ResidentManageModule,
            _platformexpress.MulterModule.register(_uploadsconfiguration.UploadsConfiguration.forumPostConfig)
        ],
        controllers: [
            _forumpostmanagecontroller.ForumPostManageController
        ],
        providers: [
            _forumpostmanageservice.ForumPostManageService,
            _databaseservice.DatabaseService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _forumpostmanageservice.ForumPostManageService
        ]
    })
], ForumPostManageModule);

//# sourceMappingURL=forum-post-manage.module.js.map