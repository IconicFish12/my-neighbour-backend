"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResidentManageService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../common/database/database.service");
const library_1 = require("../../../common/database/generated/prisma/runtime/library");
let ResidentManageService = class ResidentManageService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRequest) {
        try {
            const exist = await this.prisma.users.findUnique({
                where: { id: createRequest.userId },
            });
            if (!exist) {
                throw new common_1.NotFoundException(`Data Pengguna aplikasi dengan id: ${createRequest.userId} tidak ditemukan`);
            }
            return await this.prisma.residents.create({
                data: {
                    user: { connect: { id: createRequest.userId } },
                    emergencyContactName: createRequest.emergencyContactName,
                    emergencyContactNumber: createRequest.emergencyContactNumber,
                    movedInDate: createRequest.movedInDate,
                    movedOutDate: createRequest.movedOutDate,
                    residentStatus: createRequest.residentStatus,
                    ...(createRequest.unitId && {
                        unit: { connect: { id: createRequest.unitId } },
                    }),
                },
            });
        }
        catch (error) {
            console.error(error.message);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Penghuni');
        }
    }
    async findAll() {
        try {
            return await this.prisma.residents.findMany({
                include: {
                    _count: { select: { Complaints: true, Payments: true } },
                    user: {
                        select: {
                            fullName: true,
                            firstName: true,
                            lastName: true,
                            contactNumber: true,
                            dateOfBirth: true,
                            gender: true,
                            primaryEmail: true,
                        },
                    },
                },
                orderBy: { user: { fullName: 'asc' } },
            });
        }
        catch (error) {
            console.error(error.message);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Penghuni');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.residents.findUniqueOrThrow({
                where: { id: id },
                include: {
                    _count: { select: { Complaints: true, Payments: true } },
                    user: {
                        select: {
                            fullName: true,
                            firstName: true,
                            lastName: true,
                            contactNumber: true,
                            dateOfBirth: true,
                            gender: true,
                            primaryEmail: true,
                        },
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
                                    unit: {},
                                },
                            },
                        },
                        orderBy: {
                            paymentDate: 'asc',
                        },
                    },
                },
            });
        }
        catch (error) {
            console.error(error.message);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Penghuni');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.residents.findUnique({
                where: { id: id },
            });
            if (!existData) {
                throw new common_1.NotFoundException(`Penghuni dengan id: ${id} tidak ditemukan`);
            }
            const updatedData = await this.prisma.residents.update({
                where: { id: id },
                data: {
                    emergencyContactName: updateRequest.emergencyContactName ??
                        existData.emergencyContactName,
                    emergencyContactNumber: updateRequest.emergencyContactNumber ??
                        existData.emergencyContactNumber,
                    movedInDate: updateRequest.movedInDate ?? existData.movedInDate,
                    movedOutDate: updateRequest.movedOutDate ?? existData.movedOutDate,
                    residentStatus: updateRequest.residentStatus ?? existData.residentStatus,
                    unitId: updateRequest.unitId ?? existData.unitId,
                    updatedAt: new Date(),
                },
            });
            return updatedData;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Penghuni dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message, error.cause);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Penghuni');
        }
    }
    async remove(id) {
        try {
            await this.prisma.residents.findUnique({
                where: { id: id },
            });
            return await this.prisma.residents.delete({
                where: { id: id },
            });
        }
        catch (error) {
            if (error.name === 'NotFoundError') {
                throw new common_1.NotFoundException(`Penghuni dengan id: ${id} tidak ditemukan`);
            }
            console.error(error.message);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Menghapus Data Penghuni');
        }
    }
};
exports.ResidentManageService = ResidentManageService;
exports.ResidentManageService = ResidentManageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ResidentManageService);
//# sourceMappingURL=resident-manage.service.js.map