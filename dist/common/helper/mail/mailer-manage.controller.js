"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get MailerManageController () {
        return MailerManageController;
    },
    get SendApprovalNotificationDto () {
        return SendApprovalNotificationDto;
    },
    get SendDocumentReviewDto () {
        return SendDocumentReviewDto;
    },
    get SendVerificationEmailDto () {
        return SendVerificationEmailDto;
    }
});
const _common = require("@nestjs/common");
const _mailermanageservice = require("./mailer-manage.service");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let SendVerificationEmailDto = class SendVerificationEmailDto {
};
let SendApprovalNotificationDto = class SendApprovalNotificationDto {
};
let SendDocumentReviewDto = class SendDocumentReviewDto {
};
let MailerManageController = class MailerManageController {
    async sendVerificationEmail(dto) {
        try {
            const verificationCode = this.mailerManageService.generateVerificationCode();
            const emailData = {
                ...dto,
                verificationCode
            };
            let result;
            if (dto.registrationType === _clientts.RegistrationMethod.ADMIN_DRIVEN) {
                if (dto.isAdminDriven == true) {
                    result = await this.mailerManageService.sendAdminDrivenHeadOfHouseholdEmail(emailData);
                } else {
                    result = await this.mailerManageService.sendHeadOfHouseholdVerificationEmail(emailData);
                }
            } else {
                if (dto.isAdminDriven == false) {
                    result = await this.mailerManageService.sendAdminDrivenFamilyMemberEmail(emailData);
                } else {
                    result = await this.mailerManageService.sendFamilyMemberVerificationEmail(emailData);
                }
            }
            if (!result) {
                throw new _common.HttpException('Gagal untuk mengirim email verifikasi', _common.HttpStatus.BAD_REQUEST);
            }
            return {
                message: 'Email verifikasi berhasil dikirim',
                verificationCode
            };
        } catch (error) {
            throw new _common.HttpException(error.message, _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendApprovalNotification(dto) {
        try {
            const result = await this.mailerManageService.sendFamilyMemberApprovalNotification(dto);
            if (!result) {
                throw new _common.HttpException('Gagal mengirim pemberitahuan persetujuan', _common.HttpStatus.BAD_REQUEST);
            }
            return {
                message: 'Pemberitahuan persetujuan berhasil dikirim'
            };
        } catch (error) {
            throw new _common.HttpException(error.message, _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendDocumentReview(dto) {
        try {
            const reviewData = {
                ...dto,
                submissionDate: new Date().toLocaleDateString('id-ID')
            };
            const result = await this.mailerManageService.sendDocumentVerificationRequestToAdmin(reviewData);
            if (!result) {
                throw new _common.HttpException('Failed to send document review request', _common.HttpStatus.BAD_REQUEST);
            }
            return {
                message: 'Document review request sent successfully'
            };
        } catch (error) {
            throw new _common.HttpException(error.message, _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendWelcomeEmail(body) {
        try {
            const uniqueCode = this.mailerManageService.generateUniqueCode();
            const welcomeData = {
                ...body,
                uniqueCode
            };
            let result;
            if (body.registrationType === 'head-of-household') {
                result = await this.mailerManageService.sendHeadOfHouseholdWelcomeEmail(welcomeData);
            } else {
                result = await this.mailerManageService.sendFamilyMemberWelcomeEmail(welcomeData);
            }
            if (!result) {
                throw new _common.HttpException('Failed to send welcome email', _common.HttpStatus.BAD_REQUEST);
            }
            return {
                message: 'Welcome email sent successfully',
                uniqueCode
            };
        } catch (error) {
            throw new _common.HttpException(error.message, _common.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    constructor(mailerManageService){
        this.mailerManageService = mailerManageService;
    }
};
_ts_decorate([
    (0, _common.Post)('send-verification'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof SendVerificationEmailDto === "undefined" ? Object : SendVerificationEmailDto
    ]),
    _ts_metadata("design:returntype", Promise)
], MailerManageController.prototype, "sendVerificationEmail", null);
_ts_decorate([
    (0, _common.Post)('send-document-review'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof SendApprovalNotificationDto === "undefined" ? Object : SendApprovalNotificationDto
    ]),
    _ts_metadata("design:returntype", Promise)
], MailerManageController.prototype, "sendApprovalNotification", null);
_ts_decorate([
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof SendDocumentReviewDto === "undefined" ? Object : SendDocumentReviewDto
    ]),
    _ts_metadata("design:returntype", Promise)
], MailerManageController.prototype, "sendDocumentReview", null);
_ts_decorate([
    (0, _common.Post)('send-welcome'),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], MailerManageController.prototype, "sendWelcomeEmail", null);
MailerManageController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _mailermanageservice.MailerManageService === "undefined" ? Object : _mailermanageservice.MailerManageService
    ])
], MailerManageController);

//# sourceMappingURL=mailer-manage.controller.js.map