import { Gender, ResidentStatus } from '../../common/database/generated/prisma';
export declare enum RegistrationMethod {
    ADMIN_DRIVEN = "ADMIN_DRIVEN",
    USER_DRIVEN = "USER_DRIVEN"
}
export declare class RegistRequest {
    readonly fullName: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly password: string;
    readonly dateOfBirth: Date;
    readonly gender: Gender;
    readonly contactNumber: string;
    readonly primaryEmail: string;
    readonly residentType: ResidentStatus;
    registrationMethod: RegistrationMethod;
    readonly emergencyContactName: string;
    readonly emergencyContactNumber: string;
    readonly movedInDate: Date;
    unitId: string;
    kprPaymentAmount?: number;
    kprDueDate?: string;
    isKprPaid?: boolean;
    familyCode?: string;
    documentTypes?: string[];
}
