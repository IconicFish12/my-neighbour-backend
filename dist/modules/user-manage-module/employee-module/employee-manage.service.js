"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmployeeManageService", {
    enumerable: true,
    get: function() {
        return EmployeeManageService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../../database/database.service");
const _generalHelper = require("../../../common/helper/generalHelper");
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
let EmployeeManageService = class EmployeeManageService {
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
            return await this.prisma.employees.create({
                data: {
                    user: {
                        connect: {
                            id: createRequest.userId
                        }
                    },
                    employeeNumberId: createRequest.employeeNumberId,
                    hireDate: createRequest.hireDate,
                    salary: this.helper.twoDecimal(createRequest.salary),
                    workingHours: createRequest.workingHours,
                    employeePosition: createRequest.employeePosition,
                    bonus: this.helper.twoDecimal(createRequest.bonus) ?? null
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Pegawai');
        }
    }
    async findAll() {
        try {
            return await this.prisma.employees.findMany({
                include: {
                    _count: {
                        select: {
                            Announcements: true,
                            Bills: true,
                            Payments: true,
                            Complaints: true,
                            SecurityReports: true
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
                    employeeNumberId: 'asc'
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Pegawai');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.employees.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    _count: {
                        select: {
                            Announcements: true,
                            Bills: true,
                            Payments: true,
                            Complaints: true,
                            SecurityReports: true
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
                    Complaints: {
                        select: {
                            title: true,
                            description: true,
                            status: true,
                            submittedAt: true,
                            resolvedAt: true,
                            resolutionDetails: true
                        }
                    },
                    Announcements: {
                        select: {
                            title: true,
                            content: true,
                            attachments: true,
                            publishDate: true,
                            expiryDate: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Pegawai');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.employees.findUnique({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Pegawai dengan id: ${id} tidak ditemukan`);
            }
            const updatedData = this.prisma.employees.update({
                where: {
                    id: id
                },
                data: {
                    employeeNumberId: updateRequest.employeeNumberId ?? existData?.employeeNumberId,
                    hireDate: updateRequest.hireDate,
                    salary: this.helper.twoDecimal(updateRequest.salary) ?? existData?.salary,
                    workingHours: updateRequest.workingHours ?? existData?.workingHours,
                    employeePosition: updateRequest.employeePosition ?? existData?.employeePosition,
                    bonus: this.helper.twoDecimal(updateRequest.bonus) ?? existData?.bonus,
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
                    throw new _common.NotFoundException(`Pegawai dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message, error.cause);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Pegawai');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.employees.findUnique({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Pegawai dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.employees.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error instanceof _common.NotFoundException) {
                throw error;
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Pegawai dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message, error.cause);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Pegawai');
        }
    }
    constructor(prisma, helper){
        this.prisma = prisma;
        this.helper = helper;
    }
};
EmployeeManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService,
        typeof _generalHelper.GeneralHelper === "undefined" ? Object : _generalHelper.GeneralHelper
    ])
], EmployeeManageService);

//# sourceMappingURL=employee-manage.service.js.map