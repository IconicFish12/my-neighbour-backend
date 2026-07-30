"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateFamilyCodeManageDto", {
    enumerable: true,
    get: function() {
        return UpdateFamilyCodeManageDto;
    }
});
const _classvalidator = require("class-validator");
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
let UpdateFamilyCodeManageDto = class UpdateFamilyCodeManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Kode keluarga harus berupa teks.'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _isuniquevalidators.IsUnique)({
        field: 'code',
        model: 'familyCodes'
    }, {
        message: 'Kode keluarga sudah terdaftar.'
    }),
    _ts_metadata("design:type", String)
], UpdateFamilyCodeManageDto.prototype, "code", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID kepala keluarga harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateFamilyCodeManageDto.prototype, "headOfHousehold", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID unit hunian harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateFamilyCodeManageDto.prototype, "unitId", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)({
        message: 'Status aktif harus berupa boolean.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], UpdateFamilyCodeManageDto.prototype, "isActive", void 0);
_ts_decorate([
    (0, _classvalidator.IsInt)({
        message: 'Jumlah anggota maksimal harus berupa angka bulat.'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.Min)(1, {
        message: 'Jumlah anggota minimal 1 orang.'
    }),
    (0, _classvalidator.Max)(20, {
        message: 'Jumlah anggota maksimal 20 orang.'
    }),
    (0, _classtransformer.Type)(()=>Number),
    _ts_metadata("design:type", Number)
], UpdateFamilyCodeManageDto.prototype, "maxMembers", void 0);

//# sourceMappingURL=update-family-code-manage.dto.js.map