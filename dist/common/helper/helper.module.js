"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HelperModule", {
    enumerable: true,
    get: function() {
        return HelperModule;
    }
});
const _common = require("@nestjs/common");
const _exportsmanagemodule = require("./export/exports-manage.module");
const _mailermanagemodule = require("./mail/mailer-manage.module");
const _generalHelper = require("./generalHelper");
const _midtransmodule = require("./midtrans/midtrans.module");
const _uploadsmodule = require("./uploads/uploads.module");
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
let HelperModule = class HelperModule {
};
HelperModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _exportsmanagemodule.ExportsManageModule,
            _mailermanagemodule.MailerManageModule,
            _midtransmodule.MidtransModule,
            _uploadsmodule.UploadFilesModule
        ],
        providers: [
            _generalHelper.GeneralHelper
        ],
        exports: [
            _exportsmanagemodule.ExportsManageModule,
            _mailermanagemodule.MailerManageModule,
            _midtransmodule.MidtransModule,
            _uploadsmodule.UploadFilesModule
        ]
    })
], HelperModule);

//# sourceMappingURL=helper.module.js.map