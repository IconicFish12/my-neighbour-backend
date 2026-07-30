"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateForumTagManageDto", {
    enumerable: true,
    get: function() {
        return CreateForumTagManageDto;
    }
});
const _classvalidator = require("class-validator");
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
let CreateForumTagManageDto = class CreateForumTagManageDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Label Forum Harus berupa teks'
    }),
    (0, _isuniquevalidators.IsUnique)({
        field: 'tagName',
        model: 'postTags'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Label Forum Bersifat Optional'
    }),
    _ts_metadata("design:type", String)
], CreateForumTagManageDto.prototype, "tagName", void 0);

//# sourceMappingURL=create-forum-tag-manage.dto.js.map