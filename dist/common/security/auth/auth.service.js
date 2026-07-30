/* eslint-disable @typescript-eslint/no-unsafe-member-access */ /* eslint-disable @typescript-eslint/no-unsafe-assignment */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function() {
        return AuthService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../../database/database.service");
const _registrequest = require("../../../dtos/requests/regist-request");
const _config = require("@nestjs/config");
const _clientts = require("../../../database/generated/prisma/client.ts");
const _jwt = require("@nestjs/jwt");
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
const _crypto = /*#__PURE__*/ _interop_require_wildcard(require("crypto"));
const _mailermanageservice = require("../../helper/mail/mailer-manage.service");
const _uploadsservice = require("../../helper/uploads/uploads.service");
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
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
let AuthService = class AuthService extends _uploadsservice.UploadsService {
    async registration(registRequest, files) {
        try {
            const existingUser = await this.prisma.users.findFirst({
                where: {
                    OR: [
                        {
                            username: registRequest.username
                        },
                        {
                            primaryEmail: registRequest.primaryEmail
                        }
                    ]
                }
            });
            if (existingUser) {
                throw new _common.ConflictException('Username or email sudah tersedia');
            }
            if (registRequest.residentType === _clientts.ResidentStatus.FAMILY_MEMBERS) {
                await this.validateFamilyCode(registRequest.familyCode);
            }
            if (registRequest.residentType === _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
                await this.validateUnitOwnership(registRequest.unitId);
            }
            const hashedPassword = await _bcrypt.hash(registRequest.password, 12);
            const verificationCode = this.mailerService.generateVerificationCode();
            const result = await this.prisma.$transaction(async (prisma)=>{
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
                        role: _clientts.UserRole.RESIDENT,
                        gender: registRequest.gender,
                        emailVerificationToken: verificationCode
                    }
                });
                const residentData = {
                    userId: user.id,
                    emergencyContactName: registRequest.emergencyContactName,
                    emergencyContactNumber: registRequest.emergencyContactNumber,
                    movedInDate: registRequest.movedInDate ?? new Date(),
                    residentStatus: registRequest.residentType,
                    registrationStatus: _clientts.RegistrationStatus.PENDING,
                    registrationMethod: _registrequest.RegistrationMethod.USER_DRIVEN,
                    pendingApproval: registRequest.residentType === _clientts.ResidentStatus.FAMILY_MEMBERS
                };
                if (registRequest.residentType === _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
                    residentData.unitId = registRequest.unitId;
                    await prisma.units.update({
                        where: {
                            id: registRequest.unitId
                        },
                        data: {
                            status: _clientts.UnitStatus.OCCUPIED
                        }
                    });
                } else if (registRequest.residentType === _clientts.ResidentStatus.FAMILY_MEMBERS) {
                    residentData.familyCode = registRequest.familyCode;
                    residentData.registrationStatus = _clientts.RegistrationStatus.AWAITING_FAMILY_APPROVAL;
                }
                const resident = await prisma.residents.create({
                    data: residentData,
                    include: {
                        unit: true,
                        user: true
                    }
                });
                if (files && files.length > 0) {
                    await this.handleDocumentUploads(resident.id, files, registRequest.documentTypes);
                }
                return {
                    user,
                    resident,
                    verificationCode
                };
            }, {
                timeout: 10000
            });
            if (registRequest.residentType === _clientts.ResidentStatus.FAMILY_MEMBERS) {
                await this.createFamilyApprovalRequest(result.resident.id, registRequest.familyCode);
            }
            try {
                if (registRequest.residentType === _clientts.ResidentStatus.FAMILY_MEMBERS) {
                    const familyCodeRecord = await this.prisma.familyCodes.findUnique({
                        where: {
                            code: registRequest.familyCode
                        },
                        include: {
                            headResident: {
                                include: {
                                    user: true
                                }
                            }
                        }
                    });
                    if (familyCodeRecord) {
                        await this.mailerService.sendFamilyMemberApprovalNotification({
                            headOfHouseholdName: familyCodeRecord.headResident.user.fullName,
                            headOfHouseholdEmail: familyCodeRecord.headResident.user.primaryEmail,
                            familyMemberName: result.resident.user.fullName,
                            familyMemberEmail: result.user.primaryEmail,
                            uniqueCode: familyCodeRecord.code,
                            actionUrl: `${this.config.get('APP_URL')}/auth/family-approval`
                        });
                    }
                    await this.mailerService.sendFamilyMemberVerificationEmail({
                        fullName: result.resident.user.fullName,
                        registrationType: registRequest.registrationMethod,
                        isAdminDriven: false,
                        email: result.user.primaryEmail,
                        verificationCode: result.verificationCode,
                        propertyName: this.config.get('APPLICATION_NAME', 'Property Management')
                    });
                }
                if (registRequest.residentType === _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
                    await this.mailerService.sendHeadOfHouseholdVerificationEmail({
                        fullName: result.resident.user.fullName,
                        email: result.user.primaryEmail,
                        verificationCode: result.verificationCode,
                        registrationType: registRequest.registrationMethod,
                        isAdminDriven: false,
                        unitNumber: result.resident.unit?.unitNumber,
                        propertyName: this.config.get('APPLICATION_NAME', 'Property Management')
                    });
                }
            } catch (emailError) {
                console.error('Email sending failed, but registration successful:', emailError);
            }
            return {
                message: 'Registration successful. Please check your email for verification.',
                residentFullname: result.user.fullName,
                residentType: result.resident.residentStatus,
                requiresApproval: registRequest.residentType === _clientts.ResidentStatus.FAMILY_MEMBERS
            };
        } catch (error) {
            if (error instanceof _common.ConflictException || error instanceof _common.BadRequestException) {
                throw error;
            }
            console.error('Registration error:', error);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan pada proses registrasi');
        }
    }
    async verifyEmail(token) {
        const user = await this.prisma.users.findFirst({
            where: {
                emailVerificationToken: token
            },
            include: {
                Resident: {
                    include: {
                        unit: true
                    }
                }
            }
        });
        if (!user) {
            throw new _common.BadRequestException('Invalid or expired verification token');
        }
        await this.prisma.$transaction(async (prisma)=>{
            await prisma.users.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerificationToken: null
                }
            });
            if (user.Resident) {
                let newStatus;
                if (user.Resident.residentStatus === _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
                    newStatus = _clientts.RegistrationStatus.APPROVED;
                } else {
                    newStatus = _clientts.RegistrationStatus.AWAITING_FAMILY_APPROVAL;
                }
                await prisma.residents.update({
                    where: {
                        id: user.Resident.id
                    },
                    data: {
                        registrationStatus: newStatus
                    }
                });
                if (user.Resident.residentStatus === _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
                    await this.ensureFamilyCode(user.Resident.id, user.Resident.unitId);
                }
            }
        });
        try {
            if (user.Resident) {
                if (user.Resident.residentStatus === _clientts.ResidentStatus.HEAD_HOUSE_HOLD) {
                    const familyCode = await this.prisma.familyCodes.findFirst({
                        where: {
                            headResident: {
                                id: user.Resident.id
                            }
                        }
                    });
                    await this.mailerService.sendHeadOfHouseholdWelcomeEmail({
                        fullName: user.fullName,
                        email: user.primaryEmail,
                        uniqueCode: familyCode?.code,
                        loginUrl: `${this.config.get('APP_URL')}/auth/sign-in`,
                        propertyName: this.config.get('PROPERTY_NAME', 'Property Management'),
                        unitNumber: user.Resident?.unit?.unitNumber ?? 'Unit tidak ditemukan'
                    });
                }
            }
        } catch (emailError) {
            console.error('Welcome email sending failed:', emailError);
        }
        return {
            message: user.Resident?.residentStatus === _clientts.ResidentStatus.HEAD_HOUSE_HOLD ? 'Email verified successfully. You can now sign in.' : 'Email verified successfully. Waiting for approval from head of household.'
        };
    }
    async approvalSystem(approvalRequest) {
        const approval = await this.prisma.familyApprovals.findUnique({
            where: {
                id: approvalRequest.familyApprovalId
            },
            include: {
                familyMember: {
                    include: {
                        user: true
                    }
                },
                headOfHousehold: {
                    include: {
                        user: true
                    }
                }
            }
        });
        if (!approval) {
            throw new _common.BadRequestException('Approval request not found');
        }
        if (approval.headOfHouseholdId !== approvalRequest.headOfHouseholdId) {
            throw new _common.UnauthorizedException('Not authorized to approve this request');
        }
        const result = await this.prisma.$transaction(async (prisma)=>{
            const updatedApproval = await prisma.familyApprovals.update({
                where: {
                    id: approvalRequest.familyApprovalId
                },
                data: {
                    status: approvalRequest.action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
                    respondedAt: new Date(),
                    notes: approvalRequest.notes
                }
            });
            if (approvalRequest.action === 'APPROVE') {
                await prisma.residents.update({
                    where: {
                        id: approval.familyMemberId
                    },
                    data: {
                        registrationStatus: _clientts.RegistrationStatus.APPROVED,
                        pendingApproval: false,
                        approvedByHeadOfHousehold: approvalRequest.headOfHouseholdId,
                        approvalDate: new Date()
                    }
                });
                const familyCode = await this.ensureFamilyCode(approval.headOfHouseholdId);
                await prisma.residents.update({
                    where: {
                        id: approval.familyMemberId
                    },
                    data: {
                        familyCode
                    }
                });
            } else {
                await prisma.residents.update({
                    where: {
                        id: approval.familyMemberId
                    },
                    data: {
                        registrationStatus: _clientts.RegistrationStatus.REJECTED,
                        pendingApproval: false,
                        rejectionReason: approvalRequest.notes
                    }
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
                    unitNumber: ''
                });
            } else {
                await this.mailerService.sendFamilyMemberRejectionNotification(approval.familyMember.user.primaryEmail, approval.familyMember.user.fullName, approval.headOfHousehold.user.fullName, approvalRequest.notes);
            }
        } catch (emailError) {
            console.error('Approval email sending failed:', emailError);
        }
        return {
            message: `Family member ${approvalRequest.action === 'APPROVE' ? 'approved' : 'rejected'} successfully`,
            approval: result
        };
    }
    async ensureFamilyCode(headOfHouseholdId, unitId) {
        const existing = await this.prisma.familyCodes.findFirst({
            where: {
                headOfHousehold: headOfHouseholdId
            }
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
                maxMembers: 10
            }
        });
        return familyCode.code;
    }
    async createFamilyApprovalRequest(residentId, familyCode) {
        const familyCodeRecord = await this.prisma.familyCodes.findUnique({
            where: {
                code: familyCode
            }
        });
        if (!familyCodeRecord) {
            throw new _common.BadRequestException('Invalid family code');
        }
        return this.prisma.familyApprovals.create({
            data: {
                familyMemberId: residentId,
                headOfHouseholdId: familyCodeRecord.headOfHousehold,
                status: 'PENDING',
                notes: 'Pending approval from head of household'
            }
        });
    }
    async signIn(signInRequest) {
        const user = await this.prisma.users.findFirst({
            where: {
                OR: [
                    {
                        username: signInRequest.identifier
                    },
                    {
                        primaryEmail: signInRequest.identifier
                    }
                ]
            },
            include: {
                Resident: {
                    include: {
                        unit: true
                    }
                }
            }
        });
        if (!user) {
            throw new _common.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await _bcrypt.compare(signInRequest.password, user.password);
        if (!isPasswordValid) {
            throw new _common.UnauthorizedException('Invalid credentials');
        }
        if (user.emailVerificationToken !== null) {
            throw new _common.UnauthorizedException('Please verify your email before signing in');
        }
        if (user.Resident && user.Resident.registrationStatus !== _clientts.RegistrationStatus.APPROVED) {
            const statusMessages = {
                [_clientts.RegistrationStatus.PENDING]: 'Your registration is still being processed',
                [_clientts.RegistrationStatus.REJECTED]: 'Your registration has been rejected',
                [_clientts.RegistrationStatus.AWAITING_FAMILY_APPROVAL]: 'Your registration is waiting for approval from head of household'
            };
            throw new _common.UnauthorizedException(statusMessages[user.Resident.registrationStatus] || 'Your registration is still pending approval');
        }
        const tokens = await this.generateTokens(user.id);
        return {
            message: 'Sign in successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.primaryEmail,
                fullName: user.fullName,
                resident: user.Resident
            },
            ...tokens
        };
    }
    async generateTokens(userId) {
        const payload = {
            sub: userId
        };
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '1h'
        });
        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: '7d'
        });
        await this.prisma.users.update({
            where: {
                id: userId
            },
            data: {
                sessionToken: refreshToken
            }
        });
        return {
            accessToken,
            refreshToken
        };
    }
    async jwtCompare(token, userId) {
        try {
            const decoded = await this.jwt.verifyAsync(token);
            return decoded.sub === userId;
        } catch  {
            return false;
        }
    }
    async resendVerificationEmail(email) {
        const user = await this.prisma.users.findUnique({
            where: {
                primaryEmail: email
            },
            include: {
                Resident: {
                    include: {
                        unit: true
                    }
                }
            }
        });
        if (!user) {
            throw new _common.BadRequestException('User not found');
        }
        if (user.emailVerificationToken === null) {
            throw new _common.BadRequestException('Email already verified');
        }
        const newVerificationCode = this.mailerService.generateVerificationCode();
        await this.prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                emailVerificationToken: newVerificationCode
            }
        });
        try {
            if (user.Resident?.residentStatus === _clientts.ResidentStatus.FAMILY_MEMBERS) {
                await this.mailerService.sendFamilyMemberVerificationEmail({
                    fullName: user.fullName,
                    registrationType: user.Resident.registrationMethod,
                    isAdminDriven: false,
                    email: user.primaryEmail,
                    verificationCode: newVerificationCode,
                    propertyName: this.config.get('APPLICATION_NAME', 'Property Management')
                });
            } else {
                await this.mailerService.sendHeadOfHouseholdVerificationEmail({
                    fullName: user.fullName,
                    email: user.primaryEmail,
                    verificationCode: newVerificationCode,
                    registrationType: user.Resident?.registrationMethod || _registrequest.RegistrationMethod.USER_DRIVEN,
                    isAdminDriven: false,
                    unitNumber: user.Resident?.unit?.unitNumber,
                    propertyName: this.config.get('APPLICATION_NAME', 'Property Management')
                });
            }
        } catch (emailError) {
            console.error('Resend verification email failed:', emailError);
            throw new _common.InternalServerErrorException('Failed to send verification email');
        }
        return {
            message: 'Verification email sent successfully'
        };
    }
    async validateFamilyCode(familyCode) {
        const family = await this.prisma.familyCodes.findUnique({
            where: {
                code: familyCode,
                isActive: true
            }
        });
        if (!family) {
            throw new _common.BadRequestException('Invalid family code');
        }
        const memberCount = await this.prisma.residents.count({
            where: {
                familyCode
            }
        });
        if (memberCount >= family.maxMembers) {
            throw new _common.BadRequestException('Family has reached maximum number of members');
        }
    }
    async validateUnitOwnership(unitId) {
        const unit = await this.prisma.units.findUnique({
            where: {
                id: unitId
            }
        });
        if (!unit) {
            throw new _common.BadRequestException('Unit not found');
        }
        if (unit?.status !== _clientts.UnitStatus.AVAILABLE) {
            throw new _common.BadRequestException('Unit is not available');
        }
        const existingHeadResident = await this.prisma.residents.findFirst({
            where: {
                unitId: unitId,
                residentStatus: _clientts.ResidentStatus.HEAD_HOUSE_HOLD
            }
        });
        if (existingHeadResident) {
            throw new _common.BadRequestException('Unit sudah memiliki kepala keluarga');
        }
    }
    async handleDocumentUploads(residentId, files, documentTypes) {
        const uploadPromises = files.map(async (file, index)=>{
            const documentType = documentTypes?.[index] || 'ID_CARD';
            const fileUrl = this.saveFileToStorage(file);
            return this.prisma.residentDocuments.create({
                data: {
                    residentId,
                    documentType: documentType,
                    fileName: file.originalname,
                    fileUrl,
                    fileSize: file.size,
                    isVerified: false
                }
            });
        });
        return Promise.all(uploadPromises);
    }
    generateUniqueFamilyCode() {
        return 'FAM-' + _crypto.randomBytes(4).toString('hex').toUpperCase();
    }
    saveFileToStorage(files) {
        return this.processSingleFiles(files);
    }
    constructor(prisma, jwt, mailerService, config){
        super(), this.prisma = prisma, this.jwt = jwt, this.mailerService = mailerService, this.config = config;
    }
};
AuthService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _mailermanageservice.MailerManageService === "undefined" ? Object : _mailermanageservice.MailerManageService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], AuthService);

//# sourceMappingURL=auth.service.js.map