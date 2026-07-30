"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppUserManageModule", {
    enumerable: true,
    get: function() {
        return AppUserManageModule;
    }
});
const _common = require("@nestjs/common");
const _appusermanageservice = require("./app-user-manage.service");
const _appusermanagecontroller = require("./app-user-manage.controller");
const _databasemodule = require("../../../database/database.module");
const _employeemanagemodule = require("../employee-module/employee-manage.module");
const _residentmanagemodule = require("../resident-module/resident-manage.module");
const _databaseservice = require("../../../database/database.service");
const _employeemanageservice = require("../employee-module/employee-manage.service");
const _residentmanageservice = require("../resident-module/resident-manage.service");
const _generalHelper = require("../../../common/helper/generalHelper");
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
let AppUserManageModule = class AppUserManageModule {
};
AppUserManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _residentmanagemodule.ResidentManageModule,
            _employeemanagemodule.EmployeeManageModule
        ],
        controllers: [
            _appusermanagecontroller.AppUserManageController
        ],
        providers: [
            _appusermanageservice.AppUserManageService,
            _databaseservice.DatabaseService,
            _residentmanageservice.ResidentManageService,
            _employeemanageservice.EmployeeManageService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _appusermanageservice.AppUserManageService
        ]
    })
], AppUserManageModule);

//# sourceMappingURL=app-user-manage.module.js.map