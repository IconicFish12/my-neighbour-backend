"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UploadFilesModule", {
    enumerable: true,
    get: function() {
        return UploadFilesModule;
    }
});
const _common = require("@nestjs/common");
const _uploadsservice = require("./uploads.service");
const _platformexpress = require("@nestjs/platform-express");
const _uploadsconfiguration = require("./uploads-configuration");
const _generalHelper = require("../generalHelper");
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
let UploadFilesModule = class UploadFilesModule {
};
UploadFilesModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _platformexpress.MulterModule.register(_uploadsconfiguration.UploadsConfiguration.createConfig())
        ],
        providers: [
            _uploadsservice.UploadsService,
            _generalHelper.GeneralHelper
        ],
        exports: [
            _uploadsservice.UploadsService,
            _generalHelper.GeneralHelper,
            _platformexpress.MulterModule
        ]
    })
], UploadFilesModule);

//# sourceMappingURL=uploads.module.js.map