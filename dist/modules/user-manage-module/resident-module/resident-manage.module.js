"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ResidentManageModule", {
    enumerable: true,
    get: function() {
        return ResidentManageModule;
    }
});
const _common = require("@nestjs/common");
const _residentmanageservice = require("./resident-manage.service");
const _residentmanagecontroller = require("./resident-manage.controller");
const _databasemodule = require("../../../database/database.module");
const _databaseservice = require("../../../database/database.service");
const _generalHelper = require("../../../common/helper/generalHelper");
const _familyapprovalmanagemodule = require("./familyApproval-module/family-approval-manage.module");
const _familycodemanagemodule = require("./familyCode-module/family-code-manage.module");
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
let ResidentManageModule = class ResidentManageModule {
};
ResidentManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _familyapprovalmanagemodule.FamilyApprovalManageModule,
            _familycodemanagemodule.FamilyCodeManageModule
        ],
        controllers: [
            _residentmanagecontroller.ResidentManageController
        ],
        providers: [
            _residentmanageservice.ResidentManageService,
            _databaseservice.DatabaseService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _residentmanageservice.ResidentManageService
        ]
    })
], ResidentManageModule);

//# sourceMappingURL=resident-manage.module.js.map