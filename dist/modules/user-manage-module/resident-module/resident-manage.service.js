"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ResidentManageService", {
    enumerable: true,
    get: function() {
        return ResidentManageService;
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
let ResidentManageService = class ResidentManageService {
    async create(createRequest) {
        try {
            const exist = await this.prisma.users.findUnique({
                where: {
                    id: createRequest.userId
                }
            });
            if (!exist) {
                throw new _common.NotFoundException(`Data Pengguna aplikasi dengan id: ${createRequest.userId} tidak ditemukan`);
            }
            return await this.prisma.residents.create({
                data: {
                    user: {
                        connect: {
                            id: createRequest.userId
                        }
                    },
                    emergencyContactName: createRequest.emergencyContactName,
                    emergencyContactNumber: createRequest.emergencyContactNumber,
                    movedInDate: createRequest.movedInDate,
                    movedOutDate: createRequest.movedOutDate,
                    residentStatus: createRequest.residentStatus,
                    ...createRequest.unitId && {
                        unit: {
                            connect: {
                                id: createRequest.unitId
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Penghuni');
        }
    }
    async findAll() {
        try {
            return await this.prisma.residents.findMany({
                include: {
                    _count: {
                        select: {
                            Complaints: true,
                            Payments: true
                        }
                    },
                    user: {
                        select: {
                            fullName: true,
                            firstName: true,
                            lastName: true,
                            contactNumber: true,
                            dateOfBirth: true,
                            gender: true,
                            primaryEmail: true
                        }
                    }
                },
                orderBy: {
                    user: {
                        fullName: 'asc'
                    }
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Penghuni');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.residents.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    _count: {
                        select: {
                            Complaints: true,
                            Payments: true
                        }
                    },
                    user: {
                        select: {
                            fullName: true,
                            firstName: true,
                            lastName: true,
                            contactNumber: true,
                            dateOfBirth: true,
                            gender: true,
                            primaryEmail: true
                        }
                    },
                    Payments: {
                        select: {
                            amount: true,
                            paymentDate: true,
                            bill: {
                                select: {
                                    type: true,
                                    amount: true,
                                    dueDate: true,
                                    unit: {}
                                }
                            }
                        },
                        orderBy: {
                            paymentDate: 'asc'
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Penghuni');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.residents.findUnique({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Penghuni dengan id: ${id} tidak ditemukan`);
            }
            const updatedData = await this.prisma.residents.update({
                where: {
                    id: id
                },
                data: {
                    emergencyContactName: updateRequest.emergencyContactName ?? existData.emergencyContactName,
                    emergencyContactNumber: updateRequest.emergencyContactNumber ?? existData.emergencyContactNumber,
                    movedInDate: updateRequest.movedInDate ?? existData.movedInDate,
                    movedOutDate: updateRequest.movedOutDate ?? existData.movedOutDate,
                    residentStatus: updateRequest.residentStatus ?? existData.residentStatus,
                    unitId: updateRequest.unitId ?? existData.unitId,
                    updatedAt: new Date()
                }
            });
            return updatedData;
        } catch (error) {
            if (error instanceof _common.NotFoundException) {
                throw error;
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Penghuni dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message, error.cause);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Penghuni');
        }
    }
    async remove(id) {
        try {
            await this.prisma.residents.findUnique({
                where: {
                    id: id
                }
            });
            return await this.prisma.residents.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Penghuni dengan id: ${id} tidak ditemukan`);
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Menghapus Data Penghuni');
        }
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
ResidentManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], ResidentManageService);

//# sourceMappingURL=resident-manage.service.js.map