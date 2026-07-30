/* eslint-disable @typescript-eslint/no-unused-vars */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForumPostManageService", {
    enumerable: true,
    get: function() {
        return ForumPostManageService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../../database/database.service");
const _clientts = require("../../../database/generated/prisma/client.ts");
const _uploadsservice = require("../../../common/helper/uploads/uploads.service");
const _generalHelper = require("../../../common/helper/generalHelper");
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
let ForumPostManageService = class ForumPostManageService extends _uploadsservice.UploadsService {
    async create(createRequest, files) {
        try {
            const filesPath = this.processFiles(files);
            const user = await this.prisma.users.findUnique({
                where: {
                    id: createRequest.userId
                }
            });
            return await this.prisma.forumPosts.create({
                data: {
                    title: createRequest.title,
                    content: createRequest.content,
                    authorRole: user?.role || createRequest.authorRole,
                    attachments: filesPath,
                    user: {
                        connect: {
                            id: createRequest.userId
                        }
                    },
                    tags: {
                        connectOrCreate: {
                            create: {
                                tagName: createRequest.tagName
                            },
                            where: {
                                id: createRequest.tagId || undefined,
                                tagName: createRequest.tagName
                            }
                        }
                    }
                },
                include: {
                    tags: true
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Postingan forum dengan id: ${createRequest.tagId} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Postingan forum dengan id: ${createRequest.tagId} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Postingan forum');
        }
    }
    async findAll() {
        try {
            const forumPostData = await this.prisma.forumPosts.findMany({
                include: {
                    _count: {
                        select: {
                            comments: true,
                            tags: true
                        }
                    },
                    user: {
                        select: {
                            fullName: true,
                            firstName: true,
                            lastName: true,
                            role: true,
                            username: true
                        }
                    }
                },
                orderBy: {
                    title: 'asc'
                }
            });
            return forumPostData.map((data)=>({
                    ...data,
                    attachments: this.safeParseAttachments(data.attachments)
                }));
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Postingan forum');
        }
    }
    async findOne(id) {
        try {
            const forumPostData = await this.prisma.forumPosts.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    comments: true,
                    tags: true,
                    user: {
                        select: {
                            fullName: true,
                            firstName: true,
                            lastName: true,
                            role: true,
                            username: true
                        }
                    }
                }
            });
            return {
                ...forumPostData,
                attachments: this.safeParseAttachments(forumPostData.attachments)
            };
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Postingan forum');
        }
    }
    async update(id, updateRequest, files) {
        try {
            const existData = await this.prisma.forumPosts.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            let filesPath = [];
            if (files && files.length > 0) {
                filesPath = this.processFiles(files);
                const oldAttachments = this.safeParseAttachments(existData.attachments);
                for (const oldPath of oldAttachments){
                    _generalHelper.GeneralHelper.deleteFile(oldPath);
                }
            } else {
                filesPath = this.safeParseAttachments(existData.attachments);
            }
            return await this.prisma.forumPosts.update({
                where: {
                    id: id
                },
                data: {
                    title: updateRequest.title ?? existData.title,
                    content: updateRequest.content ?? existData.content,
                    authorRole: updateRequest.authorRole ?? existData.authorRole,
                    attachments: filesPath ?? existData.attachments,
                    user: existData.userId ? {
                        connect: {
                            id: updateRequest.userId
                        }
                    } : undefined,
                    tags: {
                        connect: {
                            id: updateRequest.tagId
                        }
                    },
                    updatedAt: new Date()
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Postingan forum dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Postingan forum dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Postingan forum');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.forumPosts.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            const attachmentPaths = this.safeParseAttachments(existData.attachments);
            for (const filePath of attachmentPaths){
                _generalHelper.GeneralHelper.deleteFile(filePath);
            }
            return await this.prisma.forumPosts.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Postingan forum dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Postingan forum dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Postingan forum');
        }
    }
    constructor(prisma){
        super(), this.prisma = prisma;
    }
};
ForumPostManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], ForumPostManageService);

//# sourceMappingURL=forum-post-manage.service.js.map