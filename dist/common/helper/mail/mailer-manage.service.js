/* eslint-disable @typescript-eslint/no-unsafe-argument */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MailerManageService", {
    enumerable: true,
    get: function() {
        return MailerManageService;
    }
});
const _mailer = require("@nestjs-modules/mailer");
const _common = require("@nestjs/common");
const _clientts = require("../../../database/generated/prisma/client.ts");
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
let MailerManageService = class MailerManageService {
    // ✅ Retry mechanism untuk handle socket close
    async sendMailWithRetry(mailOptions, maxRetries = 3, delay = 1000) {
        let lastError;
        for(let attempt = 1; attempt <= maxRetries; attempt++){
            try {
                await this.mailService.sendMail(mailOptions);
                return; // Success, exit retry loop
            } catch (error) {
                lastError = error;
                this.logger.warn(`Email send attempt ${attempt}/${maxRetries} failed: ${lastError.message}`);
                if (attempt < maxRetries) {
                    // Wait before retry
                    await new Promise((resolve)=>setTimeout(resolve, delay * attempt));
                }
            }
        }
    }
    async sendHeadOfHouseholdVerificationEmail(data) {
        try {
            await this.sendMailWithRetry({
                to: data.email,
                subject: 'Verifikasi Registrasi Kepala Keluarga - ' + (data.propertyName || 'Property Management'),
                template: 'emailVerification',
                context: {
                    fullName: data.fullName,
                    verificationCode: data.verificationCode,
                    unitNumber: data.unitNumber,
                    propertyName: data.propertyName,
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Email verifikasi kepala rumah tangga dikirim ke ${data.email}`);
            return true;
        } catch (error) {
            this.logger.error(`Gagal mengirim email verifikasi kepala rumah tangga: ${error.message}`);
            this.logger.error(`Stack trace: ${error.stack}`);
            return false;
        }
    }
    async sendDocumentVerificationRequestToAdmin(data) {
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
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Permintaan verifikasi dokumen dikirim ke admin ${data.adminEmail}`);
            return true;
        } catch (error) {
            this.logger.error(`Gagal mengirim permintaan verifikasi dokumen: ${error.message}`);
            return false;
        }
    }
    async sendHeadOfHouseholdWelcomeEmail(data) {
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
                    residentStatus: _clientts.ResidentStatus.HEAD_HOUSE_HOLD,
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Email selamat datang kepala rumah tangga telah dikirim ke ${data.email}`);
            return true;
        } catch (error) {
            this.logger.error(`Gagal mengirim email selamat datang kepada kepala rumah tangga: ${error.message}`);
            return false;
        }
    }
    async sendFamilyMemberVerificationEmail(data) {
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
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Email verifikasi anggota keluarga dikirim ke ${data.email}`);
            return true;
        } catch (error) {
            this.logger.error(`Gagal mengirim email verifikasi anggota keluarga: ${error.message}`);
            return false;
        }
    }
    async sendFamilyMemberApprovalNotification(data) {
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
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Family member approval notification sent to ${data.headOfHouseholdEmail}`);
            return true;
        } catch (error) {
            this.logger.error(`Failed to send family member approval notification: ${error.message}`);
            this.logger.error(`Stack trace: ${error.stack}`);
            return false;
        }
    }
    async sendFamilyMemberWelcomeEmail(data) {
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
                    residentStatus: _clientts.ResidentStatus.FAMILY_MEMBERS,
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Family member welcome email sent to ${data.email}`);
            return true;
        } catch (error) {
            this.logger.error(`Failed to send family member welcome email: ${error.message}`);
            this.logger.error(`Stack trace: ${error.stack}`);
            return false;
        }
    }
    async sendAdminDrivenHeadOfHouseholdEmail(data) {
        try {
            await this.sendMailWithRetry({
                to: data.email,
                subject: 'Akun Anda Telah Dibuat - ' + (data.propertyName || 'Property Management'),
                template: 'admin-driven-head-household',
                context: {
                    fullName: data.fullName,
                    verificationCode: data.verificationCode,
                    unitNumber: data.unitNumber,
                    propertyName: data.propertyName,
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Admin-driven head of household email sent to ${data.email}`);
            return true;
        } catch (error) {
            this.logger.error(`Failed to send admin-driven head of household email: ${error.message}`);
            this.logger.error(`Stack trace: ${error.stack}`);
            return false;
        }
    }
    async sendAdminDrivenFamilyMemberEmail(data) {
        try {
            await this.sendMailWithRetry({
                to: data.email,
                subject: 'Akun Anggota Keluarga Telah Dibuat',
                template: 'admin-driven-family-member',
                context: {
                    fullName: data.fullName,
                    verificationCode: data.verificationCode,
                    propertyName: data.propertyName,
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Admin-driven family member email sent to ${data.email}`);
            return true;
        } catch (error) {
            this.logger.error(`Failed to send admin-driven family member email: ${error.message}`);
            this.logger.error(`Stack trace: ${error.stack}`);
            return false;
        }
    }
    async sendFamilyMemberRejectionNotification(familyMemberEmail, familyMemberName, headOfHouseholdName, reason) {
        try {
            await this.sendMailWithRetry({
                to: familyMemberEmail,
                subject: 'Registrasi Ditolak',
                template: 'rejectApproval',
                context: {
                    familyMemberName,
                    headOfHouseholdName,
                    reason: reason || 'Tidak memenuhi kriteria keluarga',
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Family member rejection notification sent to ${familyMemberEmail}`);
            return true;
        } catch (error) {
            this.logger.error(`Failed to send family member rejection notification: ${error.message}`);
            this.logger.error(`Stack trace: ${error.stack}`);
            return false;
        }
    }
    async sendDocumentApprovalNotification(applicantEmail, applicantName, documentType) {
        try {
            await this.sendMailWithRetry({
                to: applicantEmail,
                subject: `Dokumen ${documentType} Telah Diverifikasi`,
                template: 'document-approval',
                context: {
                    applicantName,
                    documentType,
                    year: new Date().getFullYear()
                }
            });
            this.logger.log(`Document approval notification sent to ${applicantEmail}`);
            return true;
        } catch (error) {
            this.logger.error(`Failed to send document approval notification: ${error.message}`);
            this.logger.error(`Stack trace: ${error.stack}`);
            return false;
        }
    }
    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    generateUniqueCode() {
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
        const random = Math.floor(100 + Math.random() * 900);
        return `HH-${dateStr}-${random}`;
    }
    constructor(mailService){
        this.mailService = mailService;
        this.logger = new _common.Logger(MailerManageService.name);
    }
};
MailerManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _mailer.MailerService === "undefined" ? Object : _mailer.MailerService
    ])
], MailerManageService);

//# sourceMappingURL=mailer-manage.service.js.map