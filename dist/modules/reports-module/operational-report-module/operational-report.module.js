"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OperationalReportModule", {
    enumerable: true,
    get: function() {
        return OperationalReportModule;
    }
});
const _common = require("@nestjs/common");
const _operationalreportservice = require("./operational-report.service");
const _operationalreportcontroller = require("./operational-report.controller");
const _usersmanagemodule = require("../../user-manage-module/users-manage.module");
const _communicationmodule = require("../../communication-module/communication.module");
const _securitymanagemodule = require("../../security-module/security-manage.module");
const _requestmanagemodule = require("../../request-module/request-manage.module");
const _unitmanagemodule = require("../../unit-manage-module/unit-manage.module");
const _databasemodule = require("../../../database/database.module");
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
let OperationalReportModule = class OperationalReportModule {
};
OperationalReportModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _usersmanagemodule.UsersManageModule,
            _communicationmodule.CommunicationModule,
            _unitmanagemodule.UnitManageModule,
            _requestmanagemodule.RequestManageModule,
            _securitymanagemodule.SecurityManageModule,
            _securitymanagemodule.SecurityManageModule
        ],
        controllers: [
            _operationalreportcontroller.OperationalReportController
        ],
        providers: [
            _operationalreportservice.OperationalReportService,
            _databaseservice.DatabaseService
        ],
        exports: [
            _operationalreportservice.OperationalReportService
        ]
    })
], OperationalReportModule);

//# sourceMappingURL=operational-report.module.js.map