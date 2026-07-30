"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ComplaintManageModule", {
    enumerable: true,
    get: function() {
        return ComplaintManageModule;
    }
});
const _common = require("@nestjs/common");
const _complaintmanageservice = require("./complaint-manage.service");
const _complaintmanagecontroller = require("./complaint-manage.controller");
const _databasemodule = require("../../../database/database.module");
const _databaseservice = require("../../../database/database.service");
const _employeemanagemodule = require("../../user-manage-module/employee-module/employee-manage.module");
const _residentmanagemodule = require("../../user-manage-module/resident-module/resident-manage.module");
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
let ComplaintManageModule = class ComplaintManageModule {
};
ComplaintManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _employeemanagemodule.EmployeeManageModule,
            _residentmanagemodule.ResidentManageModule
        ],
        controllers: [
            _complaintmanagecontroller.ComplaintManageController
        ],
        providers: [
            _complaintmanageservice.ComplaintManageService,
            _databaseservice.DatabaseService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _complaintmanageservice.ComplaintManageService
        ]
    })
], ComplaintManageModule);

//# sourceMappingURL=complaint-manage.module.js.map