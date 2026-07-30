/* eslint-disable @typescript-eslint/no-unused-vars */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AnnouncementManageService", {
    enumerable: true,
    get: function() {
        return AnnouncementManageService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../../database/database.service");
const _clientts = require("../../../database/generated/prisma/client.ts");
const _generalHelper = require("../../../common/helper/generalHelper");
const _uploadsservice = require("../../../common/helper/uploads/uploads.service");
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
let AnnouncementManageService = class AnnouncementManageService extends _uploadsservice.UploadsService {
    async create(createRequest, files) {
        try {
            const attachmentPaths = this.processFiles(files);
            return await this.prisma.announcements.create({
                data: {
                    title: createRequest.title,
                    content: createRequest.content,
                    attachments: attachmentPaths,
                    employee: {
                        connect: {
                            id: createRequest.employeeId
                        }
                    },
                    expiryDate: createRequest.expiryDate,
                    publishDate: createRequest.publishDate
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Pengumuman');
        }
    }
    async findAll() {
        try {
            const announcements = await this.prisma.announcements.findMany({
                orderBy: {
                    title: 'asc'
                },
                include: {
                    employee: {
                        include: {
                            user: {
                                select: {
                                    fullName: true,
                                    firstName: true,
                                    lastName: true
                                }
                            }
                        }
                    }
                }
            });
            return announcements.map((announcement)=>({
                    ...announcement,
                    attachments: this.safeParseAttachments(announcement.attachments)
                }));
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Pengumuman');
        }
    }
    async findOne(id) {
        try {
            const announcement = await this.prisma.announcements.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    employee: {
                        include: {
                            user: {
                                select: {
                                    fullName: true,
                                    firstName: true,
                                    lastName: true
                                }
                            }
                        }
                    }
                }
            });
            return {
                ...announcement,
                attachments: this.safeParseAttachments(announcement.attachments)
            };
        } catch (error) {
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new _common.NotFoundException(`Pengumuman dengan id: ${id} tidak ditemukan`);
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Pengumuman');
        }
    }
    async update(id, updateRequest, files) {
        try {
            const existData = await this.prisma.announcements.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            let attachmentPaths = [];
            if (files && files.length > 0) {
                attachmentPaths = this.processFiles(files);
                const oldAttachments = this.safeParseAttachments(existData.attachments);
                for (const oldPath of oldAttachments){
                    _generalHelper.GeneralHelper.deleteFile(oldPath);
                }
            } else {
                attachmentPaths = this.safeParseAttachments(existData.attachments);
            }
            return await this.prisma.announcements.update({
                where: {
                    id: id
                },
                data: {
                    title: updateRequest.title ?? existData.title,
                    content: updateRequest.content ?? existData.content,
                    attachments: attachmentPaths,
                    employee: updateRequest.employeeId ? {
                        connect: {
                            id: updateRequest.employeeId
                        }
                    } : undefined,
                    expiryDate: updateRequest.expiryDate ?? existData.expiryDate,
                    publishDate: updateRequest.publishDate ?? existData.publishDate,
                    updatedAt: new Date()
                }
            });
        } catch (error) {
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new _common.NotFoundException(`Pengumuman dengan id: ${id} tidak ditemukan`);
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Update Pengumuman');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.announcements.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            const attachmentPaths = this.safeParseAttachments(existData.attachments);
            for (const filePath of attachmentPaths){
                _generalHelper.GeneralHelper.deleteFile(filePath);
            }
            return await this.prisma.announcements.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new _common.NotFoundException(`Pengumuman dengan id: ${id} tidak ditemukan`);
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Menghapus Data Pengumuman');
        }
    }
    async getAnnouncementFiles(id) {
        try {
            const announcement = await this.prisma.announcements.findUniqueOrThrow({
                where: {
                    id
                },
                select: {
                    attachments: true
                }
            });
            const attachmentPaths = this.safeParseAttachments(announcement.attachments);
            return attachmentPaths.map((path)=>({
                    path,
                    exists: _generalHelper.GeneralHelper.fileExists(path),
                    size: _generalHelper.GeneralHelper.getFileSize(path)
                }));
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Info File');
        }
    }
    constructor(prisma){
        super(), this.prisma = prisma;
    }
};
AnnouncementManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], AnnouncementManageService);

//# sourceMappingURL=announcement-manage.service.js.map