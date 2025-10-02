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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../common/database/database.service");
const regist_request_1 = require("../../../dtos/requests/regist-request");
const config_1 = require("@nestjs/config");
const prisma_1 = require("../../../common/database/generated/prisma");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailer_manage_service_1 = require("../../../common/helper/mail/mailer-manage.service");
const uploads_service_1 = require("../../helper/uploads/uploads.service");
let AuthService = class AuthService extends uploads_service_1.UploadsService {
    prisma;
    jwt;
    mailerService;
    config;
    constructor(prisma, jwt, mailerService, config) {
        super();
        this.prisma = prisma;
        this.jwt = jwt;
        this.mailerService = mailerService;
        this.config = config;
    }
    async registration(registRequest, files) {
        try {
            const existingUser = await this.prisma.users.findFirst({
                where: {
                    OR: [
                        { username: registRequest.username },
                        { primaryEmail: registRequest.primaryEmail },
                    ],
                },
            });
            if (existingUser) {
                throw new common_1.ConflictException('Username or email sudah tersedia');
            }
            if (registRequest.residentType === prisma_1.ResidentStatus.FAMILY_MEMBERS) {
                await this.validateFamilyCode(registRequest.familyCode);
            }
            if (registRequest.residentType === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
                await this.validateUnitOwnership(registRequest.unitId);
            }
            const hashedPassword = await bcrypt.hash(registRequest.password, 12);
            const verificationCode = this.mailerService.generateVerificationCode();
            const result = await this.prisma.$transaction(async (prisma) => {
                const user = await prisma.users.create({
                    data: {
                        fullName: registRequest.fullName,
                        firstName: registRequest.firstName,
                        lastName: registRequest.lastName,
                        username: registRequest.username,
                        primaryEmail: registRequest.primaryEmail,
                        contactNumber: registRequest.contactNumber,
                        dateOfBirth: registRequest.dateOfBirth,
                        password: hashedPassword,
                        role: prisma_1.UserRole.RESIDENT,
                        gender: registRequest.gender,
                        emailVerificationToken: verificationCode,
                    },
                });
                const residentData = {
                    userId: user.id,
                    emergencyContactName: registRequest.emergencyContactName,
                    emergencyContactNumber: registRequest.emergencyContactNumber,
                    movedInDate: registRequest.movedInDate ?? new Date(),
                    residentStatus: registRequest.residentType,
                    registrationStatus: prisma_1.RegistrationStatus.PENDING,
                    registrationMethod: regist_request_1.RegistrationMethod.USER_DRIVEN,
                    pendingApproval: registRequest.residentType === prisma_1.ResidentStatus.FAMILY_MEMBERS,
                };
                if (registRequest.residentType === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
                    residentData.unitId = registRequest.unitId;
                    await prisma.units.update({
                        where: { id: registRequest.unitId },
                        data: {
                            status: prisma_1.UnitStatus.OCCUPIED,
                        },
                    });
                }
                else if (registRequest.residentType === prisma_1.ResidentStatus.FAMILY_MEMBERS) {
                    residentData.familyCode = registRequest.familyCode;
                    residentData.registrationStatus =
                        prisma_1.RegistrationStatus.AWAITING_FAMILY_APPROVAL;
                }
                const resident = await prisma.residents.create({
                    data: residentData,
                    include: {
                        unit: true,
                        user: true,
                    },
                });
                if (files && files.length > 0) {
                    await this.handleDocumentUploads(resident.id, files, registRequest.documentTypes);
                }
                return {
                    user,
                    resident,
                    verificationCode,
                };
            }, {
                timeout: 10000,
            });
            if (registRequest.residentType === prisma_1.ResidentStatus.FAMILY_MEMBERS) {
                await this.createFamilyApprovalRequest(result.resident.id, registRequest.familyCode);
            }
            try {
                if (registRequest.residentType === prisma_1.ResidentStatus.FAMILY_MEMBERS) {
                    const familyCodeRecord = await this.prisma.familyCodes.findUnique({
                        where: { code: registRequest.familyCode },
                        include: {
                            headResident: {
                                include: { user: true },
                            },
                        },
                    });
                    if (familyCodeRecord) {
                        await this.mailerService.sendFamilyMemberApprovalNotification({
                            headOfHouseholdName: familyCodeRecord.headResident.user.fullName,
                            headOfHouseholdEmail: familyCodeRecord.headResident.user.primaryEmail,
                            familyMemberName: result.resident.user.fullName,
                            familyMemberEmail: result.user.primaryEmail,
                            uniqueCode: familyCodeRecord.code,
                            actionUrl: `${this.config.get('APP_URL')}/auth/family-approval`,
                        });
                    }
                    await this.mailerService.sendFamilyMemberVerificationEmail({
                        fullName: result.resident.user.fullName,
                        registrationType: registRequest.registrationMethod,
                        isAdminDriven: false,
                        email: result.user.primaryEmail,
                        verificationCode: result.verificationCode,
                        propertyName: this.config.get('APPLICATION_NAME', 'Property Management'),
                    });
                }
                if (registRequest.residentType === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
                    await this.mailerService.sendHeadOfHouseholdVerificationEmail({
                        fullName: result.resident.user.fullName,
                        email: result.user.primaryEmail,
                        verificationCode: result.verificationCode,
                        registrationType: registRequest.registrationMethod,
                        isAdminDriven: false,
                        unitNumber: result.resident.unit?.unitNumber,
                        propertyName: this.config.get('APPLICATION_NAME', 'Property Management'),
                    });
                }
            }
            catch (emailError) {
                console.error('Email sending failed, but registration successful:', emailError);
            }
            return {
                message: 'Registration successful. Please check your email for verification.',
                residentFullname: result.user.fullName,
                residentType: result.resident.residentStatus,
                requiresApproval: registRequest.residentType === prisma_1.ResidentStatus.FAMILY_MEMBERS,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            console.error('Registration error:', error);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan pada proses registrasi');
        }
    }
    async verifyEmail(token) {
        const user = await this.prisma.users.findFirst({
            where: { emailVerificationToken: token },
            include: {
                Resident: {
                    include: { unit: true },
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired verification token');
        }
        await this.prisma.$transaction(async (prisma) => {
            await prisma.users.update({
                where: { id: user.id },
                data: {
                    emailVerificationToken: null,
                },
            });
            if (user.Resident) {
                let newStatus;
                if (user.Resident.residentStatus === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
                    newStatus = prisma_1.RegistrationStatus.APPROVED;
                }
                else {
                    newStatus = prisma_1.RegistrationStatus.AWAITING_FAMILY_APPROVAL;
                }
                await prisma.residents.update({
                    where: { id: user.Resident.id },
                    data: {
                        registrationStatus: newStatus,
                    },
                });
                if (user.Resident.residentStatus === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
                    await this.ensureFamilyCode(user.Resident.id, user.Resident.unitId);
                }
            }
        });
        try {
            if (user.Resident) {
                if (user.Resident.residentStatus === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD) {
                    const familyCode = await this.prisma.familyCodes.findFirst({
                        where: { headResident: { id: user.Resident.id } },
                    });
                    await this.mailerService.sendHeadOfHouseholdWelcomeEmail({
                        fullName: user.fullName,
                        email: user.primaryEmail,
                        uniqueCode: familyCode?.code,
                        loginUrl: `${this.config.get('APP_URL')}/auth/sign-in`,
                        propertyName: this.config.get('PROPERTY_NAME', 'Property Management'),
                        unitNumber: user.Resident?.unit?.unitNumber ?? 'Unit tidak ditemukan',
                    });
                }
            }
        }
        catch (emailError) {
            console.error('Welcome email sending failed:', emailError);
        }
        return {
            message: user.Resident?.residentStatus === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD
                ? 'Email verified successfully. You can now sign in.'
                : 'Email verified successfully. Waiting for approval from head of household.',
        };
    }
    async approvalSystem(approvalRequest) {
        const approval = await this.prisma.familyApprovals.findUnique({
            where: { id: approvalRequest.familyApprovalId },
            include: {
                familyMember: {
                    include: { user: true },
                },
                headOfHousehold: {
                    include: { user: true },
                },
            },
        });
        if (!approval) {
            throw new common_1.BadRequestException('Approval request not found');
        }
        if (approval.headOfHouseholdId !== approvalRequest.headOfHouseholdId) {
            throw new common_1.UnauthorizedException('Not authorized to approve this request');
        }
        const result = await this.prisma.$transaction(async (prisma) => {
            const updatedApproval = await prisma.familyApprovals.update({
                where: { id: approvalRequest.familyApprovalId },
                data: {
                    status: approvalRequest.action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
                    respondedAt: new Date(),
                    notes: approvalRequest.notes,
                },
            });
            if (approvalRequest.action === 'APPROVE') {
                await prisma.residents.update({
                    where: { id: approval.familyMemberId },
                    data: {
                        registrationStatus: prisma_1.RegistrationStatus.APPROVED,
                        pendingApproval: false,
                        approvedByHeadOfHousehold: approvalRequest.headOfHouseholdId,
                        approvalDate: new Date(),
                    },
                });
                const familyCode = await this.ensureFamilyCode(approval.headOfHouseholdId);
                await prisma.residents.update({
                    where: { id: approval.familyMemberId },
                    data: { familyCode },
                });
            }
            else {
                await prisma.residents.update({
                    where: { id: approval.familyMemberId },
                    data: {
                        registrationStatus: prisma_1.RegistrationStatus.REJECTED,
                        pendingApproval: false,
                        rejectionReason: approvalRequest.notes,
                    },
                });
            }
            return updatedApproval;
        });
        try {
            if (approvalRequest.action === 'APPROVE') {
                const familyCode = await this.ensureFamilyCode(approval.headOfHouseholdId);
                await this.mailerService.sendFamilyMemberWelcomeEmail({
                    fullName: approval.familyMember.user.fullName,
                    email: approval.familyMember.user.primaryEmail,
                    uniqueCode: familyCode,
                    loginUrl: `${this.config.get('APP_URL')}/auth/sign-in`,
                    propertyName: this.config.get('PROPERTY_NAME', 'Property Management'),
                    unitNumber: '',
                });
            }
            else {
                await this.mailerService.sendFamilyMemberRejectionNotification(approval.familyMember.user.primaryEmail, approval.familyMember.user.fullName, approval.headOfHousehold.user.fullName, approvalRequest.notes);
            }
        }
        catch (emailError) {
            console.error('Approval email sending failed:', emailError);
        }
        return {
            message: `Family member ${approvalRequest.action === 'APPROVE' ? 'approved' : 'rejected'} successfully`,
            approval: result,
        };
    }
    async ensureFamilyCode(headOfHouseholdId, unitId) {
        const existing = await this.prisma.familyCodes.findFirst({
            where: { headOfHousehold: headOfHouseholdId },
        });
        if (existing) {
            return existing.code;
        }
        const code = this.generateUniqueFamilyCode();
        const familyCode = await this.prisma.familyCodes.create({
            data: {
                code,
                headOfHousehold: headOfHouseholdId,
                unitId: unitId || null,
                isActive: true,
                maxMembers: 10,
            },
        });
        return familyCode.code;
    }
    async createFamilyApprovalRequest(residentId, familyCode) {
        const familyCodeRecord = await this.prisma.familyCodes.findUnique({
            where: { code: familyCode },
        });
        if (!familyCodeRecord) {
            throw new common_1.BadRequestException('Invalid family code');
        }
        return this.prisma.familyApprovals.create({
            data: {
                familyMemberId: residentId,
                headOfHouseholdId: familyCodeRecord.headOfHousehold,
                status: 'PENDING',
                notes: 'Pending approval from head of household',
            },
        });
    }
    async signIn(signInRequest) {
        const user = await this.prisma.users.findFirst({
            where: {
                OR: [
                    { username: signInRequest.identifier },
                    { primaryEmail: signInRequest.identifier },
                ],
            },
            include: {
                Resident: {
                    include: {
                        unit: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(signInRequest.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.emailVerificationToken !== null) {
            throw new common_1.UnauthorizedException('Please verify your email before signing in');
        }
        if (user.Resident &&
            user.Resident.registrationStatus !== prisma_1.RegistrationStatus.APPROVED) {
            const statusMessages = {
                [prisma_1.RegistrationStatus.PENDING]: 'Your registration is still being processed',
                [prisma_1.RegistrationStatus.REJECTED]: 'Your registration has been rejected',
                [prisma_1.RegistrationStatus.AWAITING_FAMILY_APPROVAL]: 'Your registration is waiting for approval from head of household',
            };
            throw new common_1.UnauthorizedException(statusMessages[user.Resident.registrationStatus] ||
                'Your registration is still pending approval');
        }
        const tokens = await this.generateTokens(user.id);
        return {
            message: 'Sign in successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.primaryEmail,
                fullName: user.fullName,
                resident: user.Resident,
            },
            ...tokens,
        };
    }
    async generateTokens(userId) {
        const payload = { sub: userId };
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '1h',
        });
        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: '7d',
        });
        await this.prisma.users.update({
            where: { id: userId },
            data: { sessionToken: refreshToken },
        });
        return { accessToken, refreshToken };
    }
    async jwtCompare(token, userId) {
        try {
            const decoded = await this.jwt.verifyAsync(token);
            return decoded.sub === userId;
        }
        catch {
            return false;
        }
    }
    async resendVerificationEmail(email) {
        const user = await this.prisma.users.findUnique({
            where: { primaryEmail: email },
            include: {
                Resident: {
                    include: { unit: true },
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.emailVerificationToken === null) {
            throw new common_1.BadRequestException('Email already verified');
        }
        const newVerificationCode = this.mailerService.generateVerificationCode();
        await this.prisma.users.update({
            where: { id: user.id },
            data: {
                emailVerificationToken: newVerificationCode,
            },
        });
        try {
            if (user.Resident?.residentStatus === prisma_1.ResidentStatus.FAMILY_MEMBERS) {
                await this.mailerService.sendFamilyMemberVerificationEmail({
                    fullName: user.fullName,
                    registrationType: user.Resident.registrationMethod,
                    isAdminDriven: false,
                    email: user.primaryEmail,
                    verificationCode: newVerificationCode,
                    propertyName: this.config.get('APPLICATION_NAME', 'Property Management'),
                });
            }
            else {
                await this.mailerService.sendHeadOfHouseholdVerificationEmail({
                    fullName: user.fullName,
                    email: user.primaryEmail,
                    verificationCode: newVerificationCode,
                    registrationType: user.Resident?.registrationMethod || regist_request_1.RegistrationMethod.USER_DRIVEN,
                    isAdminDriven: false,
                    unitNumber: user.Resident?.unit?.unitNumber,
                    propertyName: this.config.get('APPLICATION_NAME', 'Property Management'),
                });
            }
        }
        catch (emailError) {
            console.error('Resend verification email failed:', emailError);
            throw new common_1.InternalServerErrorException('Failed to send verification email');
        }
        return {
            message: 'Verification email sent successfully',
        };
    }
    async validateFamilyCode(familyCode) {
        const family = await this.prisma.familyCodes.findUnique({
            where: { code: familyCode, isActive: true },
        });
        if (!family) {
            throw new common_1.BadRequestException('Invalid family code');
        }
        const memberCount = await this.prisma.residents.count({
            where: { familyCode },
        });
        if (memberCount >= family.maxMembers) {
            throw new common_1.BadRequestException('Family has reached maximum number of members');
        }
    }
    async validateUnitOwnership(unitId) {
        const unit = await this.prisma.units.findUnique({
            where: { id: unitId },
        });
        if (!unit) {
            throw new common_1.BadRequestException('Unit not found');
        }
        if (unit?.status !== prisma_1.UnitStatus.AVAILABLE) {
            throw new common_1.BadRequestException('Unit is not available');
        }
        const existingHeadResident = await this.prisma.residents.findFirst({
            where: {
                unitId: unitId,
                residentStatus: prisma_1.ResidentStatus.HEAD_HOUSE_HOLD,
            },
        });
        if (existingHeadResident) {
            throw new common_1.BadRequestException('Unit sudah memiliki kepala keluarga');
        }
    }
    async handleDocumentUploads(residentId, files, documentTypes) {
        const uploadPromises = files.map(async (file, index) => {
            const documentType = documentTypes?.[index] || 'ID_CARD';
            const fileUrl = this.saveFileToStorage(file);
            return this.prisma.residentDocuments.create({
                data: {
                    residentId,
                    documentType: documentType,
                    fileName: file.originalname,
                    fileUrl,
                    fileSize: file.size,
                    isVerified: false,
                },
            });
        });
        return Promise.all(uploadPromises);
    }
    generateUniqueFamilyCode() {
        return 'FAM-' + crypto.randomBytes(4).toString('hex').toUpperCase();
    }
    saveFileToStorage(files) {
        return this.processSingleFiles(files);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService,
        mailer_manage_service_1.MailerManageService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map