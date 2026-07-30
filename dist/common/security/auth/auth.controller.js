/* eslint-disable @typescript-eslint/no-unsafe-member-access */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _common = require("@nestjs/common");
const _authservice = require("./auth.service");
const _registrequest = require("../../../dtos/requests/regist-request");
const _platformexpress = require("@nestjs/platform-express");
const _signinrequest = require("../../../dtos/requests/sign-in-request");
const _jwtauthguard = require("./guards/jwt-auth.guard");
const _databaseservice = require("../../../database/database.service");
const _clientts = require("../../../database/generated/prisma/client.ts");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AuthController = class AuthController {
    registration(registrationDto, files) {
        return this.authService.registration(registrationDto, files);
    }
    signIn(signInDto) {
        return this.authService.signIn(signInDto);
    }
    verifyEmail(token) {
        if (!token) {
            throw new _common.BadRequestException('Verification token is required');
        }
        return this.authService.verifyEmail(token);
    }
    async resendVerificationEmail(email) {
        if (!email) {
            throw new _common.BadRequestException('Email is required');
        }
        return this.authService.resendVerificationEmail(email);
    }
    refreshToken(req) {
        return this.authService.generateTokens(req.user.sub);
    }
    async getProfile(req) {
        const userId = req.user.sub;
        const userProfile = await this.prisma.users.findUnique({
            where: {
                id: userId
            },
            include: {
                Resident: {
                    include: {
                        unit: true
                    }
                }
            }
        });
        if (!userProfile) {
            throw new _common.BadRequestException('User profile not found');
        }
        return {
            message: 'Profile retrieved successfully',
            user: userProfile
        };
    }
    async getFamilyApprovals(req) {
        const userId = req.user.sub;
        const resident = await this.prisma.residents.findFirst({
            where: {
                userId: userId
            }
        });
        if (!resident) {
            throw new _common.BadRequestException('Resident profile not found');
        }
        if (resident.residentStatus !== _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
            throw new _common.BadRequestException('Only head of household can view family approvals');
        }
        const pendingApprovals = await this.prisma.familyApprovals.findMany({
            where: {
                headOfHouseholdId: resident.id,
                status: 'PENDING'
            },
            include: {
                familyMember: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                primaryEmail: true,
                                contactNumber: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                requestedAt: 'desc'
            }
        });
        return {
            message: 'Family approvals retrieved successfully',
            approvals: pendingApprovals,
            totalPending: pendingApprovals.length
        };
    }
    async approveFamily(approvalId, req, approvalData) {
        if (!approvalId) {
            throw new _common.BadRequestException('Approval ID is required');
        }
        if (!approvalData.action || ![
            'APPROVE',
            'REJECT'
        ].includes(approvalData.action)) {
            throw new _common.BadRequestException('Valid action (APPROVE or REJECT) is required');
        }
        const userId = req.user.sub;
        const resident = await this.prisma.residents.findFirst({
            where: {
                userId: userId
            }
        });
        if (!resident) {
            throw new _common.BadRequestException('Resident profile not found');
        }
        if (resident.residentStatus !== _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
            throw new _common.BadRequestException('Only head of household can approve family members');
        }
        return this.authService.approvalSystem({
            familyApprovalId: approvalId,
            headOfHouseholdId: resident.id,
            ...approvalData
        });
    }
    async getFamilyApprovalHistory(req) {
        const userId = req.user.sub;
        const resident = await this.prisma.residents.findFirst({
            where: {
                userId: userId
            }
        });
        if (!resident) {
            throw new _common.BadRequestException('Resident profile not found');
        }
        if (resident.residentStatus !== _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
            throw new _common.BadRequestException('Only head of household can view approval history');
        }
        const approvalHistory = await this.prisma.familyApprovals.findMany({
            where: {
                headOfHouseholdId: resident.id,
                status: {
                    in: [
                        'APPROVED',
                        'REJECTED'
                    ]
                }
            },
            include: {
                familyMember: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                primaryEmail: true,
                                contactNumber: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                respondedAt: 'desc'
            }
        });
        return {
            message: 'Family approval history retrieved successfully',
            history: approvalHistory,
            totalProcessed: approvalHistory.length
        };
    }
    async checkRegistrationStatus(email) {
        if (!email) {
            throw new _common.BadRequestException('Email is required');
        }
        const user = await this.prisma.users.findUnique({
            where: {
                primaryEmail: email
            },
            include: {
                Resident: true
            }
        });
        if (!user) {
            throw new _common.BadRequestException('User not found');
        }
        return {
            message: 'Registration status retrieved successfully',
            status: {
                emailVerified: user.emailVerificationToken === null,
                registrationStatus: user.Resident?.registrationStatus,
                residentStatus: user.Resident?.residentStatus,
                pendingApproval: user.Resident?.pendingApproval || false
            }
        };
    }
    async logout(req) {
        const userId = req.user.sub;
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            throw new _common.BadRequestException('User not found');
        }
        await this.prisma.users.update({
            where: {
                id: userId
            },
            data: {
                sessionToken: null
            }
        });
        return {
            message: 'Logout successful'
        };
    }
    async validateSession(req) {
        const userId = req.user.sub;
        const user = await this.prisma.users.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true,
                fullName: true,
                primaryEmail: true,
                sessionToken: true
            }
        });
        if (!user) {
            throw new _common.UnauthorizedException('Invalid session');
        }
        return {
            message: 'Session is valid',
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                email: user.primaryEmail
            }
        };
    }
    async getFamilyMembers(req) {
        const userId = req.user.sub;
        const resident = await this.prisma.residents.findFirst({
            where: {
                userId: userId
            }
        });
        if (!resident) {
            throw new _common.BadRequestException('Resident profile not found');
        }
        if (resident.residentStatus !== _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
            throw new _common.BadRequestException('Only head of household can view family members');
        }
        const familyCode = await this.prisma.familyCodes.findFirst({
            where: {
                headOfHousehold: resident.id
            }
        });
        if (!familyCode) {
            return {
                message: 'No family code found',
                familyMembers: [],
                familyCode: null
            };
        }
        const familyMembers = await this.prisma.residents.findMany({
            where: {
                familyCode: familyCode.code,
                residentStatus: _clientts.ResidentStatus.FAMILY_MEMBERS
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        primaryEmail: true,
                        contactNumber: true
                    }
                }
            }
        });
        return {
            message: 'Family members retrieved successfully',
            familyMembers,
            familyCode: familyCode.code,
            totalMembers: familyMembers.length
        };
    }
    constructor(authService, prisma){
        this.authService = authService;
        this.prisma = prisma;
    }
};
_ts_decorate([
    (0, _common.Post)('sign-up'),
    (0, _common.UseInterceptors)((0, _platformexpress.FilesInterceptor)('files', 5, {
        limits: {
            fileSize: 10 * 1024 * 1024
        },
        fileFilter: (req, file, callback)=>{
            if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
                callback(null, true);
            } else {
                callback(new Error('Unsupported file type'), false);
            }
        }
    })),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.UploadedFiles)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _registrequest.RegistRequest === "undefined" ? Object : _registrequest.RegistRequest,
        Array
    ]),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "registration", null);
_ts_decorate([
    (0, _common.Post)('sign-in'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _signinrequest.SignInRequest === "undefined" ? Object : _signinrequest.SignInRequest
    ]),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
_ts_decorate([
    (0, _common.Post)('verify-email'),
    _ts_param(0, (0, _common.Body)('email-token')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
_ts_decorate([
    (0, _common.Post)('resend-verification'),
    _ts_param(0, (0, _common.Body)('email')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerificationEmail", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('refresh'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('profile'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('family-approvals'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "getFamilyApprovals", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Patch)('family-approval/:approvalId'),
    _ts_param(0, (0, _common.Param)('approvalId')),
    _ts_param(1, (0, _common.Request)()),
    _ts_param(2, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "approveFamily", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('family-approvals/history'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "getFamilyApprovalHistory", null);
_ts_decorate([
    (0, _common.Get)('registration-status/:email'),
    _ts_param(0, (0, _common.Param)('email')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "checkRegistrationStatus", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Post)('logout'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('validate-session'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "validateSession", null);
_ts_decorate([
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard),
    (0, _common.Get)('family-members'),
    _ts_param(0, (0, _common.Request)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "getFamilyMembers", null);
AuthController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService,
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map