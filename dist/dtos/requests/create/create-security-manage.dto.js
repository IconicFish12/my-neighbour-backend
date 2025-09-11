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
exports.CreateSecurityManageDto = void 0;
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../common/database/generated/prisma");
const class_transformer_1 = require("class-transformer");
class CreateSecurityManageDto {
    title;
    description;
    location;
    incidentDate;
    status;
    isPublished;
    employeeId;
}
exports.CreateSecurityManageDto = CreateSecurityManageDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Judul laporan harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Judul laporan tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateSecurityManageDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Deskripsi laporan harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Deskripsi laporan tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateSecurityManageDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Lokasi kejadian harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Lokasi kejadian tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateSecurityManageDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsDate)({
        message: 'Tanggal insiden harus berupa format tanggal yang valid.',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tanggal insiden tidak boleh kosong.' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateSecurityManageDto.prototype, "incidentDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(prisma_1.MaintenanceStatus, {
        message: 'Status laporan tidak valid. Pilihan: ' +
            Object.values(prisma_1.MaintenanceStatus).join(', '),
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status laporan tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateSecurityManageDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'Kolom "isPublished" harus berupa boolean.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateSecurityManageDto.prototype, "isPublished", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'ID pegawai harus berupa UUID versi 4 yang valid.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID pegawai tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateSecurityManageDto.prototype, "employeeId", void 0);
//# sourceMappingURL=create-security-manage.dto.js.map