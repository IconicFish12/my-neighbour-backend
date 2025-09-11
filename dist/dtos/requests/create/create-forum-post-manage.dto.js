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
exports.CreateForumPostManageDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const prisma_1 = require("../../../common/database/generated/prisma");
const is_unique_validators_1 = require("../../../common/pipes/validators/is-unique-validators");
class CreateForumPostManageDto {
    title;
    content;
    attachments;
    authorRole;
    publishDate;
    userId;
    tagName;
    tagId;
}
exports.CreateForumPostManageDto = CreateForumPostManageDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Judul pengumuman harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Judul pengumuman tidak boleh kosong.' }),
    (0, class_validator_1.MinLength)(5, {
        message: 'Judul pengumuman harus memiliki setidaknya 5 karakter.',
    }),
    __metadata("design:type", String)
], CreateForumPostManageDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Isi pengumuman harus berupa teks.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Isi pengumuman tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateForumPostManageDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Lampiran harus berupa array.' }),
    (0, class_validator_1.IsString)({
        each: true,
        message: 'Setiap lampiran harus berupa teks (URL/path).',
    }),
    (0, class_validator_1.IsOptional)({ message: 'Lampiran pengumuman bersifat opsional.' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            }
            catch {
                return value.split(',').map((item) => item.trim());
            }
        }
        return value;
    }),
    __metadata("design:type", Array)
], CreateForumPostManageDto.prototype, "attachments", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(prisma_1.UserRole, {
        message: 'Peran Penulis tidak valid. Pilihan: ' +
            Object.values(prisma_1.UserRole).join(','),
    }),
    (0, class_validator_1.IsOptional)({ message: 'Peran Penulis bersifat Optional' }),
    __metadata("design:type", String)
], CreateForumPostManageDto.prototype, "authorRole", void 0);
__decorate([
    (0, class_validator_1.IsDate)({
        message: 'Tanggal publikasi harus berupa format tanggal yang valid.',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tanggal publikasi tidak boleh kosong.' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateForumPostManageDto.prototype, "publishDate", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', {
        message: 'ID Pengguna aplikasi harus berupa UUID versi 4 yang valid.',
    }),
    (0, class_validator_1.IsString)({ message: 'ID Pengguna aplikasi harus berupa teks' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID Pengguna aplikasi tidak boleh kosong.' }),
    __metadata("design:type", String)
], CreateForumPostManageDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Label Forum Harus berupa teks' }),
    (0, is_unique_validators_1.IsUnique)({ field: 'tagName', model: 'postTags' }),
    (0, class_validator_1.IsOptional)({ message: 'Label Forum Bersifat Optional' }),
    __metadata("design:type", String)
], CreateForumPostManageDto.prototype, "tagName", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'ID Label harus berupa UUID versi 4 yang valid.' }),
    (0, class_validator_1.IsString)({ message: 'ID Label harus berupa teks' }),
    (0, class_validator_1.IsOptional)({ message: 'ID Label Bersifat Optional.' }),
    __metadata("design:type", String)
], CreateForumPostManageDto.prototype, "tagId", void 0);
//# sourceMappingURL=create-forum-post-manage.dto.js.map