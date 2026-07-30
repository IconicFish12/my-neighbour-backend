"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateUnitManageDto", {
    enumerable: true,
    get: function() {
        return CreateUnitManageDto;
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
let CreateUnitManageDto = class CreateUnitManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nomor unit harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Nomor unit tidak boleh kosong.'
    }),
    (0, _isuniquevalidators.IsUnique)({
        field: 'unitNumber',
        model: 'units'
    }, {
        message: 'Nomor unit sudah digunakan.'
    }),
    _ts_metadata("design:type", String)
], CreateUnitManageDto.prototype, "unitNumber", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Nama bangunan harus berupa teks.'
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateUnitManageDto.prototype, "buildingName", void 0);
_ts_decorate([
    (0, _classvalidator.IsInt)({
        message: 'Nomor lantai harus berupa bilangan bulat.'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>Number),
    _ts_metadata("design:type", Number)
], CreateUnitManageDto.prototype, "floorNumber", void 0);
_ts_decorate([
    (0, _classvalidator.IsInt)({
        message: 'Jumlah ruangan harus berupa bilangan bulat.'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>Number),
    _ts_metadata("design:type", Number)
], CreateUnitManageDto.prototype, "numberOfRooms", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)({}, {
        message: 'Jumlah sewa harus berupa angka.'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>Number),
    _ts_metadata("design:type", Number)
], CreateUnitManageDto.prototype, "rentAmount", void 0);
_ts_decorate([
    (0, _classvalidator.IsInt)({
        message: 'Luas unit harus berupa bilangan bulat.'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>Number),
    _ts_metadata("design:type", Number)
], CreateUnitManageDto.prototype, "squareFootage", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Lokasi harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Lokasi Tidak boleh kosong'
    }),
    _ts_metadata("design:type", String)
], CreateUnitManageDto.prototype, "location", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_clientts.UnitStatus, {
        message: 'Status unit tidak valid. Pilihan: ' + Object.values(_clientts.UnitStatus).join(', ')
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _clientts.UnitStatus === "undefined" ? Object : _clientts.UnitStatus)
], CreateUnitManageDto.prototype, "status", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)({}, {
        message: 'Harga jual harus berupa angka.'
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classtransformer.Type)(()=>Number),
    _ts_metadata("design:type", Number)
], CreateUnitManageDto.prototype, "priceSale", void 0);

//# sourceMappingURL=create-unit-manage.dto.js.map