"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerManageModule = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const mailer_manage_service_1 = require("./mailer-manage.service");
const mailer_manage_controller_1 = require("./mailer-manage.controller");
const database_module_1 = require("../../database/database.module");
const employee_manage_module_1 = require("../../../modules/user-manage-module/employee-module/employee-manage.module");
const resident_manage_module_1 = require("../../../modules/user-manage-module/resident-module/resident-manage.module");
const mailer_1 = require("@nestjs-modules/mailer");
const pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
const config_1 = require("@nestjs/config");
let MailerManageModule = class MailerManageModule {
};
exports.MailerManageModule = MailerManageModule;
exports.MailerManageModule = MailerManageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            employee_manage_module_1.EmployeeManageModule,
            resident_manage_module_1.ResidentManageModule,
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    transport: {
                        host: configService.get('MAIL_HOST', 'smtp.gmail.com'),
                        port: configService.get('MAIL_PORT', 465),
                        secure: true,
                        auth: {
                            user: configService.get('MAIL_USERNAME'),
                            pass: configService.get('MAIL_PASSWORD'),
                        },
                        pool: true,
                        maxConnections: 5,
                        maxMessages: 100,
                        rateDelta: 20000,
                        rateLimit: 5,
                    },
                    defaults: {
                        from: `"${configService.get('MAIL_FROM_NAME', 'No Reply')}" <${configService.get('MAIL_USERNAME')}>`,
                    },
                    template: {
                        dir: path.join(__dirname, '../mail/templates'),
                        adapter: new pug_adapter_1.PugAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
        ],
        controllers: [mailer_manage_controller_1.MailerManageController],
        providers: [mailer_manage_service_1.MailerManageService],
        exports: [mailer_manage_service_1.MailerManageService],
    })
], MailerManageModule);
//# sourceMappingURL=mailer-manage.module.js.map