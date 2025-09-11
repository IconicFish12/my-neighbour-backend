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
exports.UnitManageService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database/database.service");
const generalHelper_1 = require("../../common/helper/generalHelper");
const library_1 = require("../../common/database/generated/prisma/runtime/library");
const prisma_1 = require("../../common/database/generated/prisma/index.js");
let UnitManageService = class UnitManageService {
    prisma;
    helper;
    constructor(prisma, helper) {
        this.prisma = prisma;
        this.helper = helper;
    }
    async create(createRequest) {
        try {
            return await this.prisma.units.create({
                data: {
                    unitNumber: createRequest.unitNumber,
                    buildingName: createRequest.buildingName ?? null,
                    location: createRequest.location,
                    priceSale: this.helper.twoDecimal(createRequest.priceSale),
                    floorNumber: createRequest.floorNumber ?? null,
                    status: prisma_1.UnitStatus.AVAILABLE,
                    numberOfRooms: createRequest.numberOfRooms ?? null,
                    squareFootage: createRequest.squareFootage ?? null,
                },
            });
        }
        catch (error) {
            console.error(error.message);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Unit Hunian');
        }
    }
    async findAll() {
        try {
            return await this.prisma.units.findMany({
                include: {
                    _count: {
                        select: {
                            Complaints: true,
                            Residents: true,
                            Bills: true,
                            Payments: true,
                        },
                    },
                },
                orderBy: {
                    unitNumber: 'asc',
                },
            });
        }
        catch (error) {
            console.error(error.message);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.units.findUniqueOrThrow({
                where: { id: id },
                include: {
                    Bills: {
                        select: {
                            amount: true,
                        },
                    },
                    Complaints: {
                        select: {
                            title: true,
                            category: true,
                            description: true,
                            resolutionDetails: true,
                            submittedAt: true,
                            resolvedAt: true,
                            status: true,
                            images: true,
                        },
                        orderBy: { title: 'asc' },
                    },
                    Residents: {
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
                                    primaryEmail: true,
                                },
                            },
                        },
                    },
                },
            });
        }
        catch (error) {
            console.error(error.message);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.units.findUniqueOrThrow({
                where: { id: id },
            });
            if (!existData) {
                throw new common_1.NotFoundException(`Unit Hunian dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.units.update({
                where: { id: id },
                data: {
                    unitNumber: updateRequest.unitNumber ?? existData.unitNumber,
                    buildingName: updateRequest.buildingName ?? existData.buildingName,
                    location: updateRequest.location ?? existData.location,
                    priceSale: this.helper.twoDecimal(updateRequest.priceSale) ??
                        existData.priceSale,
                    status: updateRequest.status ?? existData.status,
                    floorNumber: updateRequest.floorNumber ?? existData.floorNumber,
                    numberOfRooms: updateRequest.numberOfRooms ?? existData.numberOfRooms,
                    squareFootage: updateRequest.squareFootage ?? existData.squareFootage,
                    updatedAt: new Date(),
                },
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Unit Hunian dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message, error.cause);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.units.findUnique({
                where: { id: id },
            });
            if (!existData) {
                throw new common_1.NotFoundException(`Unit Hunian dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.units.delete({
                where: { id: id },
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(`Unit Hunian dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message, error.cause);
            throw new common_1.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian');
        }
    }
};
exports.UnitManageService = UnitManageService;
exports.UnitManageService = UnitManageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        generalHelper_1.GeneralHelper])
], UnitManageService);
//# sourceMappingURL=unit-manage.service.js.map