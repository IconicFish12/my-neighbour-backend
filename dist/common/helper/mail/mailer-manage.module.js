"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MailerManageModule", {
    enumerable: true,
    get: function() {
        return MailerManageModule;
    }
});
const _common = require("@nestjs/common");
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
const _mailermanageservice = require("./mailer-manage.service");
const _mailermanagecontroller = require("./mailer-manage.controller");
const _databasemodule = require("../../../database/database.module");
const _employeemanagemodule = require("../../../modules/user-manage-module/employee-module/employee-manage.module");
const _residentmanagemodule = require("../../../modules/user-manage-module/resident-module/resident-manage.module");
const _mailer = require("@nestjs-modules/mailer");
const _pugadapter = require("@nestjs-modules/mailer/dist/adapters/pug.adapter.js");
const _config = require("@nestjs/config");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
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
let MailerManageModule = class MailerManageModule {
};
MailerManageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _databasemodule.DatabaseModule,
            _employeemanagemodule.EmployeeManageModule,
            _residentmanagemodule.ResidentManageModule,
            _mailer.MailerModule.forRootAsync({
                inject: [
                    _config.ConfigService
                ],
                useFactory: (configService)=>({
                        transport: {
                            host: configService.get('MAIL_HOST', 'smtp.gmail.com'),
                            port: configService.get('MAIL_PORT', 465),
                            secure: true,
                            auth: {
                                user: configService.get('MAIL_USERNAME'),
                                pass: configService.get('MAIL_PASSWORD')
                            },
                            // ✅ Remove conflicting TLS settings for Gmail
                            pool: true,
                            maxConnections: 5,
                            maxMessages: 100,
                            rateDelta: 20000,
                            rateLimit: 5
                        },
                        defaults: {
                            from: `"${configService.get('MAIL_FROM_NAME', 'No Reply')}" <${configService.get('MAIL_USERNAME')}>`
                        },
                        template: {
                            dir: _path.join(__dirname, '../mail/templates'),
                            adapter: new _pugadapter.PugAdapter(),
                            options: {
                                strict: true
                            }
                        }
                    })
            })
        ],
        controllers: [
            _mailermanagecontroller.MailerManageController
        ],
        providers: [
            _mailermanageservice.MailerManageService
        ],
        exports: [
            _mailermanageservice.MailerManageService
        ]
    })
], MailerManageModule);

//# sourceMappingURL=mailer-manage.module.js.map