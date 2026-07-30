/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../../../database/database.service';
import {
  RegistrationMethod,
  RegistRequest,
} from '../../../dtos/requests/regist-request';
import { SignInRequest } from '../../../dtos/requests/sign-in-request';
import { ConfigService } from '@nestjs/config';
import {
  RegistrationStatus,
  ResidentStatus,
  UnitStatus,
  UserRole,
} from '../../../database/generated/prisma/client.ts';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailerManageService } from '../../../common/helper/mail/mailer-manage.service';
import { UploadsService } from 'src/common/helper/uploads/uploads.service';

@Injectable()
export class AuthService extends UploadsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private readonly mailerService: MailerManageService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  async registration(
    registRequest: RegistRequest,
    files?: Express.Multer.File[],
  ) {
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
        throw new ConflictException('Username or email sudah tersedia');
      }

      if (registRequest.residentType === ResidentStatus.FAMILY_MEMBERS) {
        await this.validateFamilyCode(registRequest.familyCode!);
      }

      if (registRequest.residentType === ResidentStatus.HEAD_HOUSE_HOLD) {
        await this.validateUnitOwnership(registRequest.unitId);
      }

      const hashedPassword = await bcrypt.hash(registRequest.password, 12);
      const verificationCode = this.mailerService.generateVerificationCode();

      const result = await this.prisma.$transaction(
        async (prisma) => {
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
              role: UserRole.RESIDENT,
              gender: registRequest.gender,
              emailVerificationToken: verificationCode,
            },
          });

          const residentData: any = {
            userId: user.id,
            emergencyContactName: registRequest.emergencyContactName,
            emergencyContactNumber: registRequest.emergencyContactNumber,
            movedInDate: registRequest.movedInDate ?? new Date(),
            residentStatus: registRequest.residentType,
            registrationStatus: RegistrationStatus.PENDING,
            registrationMethod: RegistrationMethod.USER_DRIVEN,
            pendingApproval:
              registRequest.residentType === ResidentStatus.FAMILY_MEMBERS,
          };

          if (registRequest.residentType === ResidentStatus.HEAD_HOUSE_HOLD) {
            residentData.unitId = registRequest.unitId;

            await prisma.units.update({
              where: { id: registRequest.unitId },
              data: {
                status: UnitStatus.OCCUPIED,
              },
            });
          } else if (
            registRequest.residentType === ResidentStatus.FAMILY_MEMBERS
          ) {
            residentData.familyCode = registRequest.familyCode;
            residentData.registrationStatus =
              RegistrationStatus.AWAITING_FAMILY_APPROVAL;
          }

          const resident = await prisma.residents.create({
            data: residentData,
            include: {
              unit: true,
              user: true,
            },
          });

          if (files && files.length > 0) {
            await this.handleDocumentUploads(
              resident.id,
              files,
              registRequest.documentTypes,
            );
          }

          return {
            user,
            resident,
            verificationCode,
          };
        },
        {
          timeout: 10000,
        },
      );

      if (registRequest.residentType === ResidentStatus.FAMILY_MEMBERS) {
        await this.createFamilyApprovalRequest(
          result.resident.id,
          registRequest.familyCode!,
        );
      }

      try {
        if (registRequest.residentType === ResidentStatus.FAMILY_MEMBERS) {
          const familyCodeRecord = await this.prisma.familyCodes.findUnique({
            where: { code: registRequest.familyCode! },
            include: {
              headResident: {
                include: { user: true },
              },
            },
          });

          if (familyCodeRecord) {
            await this.mailerService.sendFamilyMemberApprovalNotification({
              headOfHouseholdName: familyCodeRecord.headResident.user.fullName,
              headOfHouseholdEmail:
                familyCodeRecord.headResident.user.primaryEmail,
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
            propertyName: this.config.get(
              'APPLICATION_NAME',
              'Property Management',
            ),
          });
        }

        if (registRequest.residentType === ResidentStatus.HEAD_HOUSE_HOLD) {
          await this.mailerService.sendHeadOfHouseholdVerificationEmail({
            fullName: result.resident.user.fullName,
            email: result.user.primaryEmail,
            verificationCode: result.verificationCode,
            registrationType: registRequest.registrationMethod,
            isAdminDriven: false,
            unitNumber: result.resident.unit?.unitNumber,
            propertyName: this.config.get(
              'APPLICATION_NAME',
              'Property Management',
            ),
          });
        }
      } catch (emailError) {
        console.error(
          'Email sending failed, but registration successful:',
          emailError,
        );
      }

      return {
        message:
          'Registration successful. Please check your email for verification.',
        residentFullname: result.user.fullName,
        residentType: result.resident.residentStatus,
        requiresApproval:
          registRequest.residentType === ResidentStatus.FAMILY_MEMBERS,
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.error('Registration error:', error);
      throw new InternalServerErrorException(
        'Terjadi Kesalahan pada proses registrasi',
      );
    }
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.users.findFirst({
      where: { emailVerificationToken: token },
      include: {
        Resident: {
          include: { unit: true },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.users.update({
        where: { id: user.id },
        data: {
          emailVerificationToken: null,
        },
      });

      if (user.Resident) {
        let newStatus: RegistrationStatus;

        if (user.Resident.residentStatus === ResidentStatus.HEAD_HOUSE_HOLD) {
          newStatus = RegistrationStatus.APPROVED;
        } else {
          newStatus = RegistrationStatus.AWAITING_FAMILY_APPROVAL;
        }

        await prisma.residents.update({
          where: { id: user.Resident.id },
          data: {
            registrationStatus: newStatus,
          },
        });

        if (user.Resident.residentStatus === ResidentStatus.HEAD_HOUSE_HOLD) {
          await this.ensureFamilyCode(user.Resident.id, user.Resident.unitId!);
        }
      }
    });

    try {
      if (user.Resident) {
        if (user.Resident.residentStatus === ResidentStatus.HEAD_HOUSE_HOLD) {
          const familyCode = await this.prisma.familyCodes.findFirst({
            where: { headResident: { id: user.Resident.id } },
          });

          await this.mailerService.sendHeadOfHouseholdWelcomeEmail({
            fullName: user.fullName,
            email: user.primaryEmail,
            uniqueCode: familyCode?.code as string,
            loginUrl: `${this.config.get('APP_URL')}/auth/sign-in`,
            propertyName: this.config.get(
              'PROPERTY_NAME',
              'Property Management',
            ),
            unitNumber:
              user.Resident?.unit?.unitNumber ?? 'Unit tidak ditemukan',
          });
        }
      }
    } catch (emailError) {
      console.error('Welcome email sending failed:', emailError);
    }

    return {
      message:
        user.Resident?.residentStatus === ResidentStatus.HEAD_HOUSE_HOLD
          ? 'Email verified successfully. You can now sign in.'
          : 'Email verified successfully. Waiting for approval from head of household.',
    };
  }

  async approvalSystem(approvalRequest: {
    familyApprovalId: string;
    headOfHouseholdId: string;
    action: 'APPROVE' | 'REJECT';
    notes?: string;
  }) {
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
      throw new BadRequestException('Approval request not found');
    }

    if (approval.headOfHouseholdId !== approvalRequest.headOfHouseholdId) {
      throw new UnauthorizedException('Not authorized to approve this request');
    }

    const result = await this.prisma.$transaction(async (prisma) => {
      const updatedApproval = await prisma.familyApprovals.update({
        where: { id: approvalRequest.familyApprovalId },
        data: {
          status:
            approvalRequest.action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
          respondedAt: new Date(),
          notes: approvalRequest.notes,
        },
      });

      if (approvalRequest.action === 'APPROVE') {
        await prisma.residents.update({
          where: { id: approval.familyMemberId },
          data: {
            registrationStatus: RegistrationStatus.APPROVED,
            pendingApproval: false,
            approvedByHeadOfHousehold: approvalRequest.headOfHouseholdId,
            approvalDate: new Date(),
          },
        });

        const familyCode = await this.ensureFamilyCode(
          approval.headOfHouseholdId,
        );
        await prisma.residents.update({
          where: { id: approval.familyMemberId },
          data: { familyCode },
        });
      } else {
        await prisma.residents.update({
          where: { id: approval.familyMemberId },
          data: {
            registrationStatus: RegistrationStatus.REJECTED,
            pendingApproval: false,
            rejectionReason: approvalRequest.notes,
          },
        });
      }

      return updatedApproval;
    });

    try {
      if (approvalRequest.action === 'APPROVE') {
        const familyCode = await this.ensureFamilyCode(
          approval.headOfHouseholdId,
        );
        await this.mailerService.sendFamilyMemberWelcomeEmail({
          fullName: approval.familyMember.user.fullName,
          email: approval.familyMember.user.primaryEmail,
          uniqueCode: familyCode,
          loginUrl: `${this.config.get('APP_URL')}/auth/sign-in`,
          propertyName: this.config.get('PROPERTY_NAME', 'Property Management'),
          unitNumber: '',
        });
      } else {
        await this.mailerService.sendFamilyMemberRejectionNotification(
          approval.familyMember.user.primaryEmail,
          approval.familyMember.user.fullName,
          approval.headOfHousehold.user.fullName,
          approvalRequest.notes,
        );
      }
    } catch (emailError) {
      console.error('Approval email sending failed:', emailError);
    }

    return {
      message: `Family member ${approvalRequest.action === 'APPROVE' ? 'approved' : 'rejected'} successfully`,
      approval: result,
    };
  }

  private async ensureFamilyCode(
    headOfHouseholdId: string,
    unitId?: string,
  ): Promise<string> {
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

  private async createFamilyApprovalRequest(
    residentId: string,
    familyCode: string,
  ) {
    const familyCodeRecord = await this.prisma.familyCodes.findUnique({
      where: { code: familyCode },
    });

    if (!familyCodeRecord) {
      throw new BadRequestException('Invalid family code');
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

  async signIn(signInRequest: SignInRequest) {
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
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      signInRequest.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.emailVerificationToken !== null) {
      throw new UnauthorizedException(
        'Please verify your email before signing in',
      );
    }

    if (
      user.Resident &&
      user.Resident.registrationStatus !== RegistrationStatus.APPROVED
    ) {
      const statusMessages = {
        [RegistrationStatus.PENDING]:
          'Your registration is still being processed',
        [RegistrationStatus.REJECTED]: 'Your registration has been rejected',
        [RegistrationStatus.AWAITING_FAMILY_APPROVAL]:
          'Your registration is waiting for approval from head of household',
      };

      throw new UnauthorizedException(
        statusMessages[user.Resident.registrationStatus] ||
          'Your registration is still pending approval',
      );
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

  async generateTokens(userId: string) {
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

  async jwtCompare(token: string, userId: string): Promise<boolean> {
    try {
      const decoded = await this.jwt.verifyAsync(token);
      return decoded.sub === userId;
    } catch {
      return false;
    }
  }

  async resendVerificationEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { primaryEmail: email },
      include: {
        Resident: {
          include: { unit: true },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.emailVerificationToken === null) {
      throw new BadRequestException('Email already verified');
    }

    const newVerificationCode = this.mailerService.generateVerificationCode();

    await this.prisma.users.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: newVerificationCode,
      },
    });

    try {
      if (user.Resident?.residentStatus === ResidentStatus.FAMILY_MEMBERS) {
        await this.mailerService.sendFamilyMemberVerificationEmail({
          fullName: user.fullName,
          registrationType: user.Resident.registrationMethod,
          isAdminDriven: false,
          email: user.primaryEmail,
          verificationCode: newVerificationCode,
          propertyName: this.config.get(
            'APPLICATION_NAME',
            'Property Management',
          ),
        });
      } else {
        await this.mailerService.sendHeadOfHouseholdVerificationEmail({
          fullName: user.fullName,
          email: user.primaryEmail,
          verificationCode: newVerificationCode,
          registrationType:
            user.Resident?.registrationMethod || RegistrationMethod.USER_DRIVEN,
          isAdminDriven: false,
          unitNumber: user.Resident?.unit?.unitNumber,
          propertyName: this.config.get(
            'APPLICATION_NAME',
            'Property Management',
          ),
        });
      }
    } catch (emailError) {
      console.error('Resend verification email failed:', emailError);
      throw new InternalServerErrorException(
        'Failed to send verification email',
      );
    }

    return {
      message: 'Verification email sent successfully',
    };
  }

  private async validateFamilyCode(familyCode: string) {
    const family = await this.prisma.familyCodes.findUnique({
      where: { code: familyCode, isActive: true },
    });

    if (!family) {
      throw new BadRequestException('Invalid family code');
    }

    const memberCount = await this.prisma.residents.count({
      where: { familyCode },
    });

    if (memberCount >= family.maxMembers) {
      throw new BadRequestException(
        'Family has reached maximum number of members',
      );
    }
  }

  private async validateUnitOwnership(unitId: string) {
    const unit = await this.prisma.units.findUnique({
      where: { id: unitId },
    });

    if (!unit) {
      throw new BadRequestException('Unit not found');
    }

    if (unit?.status !== UnitStatus.AVAILABLE) {
      throw new BadRequestException('Unit is not available');
    }

    const existingHeadResident = await this.prisma.residents.findFirst({
      where: {
        unitId: unitId,
        residentStatus: ResidentStatus.HEAD_HOUSE_HOLD,
      },
    });

    if (existingHeadResident) {
      throw new BadRequestException('Unit sudah memiliki kepala keluarga');
    }
  }

  private async handleDocumentUploads(
    residentId: string,
    files: Express.Multer.File[],
    documentTypes?: string[],
  ) {
    const uploadPromises = files.map(async (file, index) => {
      const documentType = documentTypes?.[index] || 'ID_CARD';
      const fileUrl = this.saveFileToStorage(file);

      return this.prisma.residentDocuments.create({
        data: {
          residentId,
          documentType: documentType as any,
          fileName: file.originalname,
          fileUrl,
          fileSize: file.size,
          isVerified: false,
        },
      });
    });

    return Promise.all(uploadPromises);
  }

  private generateUniqueFamilyCode(): string {
    return 'FAM-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  }

  private saveFileToStorage(files: Express.Multer.File): string {
    return this.processSingleFiles(files);
  }
}
