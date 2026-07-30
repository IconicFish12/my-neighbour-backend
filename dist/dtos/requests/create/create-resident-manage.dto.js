/* eslint-disable @typescript-eslint/no-unsafe-member-access */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateResidentManageDto", {
    enumerable: true,
    get: function() {
        return CreateResidentManageDto;
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
let CreateResidentManageDto = class CreateResidentManageDto {
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
], CreateResidentManageDto.prototype, "userId", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nama kontak darurat harus berupa teks.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateResidentManageDto.prototype, "emergencyContactName", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nomor kontak darurat harus berupa teks.'
    }),
    (0, _classvalidator.Matches)(/^\+?\d{8,15}$/, {
        message: 'Nomor kontak darurat tidak valid.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateResidentManageDto.prototype, "emergencyContactNumber", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal masuk harus berupa format tanggal yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Tanggal Masuk tidak boleh kosong'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateResidentManageDto.prototype, "movedInDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal keluar harus berupa format tanggal yang valid.'
    }),
    (0, _classvalidator.ValidateIf)((o)=>o.movedOutDate !== null),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateResidentManageDto.prototype, "movedOutDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Status penghuni tidak boleh kosong.'
    }),
    (0, _classvalidator.IsEnum)(_clientts.ResidentStatus, {
        message: 'Status penghuni tidak valid. Pilihan: ' + Object.values(_clientts.ResidentStatus).join(', ')
    }),
    _ts_metadata("design:type", typeof _clientts.ResidentStatus === "undefined" ? Object : _clientts.ResidentStatus)
], CreateResidentManageDto.prototype, "residentStatus", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateIf)((o)=>o.residentType === _clientts.ResidentStatus.HEAD_HOUSE_HOLD),
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID Unit Hunian harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsString)({
        message: 'Nama kontak darurat harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID Unit hunian tidak boleh kosong'
    }),
    _ts_metadata("design:type", String)
], CreateResidentManageDto.prototype, "unitId", void 0);

//# sourceMappingURL=create-resident-manage.dto.js.map