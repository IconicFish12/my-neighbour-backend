"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExportsManageModule", {
    enumerable: true,
    get: function() {
        return ExportsManageModule;
    }
});
const _common = require("@nestjs/common");
const _exportsmanageservice = require("./exports-manage.service");
const _reportsmanagemodule = require("../../../modules/reports-module/reports-manage.module");
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
let ExportsManageModule = class ExportsManageModule {
};
ExportsManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _reportsmanagemodule.ReportsManageModule
        ],
        providers: [
            _exportsmanageservice.ExportsManageService
        ],
        exports: [
            _exportsmanageservice.ExportsManageService
        ]
    })
], ExportsManageModule);

//# sourceMappingURL=exports-manage.module.js.map