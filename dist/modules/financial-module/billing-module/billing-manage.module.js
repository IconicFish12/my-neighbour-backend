"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingManageModule", {
    enumerable: true,
    get: function() {
        return BillingManageModule;
    }
});
const _common = require("@nestjs/common");
const _billingmanageservice = require("./billing-manage.service");
const _billingmanagecontroller = require("./billing-manage.controller");
const _databasemodule = require("../../../database/database.module");
const _databaseservice = require("../../../database/database.service");
const _unitmanagemodule = require("../../unit-manage-module/unit-manage.module");
const _employeemanagemodule = require("../../user-manage-module/employee-module/employee-manage.module");
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
let BillingManageModule = class BillingManageModule {
};
BillingManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _employeemanagemodule.EmployeeManageModule,
            _unitmanagemodule.UnitManageModule
        ],
        controllers: [
            _billingmanagecontroller.BillingManageController
        ],
        providers: [
            _billingmanageservice.BillingManageService,
            _databaseservice.DatabaseService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _billingmanageservice.BillingManageService
        ]
    })
], BillingManageModule);

//# sourceMappingURL=billing-manage.module.js.map