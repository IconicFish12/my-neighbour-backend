"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComplaintManageDto = void 0;
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../common/database/generated/prisma");
const class_transformer_1 = require("class-transformer");
class CreateComplaintManageDto {
    title;
    description;
    category;
    status;
    submittedAt;
    resolvedAt;
    resolutionDetails;
    residentId;
    employeeId;
    unitId;
    images;
}
exports.CreateComplaintManageDto = CreateComplaintManageDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Judul keluhan harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Judul keluhan tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateComplaintManageDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Deskripsi keluhan harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Deskripsi keluhan tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateComplaintManageDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(prisma_1.MaintenanceCategory, {
        message: 'Kategori kerusakan tidak valid. Pilihan' +
            Object.values(prisma_1.MaintenanceCategory).join(', '),
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Kategori kerusakan (ringan/sedang/berat) tidak boleh kosong.',
    }),
    __metadata("design:type", String)
], CreateComplaintManageDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(prisma_1.ComplaintStatus, {
        message: 'Status keluhan tidak valid.Pilihan' +
            Object.values(prisma_1.MaintenanceStatus).join(', '),
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status keluhan tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateComplaintManageDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'Tanggal pengajuan keluhan harus berupa format tanggal.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tanggal pengajuan keluhan tidak boleh kosong.' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateComplaintManageDto.prototype, "submittedAt", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'Tanggal penyelesaian harus berupa format tanggal.' }),
    (0, class_validator_1.IsOptional)({ message: 'Tanggal penyelesaian bersifat opsional.' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateComplaintManageDto.prototype, "resolvedAt", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Detail penyelesaian harus berupa teks.' }),
    (0, class_validator_1.IsOptional)({ message: 'Detail penyelesaian bersifat opsional.' }),
    __metadata("design:type", String)
], CreateComplaintManageDto.prototype, "resolutionDetails", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'ID penghuni harus berupa UUID versi 4 yang valid.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID penghuni tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateComplaintManageDto.prototype, "residentId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'ID karyawan harus berupa UUID versi 4 yang valid.' }),
    (0, class_validator_1.IsOptional)({ message: 'ID karyawan bersifat opsional.' }),
    __metadata("design:type", String)
], CreateComplaintManageDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', {
        message: 'ID unit hunian harus berupa UUID versi 4 yang valid.',
    }),
    (0, class_validator_1.IsOptional)({ message: 'ID unit hunian bersifat opsional.' }),
    __metadata("design:type", String)
], CreateComplaintManageDto.prototype, "unitId", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Images harus berupa array.' }),
    (0, class_validator_1.IsString)({
        message: 'Setiap item gambar harus berupa URL (string).',
        each: true,
    }),
    (0, class_validator_1.IsOptional)({ message: 'Daftar gambar bersifat opsional.' }),
    __metadata("design:type", Array)
], CreateComplaintManageDto.prototype, "images", void 0);
//# sourceMappingURL=create-complaint-manage.dto.js.map