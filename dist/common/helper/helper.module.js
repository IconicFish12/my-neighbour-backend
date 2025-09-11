"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperModule = void 0;
const common_1 = require("@nestjs/common");
const exports_manage_module_1 = require("./export/exports-manage.module");
const mailer_manage_module_1 = require("./mail/mailer-manage.module");
const generalHelper_1 = require("./generalHelper");
const midtrans_module_1 = require("./midtrans/midtrans.module");
const uploads_module_1 = require("./uploads/uploads.module");
let HelperModule = class HelperModule {
};
exports.HelperModule = HelperModule;
exports.HelperModule = HelperModule = __decorate([
    (0, common_1.Module)({
        imports: [
            exports_manage_module_1.ExportsManageModule,
            mailer_manage_module_1.MailerManageModule,
            midtrans_module_1.MidtransModule,
            uploads_module_1.UploadFilesModule,
        ],
        providers: [generalHelper_1.GeneralHelper],
        exports: [
            exports_manage_module_1.ExportsManageModule,
            mailer_manage_module_1.MailerManageModule,
            midtrans_module_1.MidtransModule,
            uploads_module_1.UploadFilesModule,
        ],
    })
], HelperModule);
//# sourceMappingURL=helper.module.js.map