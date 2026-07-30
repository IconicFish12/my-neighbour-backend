"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersManageModule", {
    enumerable: true,
    get: function() {
        return UsersManageModule;
    }
});
const _common = require("@nestjs/common");
const _databasemodule = require("../../database/database.module");
const _employeemanagemodule = require("./employee-module/employee-manage.module");
const _residentmanagemodule = require("./resident-module/resident-manage.module");
const _appusermanagemodule = require("./app-users-module/app-user-manage.module");
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
let UsersManageModule = class UsersManageModule {
};
UsersManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _employeemanagemodule.EmployeeManageModule,
            _residentmanagemodule.ResidentManageModule,
            _appusermanagemodule.AppUserManageModule
        ],
        exports: [
            _employeemanagemodule.EmployeeManageModule,
            _residentmanagemodule.ResidentManageModule,
            _appusermanagemodule.AppUserManageModule
        ]
    })
], UsersManageModule);

//# sourceMappingURL=users-manage.module.js.map