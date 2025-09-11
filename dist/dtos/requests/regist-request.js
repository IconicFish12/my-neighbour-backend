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
exports.RegistRequest = exports.RegistrationMethod = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../common/database/generated/prisma");
const is_unique_validators_1 = require("../../common/pipes/validators/is-unique-validators");
var RegistrationMethod;
(function (RegistrationMethod) {
    RegistrationMethod["ADMIN_DRIVEN"] = "ADMIN_DRIVEN";
    RegistrationMethod["USER_DRIVEN"] = "USER_DRIVEN";
})(RegistrationMethod || (exports.RegistrationMethod = RegistrationMethod = {}));
class RegistRequest {
    fullName;
    firstName;
    lastName;
    username;
    password;
    dateOfBirth;
    gender;
    contactNumber;
    primaryEmail;
    residentType;
    registrationMethod;
    emergencyContactName;
    emergencyContactNumber;
    movedInDate;
    unitId;
    kprPaymentAmount;
    kprDueDate;
    isKprPaid;
    familyCode;
    documentTypes;
}
exports.RegistRequest = RegistRequest;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nama lengkap harus berupa teks' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nama lengkap tidak boleh kosong' }),
    __metadata("design:type", String)
], RegistRequest.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nama depan harus berupa teks' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nama depan tidak boleh kosong' }),
    __metadata("design:type", String)
], RegistRequest.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nama belakang harus berupa teks' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nama belakang tidak boleh kosong' }),
    __metadata("design:type", String)
], RegistRequest.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Username harus berupa teks' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Username tidak boleh kosong' }),
    (0, is_unique_validators_1.IsUnique)({ field: 'username', model: 'users' }, { message: 'Username sudah terdaftar ' }),
    (0, class_validator_1.MinLength)(5, { message: 'Username harus lebih dari 5 karakter' }),
    (0, class_validator_1.MaxLength)(15, { message: 'Username harus kurang dari 15 karakter' }),
    __metadata("design:type", String)
], RegistRequest.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password harus berupa teks' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password tidak boleh kosong' }),
    (0, class_validator_1.MinLength)(4, { message: 'Password minimal 4 karakter' }),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 4,
        minLowercase: 1,
        minNumbers: 3,
        minSymbols: 1,
        minUppercase: 1,
    }, {
        message: 'Kata sandi harus minimal 4 karakter, 3 angka, dan 1 simbol.',
    }),
    (0, class_validator_1.MaxLength)(15, {
        message: 'Password maksimal 15 karakter',
    }),
    __metadata("design:type", String)
], RegistRequest.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'Tanggal lahir harus berupa format tanggal' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], RegistRequest.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Jenis kelamin tidak boleh kosong' }),
    (0, class_validator_1.IsEnum)(prisma_1.Gender, {
        message: 'Jenis kelamin tidak valid: ' + Object.values(prisma_1.Gender).join(', '),
    }),
    __metadata("design:type", String)
], RegistRequest.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nomor kontak harus berupa teks' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegistRequest.prototype, "contactNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Email utama harus berupa teks' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email utama tidak boleh kosong' }),
    (0, is_unique_validators_1.IsUnique)({ field: 'primaryEmail', model: 'users' }, { message: 'Email utama sudah digunakan' }),
    (0, class_validator_1.IsEmail)({
        ignore_max_length: true,
        allow_display_name: true,
    }, {
        message: 'Kolom Email harus berupa Email yang valid',
    }),
    __metadata("design:type", String)
], RegistRequest.prototype, "primaryEmail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Status penghuni tidak boleh kosong.' }),
    (0, class_validator_1.IsEnum)(prisma_1.ResidentStatus, {
        message: 'Status penghuni tidak valid. Pilihan: ' +
            Object.values(prisma_1.ResidentStatus).join(', ').toLowerCase(),
    }),
    __metadata("design:type", String)
], RegistRequest.prototype, "residentType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'metode registrasi tidak boleh kosong' }),
    (0, class_validator_1.IsEnum)(RegistrationMethod, {
        message: 'metode registrasi tidak valid. Pilihan: ' +
            Object.values(RegistrationMethod).join(', '),
    }),
    __metadata("design:type", String)
], RegistRequest.prototype, "registrationMethod", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nama kontak darurat harus berupa teks.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegistRequest.prototype, "emergencyContactName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nomor kontak darurat harus berupa teks.' }),
    (0, class_validator_1.Matches)(/^\+?\d{8,15}$/, { message: 'Nomor kontak darurat tidak valid.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegistRequest.prototype, "emergencyContactNumber", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'Tanggal masuk harus berupa format tanggal yang valid.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tanggal Masuk tidak boleh kosong' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], RegistRequest.prototype, "movedInDate", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.residentType === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, class_validator_1.IsString)({ message: 'ID Unit harus berupa teks.' }),
    (0, class_validator_1.IsUUID)('4', {
        message: 'ID Unit Hunian harus berupa UUID versi 4 yang valid.',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID Unit hunian tidak boleh kosong' }),
    __metadata("design:type", String)
], RegistRequest.prototype, "unitId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.residentType === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, class_validator_1.IsOptional)({ message: 'Biaya cicilan unit hunain bersifat opsional' }),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], RegistRequest.prototype, "kprPaymentAmount", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.residentType === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], RegistRequest.prototype, "kprDueDate", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.residentType === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    __metadata("design:type", Boolean)
], RegistRequest.prototype, "isKprPaid", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.residentType === prisma_1.ResidentStatus.FAMILY_MEMBERS),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegistRequest.prototype, "familyCode", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.residentType === prisma_1.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RegistRequest.prototype, "documentTypes", void 0);
//# sourceMappingURL=regist-request.js.map