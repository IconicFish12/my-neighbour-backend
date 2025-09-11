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
exports.CreateEmployeeManageDto = void 0;
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../common/database/generated/prisma");
const is_unique_validators_1 = require("../../../common/pipes/validators/is-unique-validators");
const class_transformer_1 = require("class-transformer");
class CreateEmployeeManageDto {
    userId;
    employeeNumberId;
    hireDate;
    employeePosition;
    workingHours;
    salary;
    bonus;
}
exports.CreateEmployeeManageDto = CreateEmployeeManageDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', {
        message: 'ID pengguna aplikasi harus berupa UUID versi 4 yang valid.',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID pengguna aplikasi tidak boleh kosong.' }),
    (0, is_unique_validators_1.IsUnique)({ field: 'userId', model: 'employees' }, { message: 'pengguna sudah terdaftar sudah terdaftar' }),
    __metadata("design:type", String)
], CreateEmployeeManageDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nomor identitas Pegawai harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nomor identitas Pegawai tidak boleh kosong.' }),
    (0, is_unique_validators_1.IsUnique)({ field: 'employeeNumberId', model: 'employees' }, { message: 'ID dari pegawai sudah terdaftar' }),
    __metadata("design:type", String)
], CreateEmployeeManageDto.prototype, "employeeNumberId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tanggal mulai kerja tidak boleh kosong.' }),
    (0, class_validator_1.IsDate)({
        message: 'Tanggal mulai kerja harus berupa format tanggal yang valid.',
    }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateEmployeeManageDto.prototype, "hireDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Posisi Pegawai tidak boleh kosong.' }),
    (0, class_validator_1.IsEnum)(prisma_1.EmployeeRole, {
        message: 'Posisi Pegawai tidak valid. Pilihan' +
            Object.values(prisma_1.EmployeeRole).join(', '),
    }),
    __metadata("design:type", String)
], CreateEmployeeManageDto.prototype, "employeePosition", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Jam kerja tidak boleh kosong.' }),
    (0, class_validator_1.IsInt)({ message: 'Jam kerja harus berupa angka bulat.' }),
    (0, class_validator_1.Min)(0, { message: 'Jam kerja tidak boleh kurang dari 0.' }),
    (0, class_validator_1.Max)(24, { message: 'Jam kerja tidak boleh lebih dari 24.' }),
    __metadata("design:type", Number)
], CreateEmployeeManageDto.prototype, "workingHours", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Gaji tidak boleh kosong.' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Gaji harus berupa angka.' }),
    (0, class_validator_1.IsPositive)({ message: 'Gaji harus bernilai positif.' }),
    __metadata("design:type", Number)
], CreateEmployeeManageDto.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Bonus tidak boleh kosong.' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Bonus harus berupa angka.' }),
    (0, class_validator_1.IsPositive)({ message: 'Bonus harus bernilai positif.' }),
    __metadata("design:type", Number)
], CreateEmployeeManageDto.prototype, "bonus", void 0);
//# sourceMappingURL=create-employee-manage.dto.js.map