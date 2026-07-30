/* eslint-disable @typescript-eslint/no-unsafe-return */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateAnnouncementManageDto", {
    enumerable: true,
    get: function() {
        return CreateAnnouncementManageDto;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
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
let CreateAnnouncementManageDto = class CreateAnnouncementManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Judul pengumuman harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Judul pengumuman tidak boleh kosong.'
    }),
    (0, _classvalidator.MinLength)(5, {
        message: 'Judul pengumuman harus memiliki setidaknya 5 karakter.'
    }),
    _ts_metadata("design:type", String)
], CreateAnnouncementManageDto.prototype, "title", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Isi pengumuman harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Isi pengumuman tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateAnnouncementManageDto.prototype, "content", void 0);
_ts_decorate([
    (0, _classvalidator.IsArray)({
        message: 'Lampiran harus berupa array.'
    }),
    (0, _classvalidator.IsString)({
        each: true,
        message: 'Setiap lampiran harus berupa teks (URL/path).'
    }),
    (0, _classvalidator.IsOptional)({
        message: 'Lampiran pengumuman bersifat opsional.'
    }),
    (0, _classtransformer.Transform)(({ value })=>{
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch  {
                return value.split(',').map((item)=>item.trim());
            }
        }
        return value;
    }),
    _ts_metadata("design:type", Array)
], CreateAnnouncementManageDto.prototype, "attachments", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal publikasi harus berupa format tanggal yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Tanggal publikasi tidak boleh kosong.'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateAnnouncementManageDto.prototype, "publishDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsDate)({
        message: 'Tanggal selesai harus berupa format tanggal yang valid.'
    }),
    (0, _classvalidator.IsOptional)({
        message: 'Tanggal selesai bersifat opsional.'
    }),
    (0, _classtransformer.Type)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateAnnouncementManageDto.prototype, "expiryDate", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID karyawan harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID karyawan tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateAnnouncementManageDto.prototype, "employeeId", void 0);

//# sourceMappingURL=create-announcement-manage.dto.js.map