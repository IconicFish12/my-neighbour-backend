"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackendApiModule", {
    enumerable: true,
    get: function() {
        return BackendApiModule;
    }
});
const _common = require("@nestjs/common");
const _communicationmodule = require("./communication-module/communication.module");
const _contactmanagemodule = require("./contact-module/contact-manage.module");
const _financialmodule = require("./financial-module/financial.module");
const _reportsmanagemodule = require("./reports-module/reports-manage.module");
const _securitymanagemodule = require("./security-module/security-manage.module");
const _unitmanagemodule = require("./unit-manage-module/unit-manage.module");
const _usersmanagemodule = require("./user-manage-module/users-manage.module");
const _requestmanagemodule = require("./request-module/request-manage.module");
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
let BackendApiModule = class BackendApiModule {
};
BackendApiModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _financialmodule.FinancialModule,
            _communicationmodule.CommunicationModule,
            _contactmanagemodule.ContactManageModule,
            _reportsmanagemodule.ReportsManageModule,
            _securitymanagemodule.SecurityManageModule,
            _unitmanagemodule.UnitManageModule,
            _usersmanagemodule.UsersManageModule,
            _requestmanagemodule.RequestManageModule
        ],
        exports: [
            _financialmodule.FinancialModule,
            _communicationmodule.CommunicationModule,
            _contactmanagemodule.ContactManageModule,
            _reportsmanagemodule.ReportsManageModule,
            _securitymanagemodule.SecurityManageModule,
            _unitmanagemodule.UnitManageModule,
            _usersmanagemodule.UsersManageModule,
            _requestmanagemodule.RequestManageModule
        ]
    })
], BackendApiModule);

//# sourceMappingURL=backend-api.module.js.map