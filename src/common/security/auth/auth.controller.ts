/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistRequest } from '../../../dtos/requests/regist-request';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SignInRequest } from '../../../dtos/requests/sign-in-request';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request as expressRequest } from 'express';
import { DatabaseService } from '../../../database/database.service';
import { ResidentStatus } from 'src/database/generated/prisma/client.ts';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: DatabaseService,
  ) {}

  @Post('sign-up')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          callback(null, true);
        } else {
          callback(new Error('Unsupported file type'), false);
        }
      },
    }),
  )
  registration(
    @Body() registrationDto: RegistRequest,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.authService.registration(registrationDto, files);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInRequest) {
    return this.authService.signIn(signInDto);
  }

  @Post('verify-email')
  verifyEmail(@Body('email-token') token: string) {
    if (!token) {
      throw new BadRequestException('Verification token is required');
    }
    return this.authService.verifyEmail(token);
  }

  @Post('resend-verification')
  async resendVerificationEmail(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.authService.resendVerificationEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req: expressRequest & { user: any }) {
    return this.authService.generateTokens(req.user.sub as string);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: expressRequest & { user: any }) {
    const userId = req.user.sub as string;

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
      throw new BadRequestException('User profile not found');
    }

    return {
      message: 'Profile retrieved successfully',
      user: userProfile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('family-approvals')
  async getFamilyApprovals(@Request() req: expressRequest & { user: any }) {
    const userId = req.user.sub as string;

    const resident = await this.prisma.residents.findFirst({
      where: { userId: userId },
    });

    if (!resident) {
      throw new BadRequestException('Resident profile not found');
    }

    if (resident.residentStatus !== ResidentStatus.HEAD_HOUSE_HOLD) {
      throw new BadRequestException(
        'Only head of household can view family approvals',
      );
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

  @UseGuards(JwtAuthGuard)
  @Patch('family-approval/:approvalId')
  async approveFamily(
    @Param('approvalId') approvalId: string,
    @Request() req: expressRequest & { user: any },
    @Body() approvalData: { action: 'APPROVE' | 'REJECT'; notes?: string },
  ) {
    if (!approvalId) {
      throw new BadRequestException('Approval ID is required');
    }

    if (
      !approvalData.action ||
      !['APPROVE', 'REJECT'].includes(approvalData.action)
    ) {
      throw new BadRequestException(
        'Valid action (APPROVE or REJECT) is required',
      );
    }

    const userId = req.user.sub as string;
    const resident = await this.prisma.residents.findFirst({
      where: { userId: userId },
    });

    if (!resident) {
      throw new BadRequestException('Resident profile not found');
    }

    if (resident.residentStatus !== ResidentStatus.HEAD_HOUSE_HOLD) {
      throw new BadRequestException(
        'Only head of household can approve family members',
      );
    }

    return this.authService.approvalSystem({
      familyApprovalId: approvalId,
      headOfHouseholdId: resident.id,
      ...approvalData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('family-approvals/history')
  async getFamilyApprovalHistory(
    @Request() req: expressRequest & { user: any },
  ) {
    const userId = req.user.sub as string;

    const resident = await this.prisma.residents.findFirst({
      where: { userId: userId },
    });

    if (!resident) {
      throw new BadRequestException('Resident profile not found');
    }

    if (resident.residentStatus !== ResidentStatus.HEAD_HOUSE_HOLD) {
      throw new BadRequestException(
        'Only head of household can view approval history',
      );
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

  @Get('registration-status/:email')
  async checkRegistrationStatus(@Param('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.prisma.users.findUnique({
      where: { primaryEmail: email },
      include: {
        Resident: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
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

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: expressRequest & { user: any }) {
    const userId = req.user.sub as string;

    const user = await this.prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.prisma.users.update({
      where: { id: userId },
      data: { sessionToken: null },
    });

    return {
      message: 'Logout successful',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate-session')
  async validateSession(@Request() req: expressRequest & { user: any }) {
    const userId = req.user.sub as string;

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
      throw new UnauthorizedException('Invalid session');
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

  @UseGuards(JwtAuthGuard)
  @Get('family-members')
  async getFamilyMembers(@Request() req: expressRequest & { user: any }) {
    const userId = req.user.sub as string;

    const resident = await this.prisma.residents.findFirst({
      where: { userId: userId },
    });

    if (!resident) {
      throw new BadRequestException('Resident profile not found');
    }

    if (resident.residentStatus !== ResidentStatus.HEAD_HOUSE_HOLD) {
      throw new BadRequestException(
        'Only head of household can view family members',
      );
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
        residentStatus: ResidentStatus.FAMILY_MEMBERS,
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
}
