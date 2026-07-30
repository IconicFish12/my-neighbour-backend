"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmployeeManageModule", {
    enumerable: true,
    get: function() {
        return EmployeeManageModule;
    }
});
const _common = require("@nestjs/common");
const _employeemanageservice = require("./employee-manage.service");
const _employeemanagecontroller = require("./employee-manage.controller");
const _databasemodule = require("../../../database/database.module");
const _databaseservice = require("../../../database/database.service");
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
let EmployeeManageModule = class EmployeeManageModule {
};
EmployeeManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule
        ],
        controllers: [
            _employeemanagecontroller.EmployeeManageController
        ],
        providers: [
            _employeemanageservice.EmployeeManageService,
            _databaseservice.DatabaseService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _employeemanageservice.EmployeeManageService
        ]
    })
], EmployeeManageModule);

//# sourceMappingURL=employee-manage.module.js.map