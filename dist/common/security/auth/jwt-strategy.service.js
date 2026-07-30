"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtStrategyService", {
    enumerable: true,
    get: function() {
        return JwtStrategyService;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _passportjwt = require("passport-jwt");
const _databaseservice = require("../../../database/database.service");
const _config = require("@nestjs/config");
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
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
let JwtStrategyService = class JwtStrategyService extends (0, _passport.PassportStrategy)(_passportjwt.Strategy) {
    async validate(payload) {
        const user = await this.prisma.users.findUnique({
            where: {
                id: payload.sub
            },
            include: {
                Resident: {
                    include: {
                        unit: true
                    }
                },
                Employee: true
            }
        });
        if (!user) {
            throw new _common.UnauthorizedException('Invalid token');
        }
        if (!user) {
            throw new _common.UnauthorizedException('User not found');
        }
        if (user.emailVerificationToken !== null) {
            throw new _common.UnauthorizedException('Email not verified');
        }
        if (!user.sessionToken) {
            throw new _common.UnauthorizedException('Session expired. Please login again.');
        }
        return {
            sub: user.id,
            username: user.username,
            email: user.primaryEmail,
            fullName: user.fullName,
            role: user.role,
            resident: user.Resident
        };
    }
    constructor(prisma, configService){
        super({
            jwtFromRequest: _passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET') || ''
        }), this.prisma = prisma, this.configService = configService;
    }
};
JwtStrategyService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], JwtStrategyService);

//# sourceMappingURL=jwt-strategy.service.js.map