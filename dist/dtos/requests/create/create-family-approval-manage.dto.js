"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateFamilyApprovalManageDto", {
    enumerable: true,
    get: function() {
        return CreateFamilyApprovalManageDto;
    }
});
const _classvalidator = require("class-validator");
const _clientts = require("../../../database/generated/prisma/client.ts");
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
let CreateFamilyApprovalManageDto = class CreateFamilyApprovalManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID anggota keluarga harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID anggota keluarga tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateFamilyApprovalManageDto.prototype, "familyMemberId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID kepala keluarga harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID kepala keluarga tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateFamilyApprovalManageDto.prototype, "headOfHouseholdId", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Catatan harus berupa teks.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateFamilyApprovalManageDto.prototype, "notes", void 0);
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)({
        message: 'Peran tidak boleh kosong'
    }),
    (0, _classvalidator.IsEnum)(_clientts.ApprovalStatus, {
        message: 'Peran tidak valid. Pilihan: ' + Object.values(_clientts.ApprovalStatus).join(', ')
    }),
    _ts_metadata("design:type", typeof _clientts.ApprovalStatus === "undefined" ? Object : _clientts.ApprovalStatus)
], CreateFamilyApprovalManageDto.prototype, "status", void 0);

//# sourceMappingURL=create-family-approval-manage.dto.js.map