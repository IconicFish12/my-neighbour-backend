/* eslint-disable @typescript-eslint/no-unsafe-argument */ "use strict";
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
    get RegistRequest () {
        return RegistRequest;
    },
    get RegistrationMethod () {
        return RegistrationMethod;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _clientts = require("../../database/generated/prisma/client.ts");
const _isuniquevalidators = require("../../common/pipes/validators/is-unique-validators");
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
var RegistrationMethod = /*#__PURE__*/ function(RegistrationMethod) {
    RegistrationMethod["ADMIN_DRIVEN"] = "ADMIN_DRIVEN";
    RegistrationMethod["USER_DRIVEN"] = "USER_DRIVEN";
    return RegistrationMethod;
}({});
let RegistRequest = class RegistRequest {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nama lengkap harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Nama lengkap tidak boleh kosong'
    }),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "fullName", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nama depan harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Nama depan tidak boleh kosong'
    }),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "firstName", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nama belakang harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Nama belakang tidak boleh kosong'
    }),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "lastName", void 0);
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
], RegistRequest.prototype, "username", void 0);
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
], RegistRequest.prototype, "password", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal lahir harus berupa format tanggal'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RegistRequest.prototype, "dateOfBirth", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Jenis kelamin tidak boleh kosong'
    }),
    (0, _classvalidator.IsEnum)(_clientts.Gender, {
        message: 'Jenis kelamin tidak valid: ' + Object.values(_clientts.Gender).join(', ')
    }),
    _ts_metadata("design:type", typeof _clientts.Gender === "undefined" ? Object : _clientts.Gender)
], RegistRequest.prototype, "gender", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nomor kontak harus berupa teks'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "contactNumber", void 0);
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
], RegistRequest.prototype, "primaryEmail", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Status penghuni tidak boleh kosong.'
    }),
    (0, _classvalidator.IsEnum)(_clientts.ResidentStatus, {
        message: 'Status penghuni tidak valid. Pilihan: ' + Object.values(_clientts.ResidentStatus).join(', ').toLowerCase()
    }),
    _ts_metadata("design:type", typeof _clientts.ResidentStatus === "undefined" ? Object : _clientts.ResidentStatus)
], RegistRequest.prototype, "residentType", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'metode registrasi tidak boleh kosong'
    }),
    (0, _classvalidator.IsEnum)(RegistrationMethod, {
        message: 'metode registrasi tidak valid. Pilihan: ' + Object.values(RegistrationMethod).join(', ')
    }),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "registrationMethod", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nama kontak darurat harus berupa teks.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "emergencyContactName", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nomor kontak darurat harus berupa teks.'
    }),
    (0, _classvalidator.Matches)(/^\+?\d{8,15}$/, {
        message: 'Nomor kontak darurat tidak valid.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "emergencyContactNumber", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal masuk harus berupa format tanggal yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Tanggal Masuk tidak boleh kosong'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RegistRequest.prototype, "movedInDate", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateIf)((o)=>o.residentType === _clientts.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, _classvalidator.IsString)({
        message: 'ID Unit harus berupa teks.'
    }),
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID Unit Hunian harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID Unit hunian tidak boleh kosong'
    }),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "unitId", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateIf)((o)=>o.residentType === _clientts.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, _classvalidator.IsOptional)({
        message: 'Biaya cicilan unit hunain bersifat opsional'
    }),
    (0, _classtransformer.Transform)(({ value })=>parseFloat(value)),
    _ts_metadata("design:type", Number)
], RegistRequest.prototype, "kprPaymentAmount", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateIf)((o)=>o.residentType === _clientts.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsDateString)(),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "kprDueDate", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateIf)((o)=>o.residentType === _clientts.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _classtransformer.Transform)(({ value })=>value === 'true'),
    _ts_metadata("design:type", Boolean)
], RegistRequest.prototype, "isKprPaid", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateIf)((o)=>o.residentType === _clientts.ResidentStatus.FAMILY_MEMBERS),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], RegistRequest.prototype, "familyCode", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateIf)((o)=>o.residentType === _clientts.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    _ts_metadata("design:type", Array)
], RegistRequest.prototype, "documentTypes", void 0);

//# sourceMappingURL=regist-request.js.map