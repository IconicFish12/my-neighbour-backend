"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FamilyCodeManageService", {
    enumerable: true,
    get: function() {
        return FamilyCodeManageService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../../../database/database.service");
const _clientts = require("../../../../database/generated/prisma/client.ts");
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
let FamilyCodeManageService = class FamilyCodeManageService {
    async create(createRequest) {
        try {
            return await this.prisma.familyCodes.create({
                data: {
                    code: createRequest.code,
                    headResident: {
                        connect: {
                            id: createRequest.headOfHousehold ?? undefined
                        }
                    },
                    unit: {
                        connect: {
                            id: createRequest.unitId ?? undefined
                        }
                    },
                    isActive: createRequest.isActive ?? true,
                    maxMembers: createRequest.maxMembers ?? 10
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat membuat kode keluarga.');
        }
    }
    async findAll() {
        try {
            return await this.prisma.familyCodes.findMany({
                orderBy: {
                    createdAt: 'asc',
                    code: 'asc'
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat mendapatkan data kode keluarga.');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.familyCodes.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    headResident: {
                        include: {
                            user: {
                                select: {
                                    fullName: true,
                                    firstName: true,
                                    lastName: true,
                                    contactNumber: true,
                                    dateOfBirth: true,
                                    gender: true,
                                    username: true,
                                    primaryEmail: true
                                }
                            }
                        }
                    },
                    unit: true
                }
            });
        } catch (error) {
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new _common.NotFoundException(`Kode keluarga dengan id: ${id} tidak ditemukan.`);
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat mendapatkan kode keluarga.');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.familyCodes.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Code Keluarga dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.familyCodes.update({
                where: {
                    id: id
                },
                data: {
                    code: updateRequest.code ?? existData.code,
                    headResident: {
                        connect: updateRequest.headOfHousehold ? {
                            id: updateRequest.headOfHousehold
                        } : undefined
                    },
                    unit: updateRequest.unitId ? {
                        connect: {
                            id: updateRequest.unitId
                        }
                    } : undefined,
                    isActive: updateRequest.isActive,
                    maxMembers: updateRequest.maxMembers
                }
            });
        } catch (error) {
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new _common.NotFoundException(`Kode keluarga dengan id: ${id} tidak ditemukan.`);
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat memperbarui kode keluarga.');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.familyCodes.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Code Keluarga dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.familyCodes.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new _common.NotFoundException(`Kode keluarga dengan id: ${id} tidak ditemukan.`);
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat menghapus kode keluarga.');
        }
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
FamilyCodeManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], FamilyCodeManageService);

//# sourceMappingURL=family-code-manage.service.js.map