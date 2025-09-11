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
exports.CreateUnitManageDto = void 0;
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../common/database/generated/prisma");
const is_unique_validators_1 = require("../../../common/pipes/validators/is-unique-validators");
const class_transformer_1 = require("class-transformer");
class CreateUnitManageDto {
    unitNumber;
    buildingName;
    floorNumber;
    numberOfRooms;
    rentAmount;
    squareFootage;
    location;
    status;
    priceSale;
}
exports.CreateUnitManageDto = CreateUnitManageDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nomor unit harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nomor unit tidak boleh kosong.' }),
    (0, is_unique_validators_1.IsUnique)({ field: 'unitNumber', model: 'units' }, { message: 'Nomor unit sudah digunakan.' }),
    __metadata("design:type", String)
], CreateUnitManageDto.prototype, "unitNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nama bangunan harus berupa teks.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUnitManageDto.prototype, "buildingName", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Nomor lantai harus berupa bilangan bulat.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateUnitManageDto.prototype, "floorNumber", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Jumlah ruangan harus berupa bilangan bulat.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateUnitManageDto.prototype, "numberOfRooms", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Jumlah sewa harus berupa angka.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateUnitManageDto.prototype, "rentAmount", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Luas unit harus berupa bilangan bulat.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateUnitManageDto.prototype, "squareFootage", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Lokasi harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Lokasi Tidak boleh kosong' }),
    __metadata("design:type", String)
], CreateUnitManageDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(prisma_1.UnitStatus, {
        message: 'Status unit tidak valid. Pilihan: ' +
            Object.values(prisma_1.UnitStatus).join(', '),
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUnitManageDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Harga jual harus berupa angka.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateUnitManageDto.prototype, "priceSale", void 0);
//# sourceMappingURL=create-unit-manage.dto.js.map