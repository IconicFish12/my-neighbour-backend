"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _core = require("@nestjs/core");
const _common = require("@nestjs/common");
const _appcontroller = require("./app.controller");
const _appservice = require("./app.service");
const _config = require("@nestjs/config");
const _backendapimodule = require("./modules/backend-api.module");
const _authmodule = require("./common/security/auth/auth.module");
const _mailermanagemodule = require("./common/helper/mail/mailer-manage.module");
const _databasemodule = require("./database/database.module");
const _financialmodule = require("./modules/financial-module/financial.module");
const _communicationmodule = require("./modules/communication-module/communication.module");
const _contactmanagemodule = require("./modules/contact-module/contact-manage.module");
const _securitymanagemodule = require("./modules/security-module/security-manage.module");
const _unitmanagemodule = require("./modules/unit-manage-module/unit-manage.module");
const _usersmanagemodule = require("./modules/user-manage-module/users-manage.module");
const _announcementmanagemodule = require("./modules/communication-module/announcement-module/announcement-manage.module");
const _forumcommentmanagemodule = require("./modules/communication-module/forum-comment-module/forum-comment-manage.module");
const _forumpostmanagemodule = require("./modules/communication-module/forum-post-module/forum-post-manage.module");
const _billingmanagemodule = require("./modules/financial-module/billing-module/billing-manage.module");
const _paymentsmanagemodule = require("./modules/financial-module/payments-module/payments-manage.module");
const _employeemanagemodule = require("./modules/user-manage-module/employee-module/employee-manage.module");
const _residentmanagemodule = require("./modules/user-manage-module/resident-module/resident-manage.module");
const _appusermanagemodule = require("./modules/user-manage-module/app-users-module/app-user-manage.module");
const _reportsmanagemodule = require("./modules/reports-module/reports-manage.module");
const _operationalreportmodule = require("./modules/reports-module/operational-report-module/operational-report.module");
const _paymentsreportmodule = require("./modules/reports-module/payments-report-module/payments-report.module");
const _requestmanagemodule = require("./modules/request-module/request-manage.module");
const _complaintmanagemodule = require("./modules/request-module/compliant-module/complaint-manage.module");
const _helpermodule = require("./common/helper/helper.module");
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
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _helpermodule.HelperModule,
            _databasemodule.DatabaseModule,
            _backendapimodule.BackendApiModule,
            _authmodule.AuthModule,
            _config.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            _core.RouterModule.register([
                {
                    path: 'api',
                    module: _backendapimodule.BackendApiModule,
                    children: [
                        {
                            path: 'auth',
                            module: _authmodule.AuthModule
                        },
                        {
                            path: 'users',
                            module: _usersmanagemodule.UsersManageModule,
                            children: [
                                {
                                    path: 'app-users',
                                    module: _appusermanagemodule.AppUserManageModule
                                },
                                {
                                    path: 'resident',
                                    module: _residentmanagemodule.ResidentManageModule
                                },
                                {
                                    path: 'employee',
                                    module: _employeemanagemodule.EmployeeManageModule
                                }
                            ]
                        },
                        {
                            path: 'residential-units',
                            module: _unitmanagemodule.UnitManageModule
                        },
                        {
                            path: 'security-reports',
                            module: _securitymanagemodule.SecurityManageModule
                        },
                        {
                            path: 'financial-manage',
                            module: _financialmodule.FinancialModule,
                            children: [
                                {
                                    path: 'payments',
                                    module: _paymentsmanagemodule.PaymentsManageModule
                                },
                                {
                                    path: 'billing',
                                    module: _billingmanagemodule.BillingManageModule
                                }
                            ]
                        },
                        {
                            path: 'contacts',
                            module: _contactmanagemodule.ContactManageModule
                        },
                        {
                            path: 'resident-request',
                            module: _requestmanagemodule.RequestManageModule,
                            children: [
                                {
                                    path: 'resident-compliant',
                                    module: _complaintmanagemodule.ComplaintManageModule
                                }
                            ]
                        },
                        {
                            path: 'communications',
                            module: _communicationmodule.CommunicationModule,
                            children: [
                                {
                                    path: 'announcements',
                                    module: _announcementmanagemodule.AnnouncementManageModule
                                },
                                {
                                    path: 'forum-post',
                                    module: _forumpostmanagemodule.ForumPostManageModule
                                },
                                {
                                    path: 'forum-comment',
                                    module: _forumcommentmanagemodule.ForumCommentManageModule
                                }
                            ]
                        },
                        {
                            path: 'reports',
                            module: _reportsmanagemodule.ReportsManageModule,
                            children: [
                                {
                                    path: 'operational-report',
                                    module: _operationalreportmodule.OperationalReportModule
                                },
                                {
                                    path: 'payments-report',
                                    module: _paymentsreportmodule.PaymentsReportModule
                                }
                            ]
                        },
                        {
                            path: 'mail',
                            module: _mailermanagemodule.MailerManageModule
                        }
                    ]
                }
            ])
        ],
        controllers: [
            _appcontroller.AppController
        ],
        providers: [
            _appservice.AppService
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map