"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentsReportFilterDto", {
    enumerable: true,
    get: function() {
        return PaymentsReportFilterDto;
    }
});
const _classvalidator = require("class-validator");
const _clientts = require("../../database/generated/prisma/client.ts");
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
let PaymentsReportFilterDto = class PaymentsReportFilterDto {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDateString)({}, {
        message: 'Tanggal mulai harus dalam format ISO 8601.'
    }),
    _ts_metadata("design:type", String)
], PaymentsReportFilterDto.prototype, "startDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDateString)({}, {
        message: 'Tanggal akhir harus dalam format ISO 8601.'
    }),
    _ts_metadata("design:type", String)
], PaymentsReportFilterDto.prototype, "endDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_clientts.PaymentStatus, {
        message: 'Status pembayaran tidak valid.'
    }),
    _ts_metadata("design:type", typeof _clientts.PaymentStatus === "undefined" ? Object : _clientts.PaymentStatus)
], PaymentsReportFilterDto.prototype, "status", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_clientts.PaymentType, {
        message: 'Tipe pembayaran tidak valid.'
    }),
    _ts_metadata("design:type", typeof _clientts.PaymentType === "undefined" ? Object : _clientts.PaymentType)
], PaymentsReportFilterDto.prototype, "paymentType", void 0);

//# sourceMappingURL=payments-report-filter-dto.js.map