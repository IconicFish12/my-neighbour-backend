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
        return this.authService.verifyEmail(token);
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
        return {
            message: 'Profile retrieved successfully',
            userId: userProfile,
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
        };
    }
    async approveFamily(approvalId, req, approvalData) {
        const userId = req.user.sub;
        const resident = await this.prisma.residents.findFirst({
            where: { userId: userId },
        });
        if (!resident) {
            throw new common_1.BadRequestException('Resident profile not found');
        }
        return this.authService.approvalSystem({
            familyApprovalId: approvalId,
            headOfHouseholdId: resident.id,
            ...approvalData,
        });
    }
    async logout(req) {
        const userId = req.user.sub;
        await this.prisma.users.update({
            where: { id: userId },
            data: { sessionToken: null },
        });
        return {
            message: 'Logout successful',
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
    (0, common_1.Get)('verify-email'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
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
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        database_service_1.DatabaseService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map