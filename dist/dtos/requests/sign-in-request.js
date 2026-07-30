"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SignInRequest", {
    enumerable: true,
    get: function() {
        return SignInRequest;
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
let SignInRequest = class SignInRequest {
};
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Username harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Username tidak boleh kosong'
    }),
    (0, _classvalidator.MinLength)(5, {
        message: 'Username harus lebih dari 5 karakter'
    }),
    _ts_metadata("design:type", String)
], SignInRequest.prototype, "identifier", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)({
        message: 'Password harus berupa teks'
    }),
    (0, _classvalidator.IsNotEmpty)({
        message: 'Password tidak boleh kosong'
    }),
    (0, _classvalidator.MinLength)(4, {
        message: 'Password minimal 4 karakter'
    }),
    (0, _classvalidator.IsStrongPassword)({
        minLength: 4,
        minLowercase: 1,
        minNumbers: 3,
        minSymbols: 1,
        minUppercase: 1
    }, {
        message: 'Kata sandi harus minimal 4 karakter, 3 angka, dan 1 simbol.'
    }),
    (0, _classvalidator.MaxLength)(15, {
        message: 'Password maksimal 15 karakter'
    }),
    _ts_metadata("design:type", String)
], SignInRequest.prototype, "password", void 0);

//# sourceMappingURL=sign-in-request.js.map