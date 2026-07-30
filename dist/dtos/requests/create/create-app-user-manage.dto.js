"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateAppUserManageDto", {
    enumerable: true,
    get: function() {
        return CreateAppUserManageDto;
    }
});
const _classvalidator = require("class-validator");
const _clientts = require("../../../database/generated/prisma/client.ts");
const _classtransformer = require("class-transformer");
const _isuniquevalidators = require("../../../common/pipes/validators/is-unique-validators");
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
let CreateAppUserManageDto = class CreateAppUserManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nama lengkap harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Nama lengkap tidak boleh kosong'
    }),
    _ts_metadata("design:type", String)
], CreateAppUserManageDto.prototype, "fullName", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nama depan harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Nama depan tidak boleh kosong'
    }),
    _ts_metadata("design:type", String)
], CreateAppUserManageDto.prototype, "firstName", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nama belakang harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Nama belakang tidak boleh kosong'
    }),
    _ts_metadata("design:type", String)
], CreateAppUserManageDto.prototype, "lastName", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Username harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Username tidak boleh kosong'
    }),
    (0, _isuniquevalidators.IsUnique)({
        field: 'username',
        model: 'users'
    }, {
        message: 'Username sudah terdaftar '
    }),
    (0, _classvalidator.MinLength)(5, {
        message: 'Username harus lebih dari 5 karakter'
    }),
    (0, _classvalidator.MaxLength)(15, {
        message: 'Username harus kurang dari 15 karakter'
    }),
    _ts_metadata("design:type", String)
], CreateAppUserManageDto.prototype, "username", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal lahir harus berupa format tanggal'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateAppUserManageDto.prototype, "dateOfBirth", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nomor kontak harus berupa teks'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateAppUserManageDto.prototype, "contactNumber", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Email utama harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Email utama tidak boleh kosong'
    }),
    (0, _isuniquevalidators.IsUnique)({
        field: 'primaryEmail',
        model: 'users'
    }, {
        message: 'Email utama sudah digunakan'
    }),
    (0, _classvalidator.IsEmail)({
        ignore_max_length: true,
        allow_display_name: true
    }, {
        message: 'Kolom Email harus berupa Email yang valid'
    }),
    _ts_metadata("design:type", String)
], CreateAppUserManageDto.prototype, "primaryEmail", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Email sekunder harus berupa teks'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _isuniquevalidators.IsUnique)({
        field: 'secondaryEmail',
        model: 'users'
    }, {
        message: 'Email sekunder sudah digunakan'
    }),
    (0, _classvalidator.IsEmail)({
        ignore_max_length: true,
        allow_display_name: true
    }, {
        message: 'Kolom Email harus berupa Email yang valid'
    }),
    _ts_metadata("design:type", String)
], CreateAppUserManageDto.prototype, "secondaryEmail", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Password harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Password tidak boleh kosong'
    }),
    (0, _classvalidator.MinLength)(4, {
        message: 'Password minimal 4 karakter'
    }),
    (0, _classvalidator.IsStrongPassword)({
        minLength: 4,
        minLowercase: 1,
        minNumbers: 3,
        minSymbols: 1,
        minUppercase: 1
    }, {
        message: 'Kata sandi harus minimal 4 karakter, 3 angka, dan 1 simbol.'
    }),
    (0, _classvalidator.MaxLength)(15, {
        message: 'Password maksimal 15 karakter'
    }),
    _ts_metadata("design:type", String)
], CreateAppUserManageDto.prototype, "password", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Peran tidak boleh kosong'
    }),
    (0, _classvalidator.IsEnum)(_clientts.UserRole, {
        message: 'Peran tidak valid: ' + Object.values(_clientts.UserRole).join(', ')
    }),
    _ts_metadata("design:type", typeof _clientts.UserRole === "undefined" ? Object : _clientts.UserRole)
], CreateAppUserManageDto.prototype, "role", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Jenis kelamin tidak boleh kosong'
    }),
    (0, _classvalidator.IsEnum)(_clientts.Gender, {
        message: 'Jenis kelamin tidak valid, Pilihan: ' + Object.values(_clientts.Gender).join(', ')
    }),
    _ts_metadata("design:type", typeof _clientts.Gender === "undefined" ? Object : _clientts.Gender)
], CreateAppUserManageDto.prototype, "gender", void 0);

//# sourceMappingURL=create-app-user-manage.dto.js.map