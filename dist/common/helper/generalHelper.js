"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GeneralHelper", {
    enumerable: true,
    get: function() {
        return GeneralHelper;
    }
});
const _common = require("@nestjs/common");
const _fs = /*#__PURE__*/ _interop_require_wildcard(require("fs"));
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
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
let GeneralHelper = class GeneralHelper {
    twoDecimal(input) {
        return parseFloat((input * 100).toFixed(2));
    }
    static getFolderExtension(mimetype) {
        const mime = mimetype.toLowerCase();
        if (mime in this.FileDictionary) {
            return this.FileDictionary[mime] || 'others';
        }
        return 'others';
    }
    static ensureDirectoryExists(dirPath) {
        if (!_fs.existsSync(dirPath)) {
            _fs.mkdirSync(dirPath, {
                recursive: true
            });
        }
    }
    getFolderPath() {
        return this.folderPath;
    }
    static getFullFilePath(relativePath) {
        return _path.join(process.cwd(), 'src/common/uploads', relativePath);
    }
    static fileExists(relativePath) {
        const fullPath = this.getFullFilePath(relativePath);
        return _fs.existsSync(fullPath);
    }
    static getFileSize(relativePath) {
        const fullPath = this.getFullFilePath(relativePath);
        if (_fs.existsSync(fullPath)) {
            const stats = _fs.statSync(fullPath);
            return stats.size;
        }
        return 0;
    }
    static deleteFile(relativePath) {
        try {
            const fullPath = this.getFullFilePath(relativePath);
            if (_fs.existsSync(fullPath)) {
                _fs.unlinkSync(fullPath);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting file:', error);
            return false;
        }
    }
    static async deleteFileAsync(relativePath) {
        try {
            const fullPath = this.getFullFilePath(relativePath);
            if (_fs.existsSync(fullPath)) {
                await _fs.promises.unlink(fullPath);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting file:', error);
            return false;
        }
    }
    constructor(){
        this.folderPath = 'src/common/uploads/';
    }
};
GeneralHelper.FileDictionary = {
    'image/jpg': 'images',
    'image/png': 'images',
    'image/jpeg': 'images',
    'application/pdf': 'documents/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'documents/docx',
    'application/msword': 'documents/doc',
    'text/plain': 'documents/txt',
    'text/csv': 'documents/csv',
    'application/vnd.ms-excel.sheet.macroenabled.12': 'documents/xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'documents/xlsx'
};
GeneralHelper = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], GeneralHelper);

//# sourceMappingURL=generalHelper.js.map