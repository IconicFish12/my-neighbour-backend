"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OperationalReportFilterDto", {
    enumerable: true,
    get: function() {
        return OperationalReportFilterDto;
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
let OperationalReportFilterDto = class OperationalReportFilterDto {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDateString)({}, {
        message: 'Tanggal mulai harus dalam format ISO 8601.'
    }),
    _ts_metadata("design:type", String)
], OperationalReportFilterDto.prototype, "startDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDateString)({}, {
        message: 'Tanggal akhir harus dalam format ISO 8601.'
    }),
    _ts_metadata("design:type", String)
], OperationalReportFilterDto.prototype, "endDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_clientts.UserRole, {
        message: 'Peran pengguna tidak valid.'
    }),
    _ts_metadata("design:type", typeof _clientts.UserRole === "undefined" ? Object : _clientts.UserRole)
], OperationalReportFilterDto.prototype, "userRole", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], OperationalReportFilterDto.prototype, "unitStatus", void 0);

//# sourceMappingURL=operational-report-filter.js.map