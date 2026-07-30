"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnnouncementManageModule", {
    enumerable: true,
    get: function() {
        return AnnouncementManageModule;
    }
});
const _common = require("@nestjs/common");
const _platformexpress = require("@nestjs/platform-express");
const _announcementmanageservice = require("./announcement-manage.service");
const _announcementmanagecontroller = require("./announcement-manage.controller");
const _databaseservice = require("../../../database/database.service");
const _generalHelper = require("../../../common/helper/generalHelper");
const _employeemanagemodule = require("../../user-manage-module/employee-module/employee-manage.module");
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
let AnnouncementManageModule = class AnnouncementManageModule {
};
AnnouncementManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _employeemanagemodule.EmployeeManageModule,
            _platformexpress.MulterModule.register(_uploadsconfiguration.UploadsConfiguration.defaultConfig)
        ],
        controllers: [
            _announcementmanagecontroller.AnnouncementManageController
        ],
        providers: [
            _announcementmanageservice.AnnouncementManageService,
            _databaseservice.DatabaseService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _announcementmanageservice.AnnouncementManageService
        ]
    })
], AnnouncementManageModule);

//# sourceMappingURL=announcement-manage.module.js.map