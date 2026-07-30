"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentsManageModule", {
    enumerable: true,
    get: function() {
        return PaymentsManageModule;
    }
});
const _common = require("@nestjs/common");
const _paymentsmanageservice = require("./payments-manage.service");
const _paymentsmanagecontroller = require("./payments-manage.controller");
const _billingmanagemodule = require("../billing-module/billing-manage.module");
const _residentmanagemodule = require("../../user-manage-module/resident-module/resident-manage.module");
const _unitmanagemodule = require("../../unit-manage-module/unit-manage.module");
const _databaseservice = require("../../../database/database.service");
const _generalHelper = require("../../../common/helper/generalHelper");
const _databasemodule = require("../../../database/database.module");
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
let PaymentsManageModule = class PaymentsManageModule {
};
PaymentsManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _billingmanagemodule.BillingManageModule,
            _residentmanagemodule.ResidentManageModule,
            _unitmanagemodule.UnitManageModule
        ],
        controllers: [
            _paymentsmanagecontroller.PaymentsManageController
        ],
        providers: [
            _paymentsmanageservice.PaymentsManageService,
            _databaseservice.DatabaseService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _paymentsmanageservice.PaymentsManageService
        ]
    })
], PaymentsManageModule);

//# sourceMappingURL=payments-manage.module.js.map