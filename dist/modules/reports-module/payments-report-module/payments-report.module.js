"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentsReportModule", {
    enumerable: true,
    get: function() {
        return PaymentsReportModule;
    }
});
const _common = require("@nestjs/common");
const _paymentsreportservice = require("./payments-report.service");
const _paymentsreportcontroller = require("./payments-report.controller");
const _paymentsmanagemodule = require("../../financial-module/payments-module/payments-manage.module");
const _databasemodule = require("../../../database/database.module");
const _billingmanagemodule = require("../../financial-module/billing-module/billing-manage.module");
const _databaseservice = require("../../../database/database.service");
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
let PaymentsReportModule = class PaymentsReportModule {
};
PaymentsReportModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _paymentsmanagemodule.PaymentsManageModule,
            _databasemodule.DatabaseModule,
            _billingmanagemodule.BillingManageModule
        ],
        controllers: [
            _paymentsreportcontroller.PaymentsReportController
        ],
        providers: [
            _paymentsreportservice.PaymentsReportService,
            _databaseservice.DatabaseService
        ],
        exports: [
            _paymentsreportservice.PaymentsReportService
        ]
    })
], PaymentsReportModule);

//# sourceMappingURL=payments-report.module.js.map