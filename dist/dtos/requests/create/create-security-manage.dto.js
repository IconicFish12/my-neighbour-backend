"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateSecurityManageDto", {
    enumerable: true,
    get: function() {
        return CreateSecurityManageDto;
    }
});
const _classvalidator = require("class-validator");
const _clientts = require("../../../database/generated/prisma/client.ts");
const _classtransformer = require("class-transformer");
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
let CreateSecurityManageDto = class CreateSecurityManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Judul laporan harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Judul laporan tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateSecurityManageDto.prototype, "title", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Deskripsi laporan harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Deskripsi laporan tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateSecurityManageDto.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Lokasi kejadian harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Lokasi kejadian tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateSecurityManageDto.prototype, "location", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal insiden harus berupa format tanggal yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Tanggal insiden tidak boleh kosong.'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateSecurityManageDto.prototype, "incidentDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_clientts.MaintenanceStatus, {
        message: 'Status laporan tidak valid. Pilihan: ' + Object.values(_clientts.MaintenanceStatus).join(', ')
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Status laporan tidak boleh kosong.'
    }),
    _ts_metadata("design:type", typeof _clientts.MaintenanceStatus === "undefined" ? Object : _clientts.MaintenanceStatus)
], CreateSecurityManageDto.prototype, "status", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)({
        message: 'Kolom "isPublished" harus berupa boolean.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], CreateSecurityManageDto.prototype, "isPublished", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID pegawai harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID pegawai tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateSecurityManageDto.prototype, "employeeId", void 0);

//# sourceMappingURL=create-security-manage.dto.js.map