"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UnitManageModule", {
    enumerable: true,
    get: function() {
        return UnitManageModule;
    }
});
const _common = require("@nestjs/common");
const _unitmanageservice = require("./unit-manage.service");
const _unitmanagecontroller = require("./unit-manage.controller");
const _databasemodule = require("../../database/database.module");
const _databaseservice = require("../../database/database.service");
const _residentmanagemodule = require("../user-manage-module/resident-module/resident-manage.module");
const _generalHelper = require("../../common/helper/generalHelper");
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
let UnitManageModule = class UnitManageModule {
};
UnitManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _residentmanagemodule.ResidentManageModule,
            UnitManageModule
        ],
        controllers: [
            _unitmanagecontroller.UnitManageController
        ],
        providers: [
            _unitmanageservice.UnitManageService,
            _databaseservice.DatabaseService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _unitmanageservice.UnitManageService
        ]
    })
], UnitManageModule);

//# sourceMappingURL=unit-manage.module.js.map