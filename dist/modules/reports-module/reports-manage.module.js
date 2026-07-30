"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReportsManageModule", {
    enumerable: true,
    get: function() {
        return ReportsManageModule;
    }
});
const _common = require("@nestjs/common");
const _databasemodule = require("../../database/database.module");
const _unitmanagemodule = require("../unit-manage-module/unit-manage.module");
const _usersmanagemodule = require("../user-manage-module/users-manage.module");
const _securitymanagemodule = require("../security-module/security-manage.module");
const _operationalreportmodule = require("./operational-report-module/operational-report.module");
const _paymentsreportmodule = require("./payments-report-module/payments-report.module");
const _requestmanagemodule = require("../request-module/request-manage.module");
const _communicationmodule = require("../communication-module/communication.module");
const _contactmanagemodule = require("../contact-module/contact-manage.module");
const _financialmodule = require("../financial-module/financial.module");
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
let ReportsManageModule = class ReportsManageModule {
};
ReportsManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _unitmanagemodule.UnitManageModule,
            _requestmanagemodule.RequestManageModule,
            _usersmanagemodule.UsersManageModule,
            _securitymanagemodule.SecurityManageModule,
            _operationalreportmodule.OperationalReportModule,
            _contactmanagemodule.ContactManageModule,
            _communicationmodule.CommunicationModule,
            _financialmodule.FinancialModule,
            _paymentsreportmodule.PaymentsReportModule
        ],
        exports: [
            _operationalreportmodule.OperationalReportModule,
            _paymentsreportmodule.PaymentsReportModule
        ]
    })
], ReportsManageModule);

//# sourceMappingURL=reports-manage.module.js.map