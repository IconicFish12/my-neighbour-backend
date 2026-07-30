"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateComplaintManageDto", {
    enumerable: true,
    get: function() {
        return CreateComplaintManageDto;
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
let CreateComplaintManageDto = class CreateComplaintManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Judul keluhan harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Judul keluhan tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateComplaintManageDto.prototype, "title", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Deskripsi keluhan harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Deskripsi keluhan tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateComplaintManageDto.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_clientts.MaintenanceCategory, {
        message: 'Kategori kerusakan tidak valid. Pilihan' + Object.values(_clientts.MaintenanceCategory).join(', ')
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Kategori kerusakan (ringan/sedang/berat) tidak boleh kosong.'
    }),
    _ts_metadata("design:type", typeof _clientts.MaintenanceCategory === "undefined" ? Object : _clientts.MaintenanceCategory)
], CreateComplaintManageDto.prototype, "category", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_clientts.ComplaintStatus, {
        message: 'Status keluhan tidak valid.Pilihan' + Object.values(_clientts.MaintenanceStatus).join(', ')
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Status keluhan tidak boleh kosong.'
    }),
    _ts_metadata("design:type", typeof _clientts.ComplaintStatus === "undefined" ? Object : _clientts.ComplaintStatus)
], CreateComplaintManageDto.prototype, "status", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal pengajuan keluhan harus berupa format tanggal.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Tanggal pengajuan keluhan tidak boleh kosong.'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateComplaintManageDto.prototype, "submittedAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal penyelesaian harus berupa format tanggal.'
    }),
    (0, _classvalidator.IsOptional)({
        message: 'Tanggal penyelesaian bersifat opsional.'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateComplaintManageDto.prototype, "resolvedAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Detail penyelesaian harus berupa teks.'
    }),
    (0, _classvalidator.IsOptional)({
        message: 'Detail penyelesaian bersifat opsional.'
    }),
    _ts_metadata("design:type", String)
], CreateComplaintManageDto.prototype, "resolutionDetails", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID penghuni harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID penghuni tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateComplaintManageDto.prototype, "residentId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID karyawan harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsOptional)({
        message: 'ID karyawan bersifat opsional.'
    }),
    _ts_metadata("design:type", String)
], CreateComplaintManageDto.prototype, "employeeId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID unit hunian harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsOptional)({
        message: 'ID unit hunian bersifat opsional.'
    }),
    _ts_metadata("design:type", String)
], CreateComplaintManageDto.prototype, "unitId", void 0);
_ts_decorate([
    (0, _classvalidator.IsArray)({
        message: 'Images harus berupa array.'
    }),
    (0, _classvalidator.IsString)({
        message: 'Setiap item gambar harus berupa URL (string).',
        each: true
    }),
    (0, _classvalidator.IsOptional)({
        message: 'Daftar gambar bersifat opsional.'
    }),
    _ts_metadata("design:type", Array)
], CreateComplaintManageDto.prototype, "images", void 0);

//# sourceMappingURL=create-complaint-manage.dto.js.map