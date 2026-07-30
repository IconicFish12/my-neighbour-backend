"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthModule", {
    enumerable: true,
    get: function() {
        return AuthModule;
    }
});
const _common = require("@nestjs/common");
const _authservice = require("./auth.service");
const _authcontroller = require("./auth.controller");
const _jwt = require("@nestjs/jwt");
const _jwtstrategyservice = require("./jwt-strategy.service");
const _databasemodule = require("../../../database/database.module");
const _databaseservice = require("../../../database/database.service");
const _config = require("@nestjs/config");
const _passport = require("@nestjs/passport");
const _mailermanagemodule = require("../../helper/mail/mailer-manage.module");
const _platformexpress = require("@nestjs/platform-express");
const _uploadsconfiguration = require("../../helper/uploads/uploads-configuration");
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
let AuthModule = class AuthModule {
};
AuthModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _config.ConfigModule,
            _passport.PassportModule,
            _jwt.JwtModule.registerAsync({
                imports: [
                    _config.ConfigModule
                ],
                useFactory: (configService)=>({
                        secret: configService.get('JWT_SECRET'),
                        signOptions: {
                            expiresIn: '1h'
                        }
                    }),
                inject: [
                    _config.ConfigService
                ]
            }),
            _platformexpress.MulterModule.register(_uploadsconfiguration.UploadsConfiguration.defaultConfig),
            _databasemodule.DatabaseModule,
            _mailermanagemodule.MailerManageModule
        ],
        controllers: [
            _authcontroller.AuthController
        ],
        providers: [
            _authservice.AuthService,
            _jwtstrategyservice.JwtStrategyService,
            _databaseservice.DatabaseService
        ],
        exports: [
            _authservice.AuthService,
            _jwtstrategyservice.JwtStrategyService
        ]
    })
], AuthModule);

//# sourceMappingURL=auth.module.js.map