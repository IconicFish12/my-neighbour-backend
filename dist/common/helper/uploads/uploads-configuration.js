/* eslint-disable @typescript-eslint/no-unsafe-call */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UploadsConfiguration", {
    enumerable: true,
    get: function() {
        return UploadsConfiguration;
    }
});
const _common = require("@nestjs/common");
const _multer = require("multer");
const _path = require("path");
const _generalHelper = require("../generalHelper");
let UploadsConfiguration = class UploadsConfiguration {
    static createConfig(config = {}) {
        const { maxFileSize = 10 * 1024 * 1024, maxFiles = 5, allowedMimetypes = [
            'image/jpg',
            'image/png',
            'image/jpeg',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
            'text/plain',
            'text/csv',
            'application/vnd.ms-excel.sheet.macroenabled.12',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ], subFolder = '' } = config;
        return {
            limits: {
                fileSize: maxFileSize,
                files: maxFiles
            },
            fileFilter: (req, file, cb)=>{
                if (allowedMimetypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new _common.BadRequestException(`File type ${file.mimetype} tidak diizinkan`), false);
                }
            },
            storage: (0, _multer.diskStorage)({
                destination: (req, file, cb)=>{
                    const folderPath = _generalHelper.GeneralHelper.getFolderExtension(file.mimetype);
                    const fullPath = subFolder ? `src/common/uploads/${subFolder}/${folderPath}` : `src/common/uploads/${folderPath}`;
                    _generalHelper.GeneralHelper.ensureDirectoryExists(fullPath);
                    cb(null, fullPath);
                },
                filename: (req, file, cb)=>{
                    const originalName = file.originalname;
                    const fileExtension = (0, _path.extname)(originalName);
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const sanitizedName = originalName.replace(fileExtension, '').replace(/[^a-zA-Z0-9]/g, '_');
                    const newFileName = `${sanitizedName}-${uniqueSuffix}${fileExtension}`;
                    cb(null, newFileName);
                }
            })
        };
    }
    static get defaultConfig() {
        return this.createConfig({
            maxFileSize: 10 * 1024 * 1024,
            maxFiles: 5,
            subFolder: 'announcements'
        });
    }
    static get forumPostConfig() {
        return this.createConfig({
            maxFileSize: 15 * 1024 * 1024,
            maxFiles: 12,
            subFolder: 'forum-post'
        });
    }
    static get dataConfig() {
        return this.createConfig({
            maxFileSize: 5 * 1024 * 1024,
            maxFiles: 3,
            allowedMimetypes: [
                'image/jpg',
                'image/png',
                'image/jpeg'
            ],
            subFolder: 'employees'
        });
    }
    static get documentConfig() {
        return this.createConfig({
            maxFileSize: 50 * 1024 * 1024,
            maxFiles: 10,
            allowedMimetypes: [
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/plain'
            ],
            subFolder: 'documents'
        });
    }
    static get imageConfig() {
        return this.createConfig({
            maxFileSize: 5 * 1024 * 1024,
            maxFiles: 10,
            allowedMimetypes: [
                'image/jpg',
                'image/png',
                'image/jpeg'
            ],
            subFolder: 'images'
        });
    }
};

//# sourceMappingURL=uploads-configuration.js.map