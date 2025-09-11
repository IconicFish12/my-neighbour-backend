/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
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
import { DatabaseService } from '../../../common/database/database.service';

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

  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
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

    return {
      message: 'Profile retrieved successfully',
      userId: userProfile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('family-approvals')
  async getFamilyApprovals(@Request() req: expressRequest & { user: any }) {
    // Get pending family approval requests for head of household
    const userId = req.user.sub as string;

    const resident = await this.prisma.residents.findFirst({
      where: { userId: userId },
    });

    if (!resident) {
      throw new BadRequestException('Resident profile not found');
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

  @UseGuards(JwtAuthGuard)
  @Patch('family-approval/:approvalId')
  async approveFamily(
    @Param('approvalId') approvalId: string,
    @Request() req: expressRequest & { user: any },
    @Body() approvalData: { action: 'APPROVE' | 'REJECT'; notes?: string },
  ) {
    // Get resident ID from user
    const userId = req.user.sub as string;
    const resident = await this.prisma.residents.findFirst({
      where: { userId: userId },
    });

    if (!resident) {
      throw new BadRequestException('Resident profile not found');
    }

    return this.authService.approvalSystem({
      familyApprovalId: approvalId,
      headOfHouseholdId: resident.id,
      ...approvalData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: expressRequest & { user: any }) {
    // Clear session token
    const userId = req.user.sub as string;
    await this.prisma.users.update({
      where: { id: userId },
      data: { sessionToken: null },
    });

    return {
      message: 'Logout successful',
    };
  }
}
