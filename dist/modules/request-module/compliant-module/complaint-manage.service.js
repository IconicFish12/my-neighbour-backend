"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ComplaintManageService", {
    enumerable: true,
    get: function() {
        return ComplaintManageService;
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
let ComplaintManageService = class ComplaintManageService {
    async create(createRequest) {
        try {
            return await this.prisma.complaints.create({
                data: {
                    title: createRequest.title,
                    description: createRequest.description,
                    category: createRequest.category,
                    employeeId: createRequest.employeeId ?? null,
                    residentId: createRequest.residentId,
                    images: createRequest.images ?? [],
                    resolutionDetails: createRequest.resolutionDetails ?? null,
                    resolvedAt: createRequest.resolvedAt ?? null,
                    unitId: createRequest.unitId ?? null
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Keluhan');
        }
    }
    async findAll() {
        try {
            return await this.prisma.complaints.findMany({
                orderBy: {
                    submittedAt: 'asc'
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Keluhan');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.complaints.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    employee: {
                        select: {
                            employeeNumberId: true,
                            employeePosition: true
                        },
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    fullName: true,
                                    firstName: true,
                                    lastName: true,
                                    username: true
                                }
                            }
                        }
                    },
                    resident: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    fullName: true,
                                    firstName: true,
                                    lastName: true,
                                    username: true
                                }
                            },
                            unit: {
                                select: {
                                    buildingName: true,
                                    location: true,
                                    unitNumber: true,
                                    status: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Keluhan');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.complaints.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Data Keluhan dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.complaints.update({
                where: {
                    id: id
                },
                data: {
                    title: updateRequest.title ?? existData.title,
                    description: updateRequest.description ?? existData.description,
                    category: updateRequest.category ?? existData.category,
                    employeeId: updateRequest.employeeId ?? existData.employeeId,
                    residentId: updateRequest.residentId ?? existData.residentId,
                    images: updateRequest.images ?? [],
                    resolutionDetails: updateRequest.resolutionDetails ?? existData.resolutionDetails,
                    resolvedAt: updateRequest.resolvedAt ?? existData.resolvedAt,
                    unitId: updateRequest.unitId ?? existData.unitId,
                    updatedAt: new Date()
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Keluhan dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Keluhan dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Keluhan');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.complaints.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Data Keluhan dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.complaints.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Keluhan dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Keluhan dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Keluhan');
        }
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
ComplaintManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], ComplaintManageService);

//# sourceMappingURL=complaint-manage.service.js.map