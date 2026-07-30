"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ForumCommentManageService", {
    enumerable: true,
    get: function() {
        return ForumCommentManageService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../../database/database.service");
const _clientts = require("../../../database/generated/prisma/client.ts");
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
let ForumCommentManageService = class ForumCommentManageService {
    async create(createRequest) {
        try {
            return await this.prisma.forumComments.create({
                data: {
                    content: createRequest.content,
                    postId: createRequest.postId,
                    userId: createRequest.userId
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Comment post ');
        }
    }
    async findAll() {
        try {
            return await this.prisma.forumComments.findMany({
                include: {
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
                    createdAt: 'asc'
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Comment post ');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.forumComments.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    user: {
                        select: {
                            fullName: true,
                            firstName: true,
                            lastName: true,
                            role: true,
                            username: true
                        }
                    },
                    post: {
                        select: {
                            title: true,
                            content: true,
                            attachments: true,
                            tags: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Comment post ');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.forumComments.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Data Comment post  dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.forumComments.update({
                where: {
                    id: id
                },
                data: {
                    content: updateRequest.content,
                    postId: updateRequest.postId,
                    userId: updateRequest.userId,
                    updatedAt: new Date()
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Comment post  dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Comment post  dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Comment post ');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.forumComments.findUnique({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Data Comment post  dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.forumComments.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Comment post  dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Comment post  dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Comment post ');
        }
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
ForumCommentManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], ForumCommentManageService);

//# sourceMappingURL=forum-comment-manage.service.js.map