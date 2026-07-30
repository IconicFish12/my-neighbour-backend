"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateForumCommentManageDto", {
    enumerable: true,
    get: function() {
        return CreateForumCommentManageDto;
    }
});
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
let CreateForumCommentManageDto = class CreateForumCommentManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Isi pengumuman harus berupa teks.'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Isi pengumuman tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateForumCommentManageDto.prototype, "content", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID pengguna aplikasi harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsString)({
        message: 'ID pengguna aplikasi harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID pengguna aplikasi tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateForumCommentManageDto.prototype, "userId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)('4', {
        message: 'ID Postingan Forum harus berupa UUID versi 4 yang valid.'
    }),
    (0, _classvalidator.IsString)({
        message: 'ID Postingan Forum harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'ID Postingan Forum tidak boleh kosong.'
    }),
    _ts_metadata("design:type", String)
], CreateForumCommentManageDto.prototype, "postId", void 0);

//# sourceMappingURL=create-forum-comment-manage.dto.js.map