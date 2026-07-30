"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FamilyCodeManageModule", {
    enumerable: true,
    get: function() {
        return FamilyCodeManageModule;
    }
});
const _common = require("@nestjs/common");
const _familycodemanageservice = require("./family-code-manage.service");
const _familycodemanagecontroller = require("./family-code-manage.controller");
const _databasemodule = require("../../../../database/database.module");
const _databaseservice = require("../../../../database/database.service");
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
let FamilyCodeManageModule = class FamilyCodeManageModule {
};
FamilyCodeManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule
        ],
        controllers: [
            _familycodemanagecontroller.FamilyCodeManageController
        ],
        providers: [
            _familycodemanageservice.FamilyCodeManageService,
            _databaseservice.DatabaseService
        ],
        exports: [
            _familycodemanageservice.FamilyCodeManageService
        ]
    })
], FamilyCodeManageModule);

//# sourceMappingURL=family-code-manage.module.js.map