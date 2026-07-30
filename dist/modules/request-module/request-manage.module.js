"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RequestManageModule", {
    enumerable: true,
    get: function() {
        return RequestManageModule;
    }
});
const _common = require("@nestjs/common");
const _complaintmanagemodule = require("./compliant-module/complaint-manage.module");
const _databasemodule = require("../../database/database.module");
const _usersmanagemodule = require("../user-manage-module/users-manage.module");
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
let RequestManageModule = class RequestManageModule {
};
RequestManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _complaintmanagemodule.ComplaintManageModule,
            _usersmanagemodule.UsersManageModule
        ],
        exports: [
            _complaintmanagemodule.ComplaintManageModule
        ]
    })
], RequestManageModule);

//# sourceMappingURL=request-manage.module.js.map