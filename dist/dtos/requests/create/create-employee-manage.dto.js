"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateEmployeeManageDto", {
    enumerable: true,
    get: function() {
        return CreateEmployeeManageDto;
    }
});
const _classvalidator = require("class-validator");
const _clientts = require("../../../database/generated/prisma/client.ts");
const _isuniquevalidators = require("../../../common/pipes/validators/is-unique-validators");
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
let CreateEmployeeManageDto = class CreateEmployeeManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID pengguna aplikasi harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID pengguna aplikasi tidak boleh kosong.'
    }),
    (0, _isuniquevalidators.IsUnique)({
        field: 'userId',
        model: 'employees'
    }, {
        message: 'pengguna sudah terdaftar sudah terdaftar'
    }),
    _ts_metadata("design:type", String)
], CreateEmployeeManageDto.prototype, "userId", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nomor identitas Pegawai harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Nomor identitas Pegawai tidak boleh kosong.'
    }),
    (0, _isuniquevalidators.IsUnique)({
        field: 'employeeNumberId',
        model: 'employees'
    }, {
        message: 'ID dari pegawai sudah terdaftar'
    }),
    _ts_metadata("design:type", String)
], CreateEmployeeManageDto.prototype, "employeeNumberId", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Tanggal mulai kerja tidak boleh kosong.'
    }),
    (0, _classvalidator.IsDate)({
        message: 'Tanggal mulai kerja harus berupa format tanggal yang valid.'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateEmployeeManageDto.prototype, "hireDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Posisi Pegawai tidak boleh kosong.'
    }),
    (0, _classvalidator.IsEnum)(_clientts.EmployeeRole, {
        message: 'Posisi Pegawai tidak valid. Pilihan' + Object.values(_clientts.EmployeeRole).join(', ')
    }),
    _ts_metadata("design:type", typeof _clientts.EmployeeRole === "undefined" ? Object : _clientts.EmployeeRole)
], CreateEmployeeManageDto.prototype, "employeePosition", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Jam kerja tidak boleh kosong.'
    }),
    (0, _classvalidator.IsInt)({
        message: 'Jam kerja harus berupa angka bulat.'
    }),
    (0, _classvalidator.Min)(0, {
        message: 'Jam kerja tidak boleh kurang dari 0.'
    }),
    (0, _classvalidator.Max)(24, {
        message: 'Jam kerja tidak boleh lebih dari 24.'
    }),
    _ts_metadata("design:type", Number)
], CreateEmployeeManageDto.prototype, "workingHours", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Gaji tidak boleh kosong.'
    }),
    (0, _classvalidator.IsNumber)({}, {
        message: 'Gaji harus berupa angka.'
    }),
    (0, _classvalidator.IsPositive)({
        message: 'Gaji harus bernilai positif.'
    }),
    _ts_metadata("design:type", Number)
], CreateEmployeeManageDto.prototype, "salary", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Bonus tidak boleh kosong.'
    }),
    (0, _classvalidator.IsNumber)({}, {
        message: 'Bonus harus berupa angka.'
    }),
    (0, _classvalidator.IsPositive)({
        message: 'Bonus harus bernilai positif.'
    }),
    _ts_metadata("design:type", Number)
], CreateEmployeeManageDto.prototype, "bonus", void 0);

//# sourceMappingURL=create-employee-manage.dto.js.map