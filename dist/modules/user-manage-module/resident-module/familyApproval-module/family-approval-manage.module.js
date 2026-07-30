"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FamilyApprovalManageModule", {
    enumerable: true,
    get: function() {
        return FamilyApprovalManageModule;
    }
});
const _common = require("@nestjs/common");
const _familyapprovalmanageservice = require("./family-approval-manage.service");
const _familyapprovalmanagecontroller = require("./family-approval-manage.controller");
const _databasemodule = require("../../../../database/database.module");
const _databaseservice = require("../../../../database/database.service");
const _residentmanagemodule = require("../resident-manage.module");
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
let FamilyApprovalManageModule = class FamilyApprovalManageModule {
};
FamilyApprovalManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            (0, _common.forwardRef)(()=>_residentmanagemodule.ResidentManageModule)
        ],
        controllers: [
            _familyapprovalmanagecontroller.FamilyApprovalManageController
        ],
        providers: [
            _familyapprovalmanageservice.FamilyApprovalManageService,
            _databaseservice.DatabaseService
        ],
        exports: [
            _familyapprovalmanageservice.FamilyApprovalManageService
        ]
    })
], FamilyApprovalManageModule);

//# sourceMappingURL=family-approval-manage.module.js.map