"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SecurityManageService", {
    enumerable: true,
    get: function() {
        return SecurityManageService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../database/database.service");
const _clientts = require("../../database/generated/prisma/client.ts");
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
let SecurityManageService = class SecurityManageService {
    async create(createRequest) {
        try {
            return await this.prisma.securityReports.create({
                data: {
                    title: createRequest.title,
                    description: createRequest.description,
                    incidentDate: createRequest.incidentDate,
                    location: createRequest.location,
                    status: createRequest.status,
                    employee: {
                        connect: {
                            id: createRequest.employeeId
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Laporan Keamanan');
        }
    }
    async findAll() {
        try {
            return await this.prisma.securityReports.findMany({
                include: {
                    employee: {
                        include: {
                            user: {
                                select: {
                                    fullName: true,
                                    firstName: true,
                                    lastName: true,
                                    contactNumber: true,
                                    username: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    title: 'asc'
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Laporan Keamanan');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.securityReports.findUniqueOrThrow({
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
                                    lastName: true,
                                    contactNumber: true,
                                    username: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Laporan Keamanan');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.securityReports.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Data Laporan Keamanan dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.securityReports.update({
                where: {
                    id: id
                },
                data: {
                    title: updateRequest.title,
                    description: updateRequest.description,
                    incidentDate: updateRequest.incidentDate,
                    location: updateRequest.location,
                    status: updateRequest.status,
                    employee: {
                        connect: {
                            id: updateRequest.employeeId
                        }
                    }
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Laporan Keamanan dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Laporan Keamanan dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Laporan Keamanan');
        }
    }
    async remove(id) {
        try {
            return await this.prisma.securityReports.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Laporan Keamanan dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Laporan Keamanan dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Laporan Keamanan');
        }
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
SecurityManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], SecurityManageService);

//# sourceMappingURL=security-manage.service.js.map