"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const regist_request_1 = require("../../../dtos/requests/regist-request");
const platform_express_1 = require("@nestjs/platform-express");
const sign_in_request_1 = require("../../../dtos/requests/sign-in-request");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const database_service_1 = require("../../../common/database/database.service");
const prisma_1 = require("../../database/generated/prisma/index.js");
let AuthController = class AuthController {
    authService;
    prisma;
    constructor(authService, prisma) {
        this.authService = authService;
        this.prisma = prisma;
    }
    registration(registrationDto, files) {
        return this.authService.registration(registrationDto, files);
    }
    signIn(signInDto) {
        return this.authService.signIn(signInDto);
    }
    verifyEmail(token) {
        if (!token) {
            throw new common_1.BadRequestException('Verification token is required');
        }
        return this.authService.verifyEmail(token);
    }
    async resendVerificationEmail(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email is required');
        }
        return this.authService.resendVerificationEmail(email);
    }
    refreshToken(req) {
        return this.authService.generateTokens(req.user.sub);
    }
    async getProfile(req) {
        const userId = req.user.sub;
        const userProfile = await this.prisma.users.findUnique({
            where: { id: userId },
            include: {
                Resident: {
                    include: {
                        unit: true,
                    },
                },
            },
        });
        if (!userProfile) {
            throw new common_1.BadRequestException('User profile not found');
        }
        return {
            message: 'Profile retrieved successfully',
            user: userProfile,
        };
    }
    async getFamilyApprovals(req) {
        const userId = req.user.sub;
        const resident = await this.prisma.residents.findFirst({
            where: { userId: userId },
        });
        if (!resident) {
            throw new common_1.BadRequestException('Resident profile not found');
        }
        if (resident.residentStatus !== prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
            throw new common_1.BadRequestException('Only head of household can view family approvals');
        }
        const pendingApprovals = await this.prisma.familyApprovals.findMany({
            where: {
                headOfHouseholdId: resident.id,
                status: 'PENDING',
            },
            include: {
                familyMember: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                primaryEmail: true,
                                contactNumber: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                requestedAt: 'desc',
            },
        });
        return {
            message: 'Family approvals retrieved successfully',
            approvals: pendingApprovals,
            totalPending: pendingApprovals.length,
        };
    }
    async approveFamily(approvalId, req, approvalData) {
        if (!approvalId) {
            throw new common_1.BadRequestException('Approval ID is required');
        }
        if (!approvalData.action ||
            !['APPROVE', 'REJECT'].includes(approvalData.action)) {
            throw new common_1.BadRequestException('Valid action (APPROVE or REJECT) is required');
        }
        const userId = req.user.sub;
        const resident = await this.prisma.residents.findFirst({
            where: { userId: userId },
        });
        if (!resident) {
            throw new common_1.BadRequestException('Resident profile not found');
        }
        if (resident.residentStatus !== prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
            throw new common_1.BadRequestException('Only head of household can approve family members');
        }
        return this.authService.approvalSystem({
            familyApprovalId: approvalId,
            headOfHouseholdId: resident.id,
            ...approvalData,
        });
    }
    async getFamilyApprovalHistory(req) {
        const userId = req.user.sub;
        const resident = await this.prisma.residents.findFirst({
            where: { userId: userId },
        });
        if (!resident) {
            throw new common_1.BadRequestException('Resident profile not found');
        }
        if (resident.residentStatus !== prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
            throw new common_1.BadRequestException('Only head of household can view approval history');
        }
        const approvalHistory = await this.prisma.familyApprovals.findMany({
            where: {
                headOfHouseholdId: resident.id,
                status: { in: ['APPROVED', 'REJECTED'] },
            },
            include: {
                familyMember: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                primaryEmail: true,
                                contactNumber: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                respondedAt: 'desc',
            },
        });
        return {
            message: 'Family approval history retrieved successfully',
            history: approvalHistory,
            totalProcessed: approvalHistory.length,
        };
    }
    async checkRegistrationStatus(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email is required');
        }
        const user = await this.prisma.users.findUnique({
            where: { primaryEmail: email },
            include: {
                Resident: true,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return {
            message: 'Registration status retrieved successfully',
            status: {
                emailVerified: user.emailVerificationToken === null,
                registrationStatus: user.Resident?.registrationStatus,
                residentStatus: user.Resident?.residentStatus,
                pendingApproval: user.Resident?.pendingApproval || false,
            },
        };
    }
    async logout(req) {
        const userId = req.user.sub;
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        await this.prisma.users.update({
            where: { id: userId },
            data: { sessionToken: null },
        });
        return {
            message: 'Logout successful',
        };
    }
    async validateSession(req) {
        const userId = req.user.sub;
        const user = await this.prisma.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                fullName: true,
                primaryEmail: true,
                sessionToken: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid session');
        }
        return {
            message: 'Session is valid',
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                email: user.primaryEmail,
            },
        };
    }
    async getFamilyMembers(req) {
        const userId = req.user.sub;
        const resident = await this.prisma.residents.findFirst({
            where: { userId: userId },
        });
        if (!resident) {
            throw new common_1.BadRequestException('Resident profile not found');
        }
        if (resident.residentStatus !== prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
            throw new common_1.BadRequestException('Only head of household can view family members');
        }
        const familyCode = await this.prisma.familyCodes.findFirst({
            where: { headOfHousehold: resident.id },
        });
        if (!familyCode) {
            return {
                message: 'No family code found',
                familyMembers: [],
                familyCode: null,
            };
        }
        const familyMembers = await this.prisma.residents.findMany({
            where: {
                familyCode: familyCode.code,
                residentStatus: prisma_1.ResidentStatus.FAMILY_MEMBERS,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        primaryEmail: true,
                        contactNumber: true,
                    },
                },
            },
        });
        return {
            message: 'Family members retrieved successfully',
            familyMembers,
            familyCode: familyCode.code,
            totalMembers: familyMembers.length,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (req, file, callback) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
                callback(null, true);
            }
            else {
                callback(new Error('Unsupported file type'), false);
            }
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [regist_request_1.RegistRequest, Array]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registration", null);
__decorate([
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_request_1.SignInRequest]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)('email-token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('resend-verification'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerificationEmail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('family-approvals'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getFamilyApprovals", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('family-approval/:approvalId'),
    __param(0, (0, common_1.Param)('approvalId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "approveFamily", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('family-approvals/history'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getFamilyApprovalHistory", null);
__decorate([
    (0, common_1.Get)('registration-status/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkRegistrationStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('validate-session'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateSession", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('family-members'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getFamilyMembers", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        database_service_1.DatabaseService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map