import { MailerService } from '@nestjs-modules/mailer';
import { DocumentVerificationData, FamilyMemberNotificationData, RegistrationEmailData, WelcomeEmailData } from './mail-interface';
export declare class MailerManageService {
    private readonly mailService;
    private readonly logger;
    constructor(mailService: MailerService);
    private sendMailWithRetry;
    sendHeadOfHouseholdVerificationEmail(data: RegistrationEmailData): Promise<boolean>;
    sendDocumentVerificationRequestToAdmin(data: DocumentVerificationData): Promise<boolean>;
    sendHeadOfHouseholdWelcomeEmail(data: WelcomeEmailData): Promise<boolean>;
    sendFamilyMemberVerificationEmail(data: RegistrationEmailData): Promise<boolean>;
    sendFamilyMemberApprovalNotification(data: FamilyMemberNotificationData): Promise<boolean>;
    sendFamilyMemberWelcomeEmail(data: WelcomeEmailData): Promise<boolean>;
    sendAdminDrivenHeadOfHouseholdEmail(data: RegistrationEmailData): Promise<boolean>;
    sendAdminDrivenFamilyMemberEmail(data: RegistrationEmailData): Promise<boolean>;
    sendFamilyMemberRejectionNotification(familyMemberEmail: string, familyMemberName: string, headOfHouseholdName: string, reason?: string): Promise<boolean>;
    sendDocumentApprovalNotification(applicantEmail: string, applicantName: string, documentType: string): Promise<boolean>;
    generateVerificationCode(): string;
    generateUniqueCode(): string;
}
