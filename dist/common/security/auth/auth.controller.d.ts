import { AuthService } from './auth.service';
import { RegistRequest } from '../../../dtos/requests/regist-request';
import { SignInRequest } from '../../../dtos/requests/sign-in-request';
import { Request as expressRequest } from 'express';
import { DatabaseService } from '../../../common/database/database.service';
export declare class AuthController {
    private readonly authService;
    private readonly prisma;
    constructor(authService: AuthService, prisma: DatabaseService);
    registration(registrationDto: RegistRequest, files?: Express.Multer.File[]): Promise<{
        message: string;
        residentFullname: string;
        residentType: import("src/common/database/generated/prisma").$Enums.ResidentStatus | null;
        requiresApproval: boolean;
    }>;
    signIn(signInDto: SignInRequest): Promise<{
        accessToken: string;
        refreshToken: string;
        message: string;
        user: {
            id: string;
            username: string;
            email: string;
            fullName: string;
            resident: ({
                unit: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    status: import("src/common/database/generated/prisma").$Enums.UnitStatus;
                    unitNumber: string;
                    buildingName: string | null;
                    unitOwnership: string[];
                    floorNumber: number | null;
                    numberOfRooms: number | null;
                    priceSale: number;
                    squareFootage: number | null;
                    location: string;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                emergencyContactName: string | null;
                emergencyContactNumber: string | null;
                movedInDate: Date;
                movedOutDate: Date | null;
                familyCode: string | null;
                residentStatus: import("src/common/database/generated/prisma").$Enums.ResidentStatus | null;
                kprPaymentAmount: number | null;
                kprDueDate: Date | null;
                isKprPaid: boolean | null;
                registrationStatus: import("src/common/database/generated/prisma").$Enums.RegistrationStatus;
                registrationMethod: import("src/common/database/generated/prisma").$Enums.RegistrationMethod;
                approvedBy: string | null;
                approvalDate: Date | null;
                rejectionReason: string | null;
                pendingApproval: boolean;
                approvedByHeadOfHousehold: string | null;
                userId: string;
                unitId: string | null;
            }) | null;
        };
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerificationEmail(email: string): Promise<{
        message: string;
    }>;
    refreshToken(req: expressRequest & {
        user: any;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getProfile(req: expressRequest & {
        user: any;
    }): Promise<{
        message: string;
        user: {
            Resident: ({
                unit: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    status: import("src/common/database/generated/prisma").$Enums.UnitStatus;
                    unitNumber: string;
                    buildingName: string | null;
                    unitOwnership: string[];
                    floorNumber: number | null;
                    numberOfRooms: number | null;
                    priceSale: number;
                    squareFootage: number | null;
                    location: string;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                emergencyContactName: string | null;
                emergencyContactNumber: string | null;
                movedInDate: Date;
                movedOutDate: Date | null;
                familyCode: string | null;
                residentStatus: import("src/common/database/generated/prisma").$Enums.ResidentStatus | null;
                kprPaymentAmount: number | null;
                kprDueDate: Date | null;
                isKprPaid: boolean | null;
                registrationStatus: import("src/common/database/generated/prisma").$Enums.RegistrationStatus;
                registrationMethod: import("src/common/database/generated/prisma").$Enums.RegistrationMethod;
                approvedBy: string | null;
                approvalDate: Date | null;
                rejectionReason: string | null;
                pendingApproval: boolean;
                approvedByHeadOfHousehold: string | null;
                userId: string;
                unitId: string | null;
            }) | null;
        } & {
            id: string;
            fullName: string;
            firstName: string;
            lastName: string;
            username: string;
            dateOfBirth: Date | null;
            contactNumber: string | null;
            primaryEmail: string;
            secondaryEmail: string | null;
            password: string;
            sessionToken: string | null;
            emailVerificationToken: string | null;
            passwordResetToken: string | null;
            role: import("src/common/database/generated/prisma").$Enums.UserRole;
            gender: import("src/common/database/generated/prisma").$Enums.Gender | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getFamilyApprovals(req: expressRequest & {
        user: any;
    }): Promise<{
        message: string;
        approvals: ({
            familyMember: {
                user: {
                    id: string;
                    fullName: string;
                    contactNumber: string | null;
                    primaryEmail: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                emergencyContactName: string | null;
                emergencyContactNumber: string | null;
                movedInDate: Date;
                movedOutDate: Date | null;
                familyCode: string | null;
                residentStatus: import("src/common/database/generated/prisma").$Enums.ResidentStatus | null;
                kprPaymentAmount: number | null;
                kprDueDate: Date | null;
                isKprPaid: boolean | null;
                registrationStatus: import("src/common/database/generated/prisma").$Enums.RegistrationStatus;
                registrationMethod: import("src/common/database/generated/prisma").$Enums.RegistrationMethod;
                approvedBy: string | null;
                approvalDate: Date | null;
                rejectionReason: string | null;
                pendingApproval: boolean;
                approvedByHeadOfHousehold: string | null;
                userId: string;
                unitId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            familyMemberId: string;
            headOfHouseholdId: string;
            status: import("src/common/database/generated/prisma").$Enums.ApprovalStatus;
            requestedAt: Date;
            respondedAt: Date | null;
            notes: string | null;
        })[];
        totalPending: number;
    }>;
    approveFamily(approvalId: string, req: expressRequest & {
        user: any;
    }, approvalData: {
        action: 'APPROVE' | 'REJECT';
        notes?: string;
    }): Promise<{
        message: string;
        approval: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            familyMemberId: string;
            headOfHouseholdId: string;
            status: import("src/common/database/generated/prisma").$Enums.ApprovalStatus;
            requestedAt: Date;
            respondedAt: Date | null;
            notes: string | null;
        };
    }>;
    getFamilyApprovalHistory(req: expressRequest & {
        user: any;
    }): Promise<{
        message: string;
        history: ({
            familyMember: {
                user: {
                    id: string;
                    fullName: string;
                    contactNumber: string | null;
                    primaryEmail: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                emergencyContactName: string | null;
                emergencyContactNumber: string | null;
                movedInDate: Date;
                movedOutDate: Date | null;
                familyCode: string | null;
                residentStatus: import("src/common/database/generated/prisma").$Enums.ResidentStatus | null;
                kprPaymentAmount: number | null;
                kprDueDate: Date | null;
                isKprPaid: boolean | null;
                registrationStatus: import("src/common/database/generated/prisma").$Enums.RegistrationStatus;
                registrationMethod: import("src/common/database/generated/prisma").$Enums.RegistrationMethod;
                approvedBy: string | null;
                approvalDate: Date | null;
                rejectionReason: string | null;
                pendingApproval: boolean;
                approvedByHeadOfHousehold: string | null;
                userId: string;
                unitId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            familyMemberId: string;
            headOfHouseholdId: string;
            status: import("src/common/database/generated/prisma").$Enums.ApprovalStatus;
            requestedAt: Date;
            respondedAt: Date | null;
            notes: string | null;
        })[];
        totalProcessed: number;
    }>;
    checkRegistrationStatus(email: string): Promise<{
        message: string;
        status: {
            emailVerified: boolean;
            registrationStatus: import("src/common/database/generated/prisma").$Enums.RegistrationStatus | undefined;
            residentStatus: import("src/common/database/generated/prisma").$Enums.ResidentStatus | null | undefined;
            pendingApproval: boolean;
        };
    }>;
    logout(req: expressRequest & {
        user: any;
    }): Promise<{
        message: string;
    }>;
    validateSession(req: expressRequest & {
        user: any;
    }): Promise<{
        message: string;
        user: {
            id: string;
            username: string;
            fullName: string;
            email: string;
        };
    }>;
    getFamilyMembers(req: expressRequest & {
        user: any;
    }): Promise<{
        message: string;
        familyMembers: never[];
        familyCode: null;
        totalMembers?: undefined;
    } | {
        message: string;
        familyMembers: ({
            user: {
                id: string;
                fullName: string;
                contactNumber: string | null;
                primaryEmail: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            emergencyContactName: string | null;
            emergencyContactNumber: string | null;
            movedInDate: Date;
            movedOutDate: Date | null;
            familyCode: string | null;
            residentStatus: import("src/common/database/generated/prisma").$Enums.ResidentStatus | null;
            kprPaymentAmount: number | null;
            kprDueDate: Date | null;
            isKprPaid: boolean | null;
            registrationStatus: import("src/common/database/generated/prisma").$Enums.RegistrationStatus;
            registrationMethod: import("src/common/database/generated/prisma").$Enums.RegistrationMethod;
            approvedBy: string | null;
            approvalDate: Date | null;
            rejectionReason: string | null;
            pendingApproval: boolean;
            approvedByHeadOfHousehold: string | null;
            userId: string;
            unitId: string | null;
        })[];
        familyCode: string;
        totalMembers: number;
    }>;
}
