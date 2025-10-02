/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import {
  DocumentVerificationData,
  FamilyMemberNotificationData,
  RegistrationEmailData,
  WelcomeEmailData,
} from './mail-interface';
import { ResidentStatus } from 'src/common/database/generated/prisma';

@Injectable()
export class MailerManageService {
  private readonly logger = new Logger(MailerManageService.name);
  constructor(private readonly mailService: MailerService) {}

  // ✅ Retry mechanism untuk handle socket close
  private async sendMailWithRetry(
    mailOptions: any,
    maxRetries: number = 3,
    delay: number = 1000,
  ): Promise<void> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.mailService.sendMail(mailOptions);
        return; // Success, exit retry loop
      } catch (error) {
        lastError = error as Error;
        this.logger.warn(
          `Email send attempt ${attempt}/${maxRetries} failed: ${lastError.message}`,
        );

        if (attempt < maxRetries) {
          // Wait before retry
          await new Promise((resolve) => setTimeout(resolve, delay * attempt));
        }
      }
    }
  }

  async sendHeadOfHouseholdVerificationEmail(
    data: RegistrationEmailData,
  ): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: data.email,
        subject:
          'Verifikasi Registrasi Kepala Keluarga - ' +
          (data.propertyName || 'Property Management'),
        template: 'emailVerification',
        context: {
          fullName: data.fullName,
          verificationCode: data.verificationCode,
          unitNumber: data.unitNumber,
          propertyName: data.propertyName,
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(
        `Email verifikasi kepala rumah tangga dikirim ke ${data.email}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Gagal mengirim email verifikasi kepala rumah tangga: ${(error as Error).message}`,
      );
      this.logger.error(`Stack trace: ${(error as Error).stack}`);
      return false;
    }
  }

  async sendDocumentVerificationRequestToAdmin(
    data: DocumentVerificationData,
  ): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: data.adminEmail,
        subject: `Review Dokumen - ${data.applicantName}`,
        template: 'reviewDocument',
        context: {
          applicantName: data.applicantName,
          applicantEmail: data.applicantEmail,
          documentType: data.documentType,
          submissionDate: data.submissionDate,
          reviewUrl: data.reviewUrl,
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(
        `Permintaan verifikasi dokumen dikirim ke admin ${data.adminEmail}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Gagal mengirim permintaan verifikasi dokumen: ${(error as Error).message}`,
      );
      return false;
    }
  }

  async sendHeadOfHouseholdWelcomeEmail(
    data: WelcomeEmailData,
  ): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: data.email,
        subject: 'Selamat Datang! Registrasi Berhasil',
        template: 'emailWelcome',
        context: {
          fullName: data.fullName,
          uniqueCode: data.uniqueCode,
          loginUrl: data.loginUrl,
          propertyName: data.propertyName,
          unitNumber: data.unitNumber,
          residentStatus: ResidentStatus.HEAD_HOUSE_HOLD,
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(
        `Email selamat datang kepala rumah tangga telah dikirim ke ${data.email}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Gagal mengirim email selamat datang kepada kepala rumah tangga: ${(error as Error).message}`,
      );
      return false;
    }
  }

  async sendFamilyMemberVerificationEmail(
    data: RegistrationEmailData,
  ): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: data.email,
        subject: 'Verifikasi Registrasi Anggota Keluarga',
        template: 'emailVerification',
        context: {
          fullName: data.fullName,
          verificationCode: data.verificationCode,
          propertyName: data.propertyName,
          isAdminDriven: data.isAdminDriven,
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(
        `Email verifikasi anggota keluarga dikirim ke ${data.email}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Gagal mengirim email verifikasi anggota keluarga: ${(error as Error).message}`,
      );
      return false;
    }
  }

  async sendFamilyMemberApprovalNotification(
    data: FamilyMemberNotificationData,
  ): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: data.headOfHouseholdEmail,
        subject: 'Persetujuan Diperlukan - Anggota Keluarga Baru',
        template: 'familyApproval',
        context: {
          headOfHouseholdName: data.headOfHouseholdName,
          familyMemberName: data.familyMemberName,
          familyMemberEmail: data.familyMemberEmail,
          uniqueCode: data.uniqueCode,
          actionUrl: data.actionUrl,
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(
        `Family member approval notification sent to ${data.headOfHouseholdEmail}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send family member approval notification: ${(error as Error).message}`,
      );
      this.logger.error(`Stack trace: ${(error as Error).stack}`);
      return false;
    }
  }

  async sendFamilyMemberWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: data.email,
        subject: 'Selamat Datang! Registrasi Anggota Keluarga Berhasil',
        template: 'emailWelcome',
        context: {
          fullName: data.fullName,
          uniqueCode: data.uniqueCode,
          loginUrl: data.loginUrl,
          propertyName: data.propertyName,
          unitNumber: data.unitNumber,
          residentStatus: ResidentStatus.FAMILY_MEMBERS,
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(`Family member welcome email sent to ${data.email}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send family member welcome email: ${(error as Error).message}`,
      );
      this.logger.error(`Stack trace: ${(error as Error).stack}`);
      return false;
    }
  }

  async sendAdminDrivenHeadOfHouseholdEmail(
    data: RegistrationEmailData,
  ): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: data.email,
        subject:
          'Akun Anda Telah Dibuat - ' +
          (data.propertyName || 'Property Management'),
        template: 'admin-driven-head-household',
        context: {
          fullName: data.fullName,
          verificationCode: data.verificationCode,
          unitNumber: data.unitNumber,
          propertyName: data.propertyName,
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(
        `Admin-driven head of household email sent to ${data.email}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send admin-driven head of household email: ${(error as Error).message}`,
      );
      this.logger.error(`Stack trace: ${(error as Error).stack}`);
      return false;
    }
  }

  async sendAdminDrivenFamilyMemberEmail(
    data: RegistrationEmailData,
  ): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: data.email,
        subject: 'Akun Anggota Keluarga Telah Dibuat',
        template: 'admin-driven-family-member',
        context: {
          fullName: data.fullName,
          verificationCode: data.verificationCode,
          propertyName: data.propertyName,
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(`Admin-driven family member email sent to ${data.email}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send admin-driven family member email: ${(error as Error).message}`,
      );
      this.logger.error(`Stack trace: ${(error as Error).stack}`);
      return false;
    }
  }

  async sendFamilyMemberRejectionNotification(
    familyMemberEmail: string,
    familyMemberName: string,
    headOfHouseholdName: string,
    reason?: string,
  ): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: familyMemberEmail,
        subject: 'Registrasi Ditolak',
        template: 'rejectApproval',
        context: {
          familyMemberName,
          headOfHouseholdName,
          reason: reason || 'Tidak memenuhi kriteria keluarga',
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(
        `Family member rejection notification sent to ${familyMemberEmail}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send family member rejection notification: ${(error as Error).message}`,
      );
      this.logger.error(`Stack trace: ${(error as Error).stack}`);
      return false;
    }
  }

  async sendDocumentApprovalNotification(
    applicantEmail: string,
    applicantName: string,
    documentType: string,
  ): Promise<boolean> {
    try {
      await this.sendMailWithRetry({
        to: applicantEmail,
        subject: `Dokumen ${documentType} Telah Diverifikasi`,
        template: 'document-approval',
        context: {
          applicantName,
          documentType,
          year: new Date().getFullYear(),
        },
      });

      this.logger.log(
        `Document approval notification sent to ${applicantEmail}`,
      );
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to send document approval notification: ${(error as Error).message}`,
      );
      this.logger.error(`Stack trace: ${(error as Error).stack}`);
      return false;
    }
  }

  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  generateUniqueCode(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(100 + Math.random() * 900);
    return `HH-${dateStr}-${random}`;
  }
}
