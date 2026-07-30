"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UnitManageService", {
    enumerable: true,
    get: function() {
        return UnitManageService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../database/database.service");
const _generalHelper = require("../../common/helper/generalHelper");
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
let UnitManageService = class UnitManageService {
    async create(createRequest) {
        try {
            return await this.prisma.units.create({
                data: {
                    unitNumber: createRequest.unitNumber,
                    buildingName: createRequest.buildingName ?? null,
                    location: createRequest.location,
                    priceSale: this.helper.twoDecimal(createRequest.priceSale),
                    floorNumber: createRequest.floorNumber ?? null,
                    status: _clientts.UnitStatus.AVAILABLE,
                    numberOfRooms: createRequest.numberOfRooms ?? null,
                    squareFootage: createRequest.squareFootage ?? null
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Unit Hunian');
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
                            Payments: true
                        }
                    }
                },
                orderBy: {
                    unitNumber: 'asc'
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.units.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    Bills: {
                        select: {
                            amount: true
                        }
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
                            images: true
                        },
                        orderBy: {
                            title: 'asc'
                        }
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
                                    primaryEmail: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.units.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Unit Hunian dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.units.update({
                where: {
                    id: id
                },
                data: {
                    unitNumber: updateRequest.unitNumber ?? existData.unitNumber,
                    buildingName: updateRequest.buildingName ?? existData.buildingName,
                    location: updateRequest.location ?? existData.location,
                    priceSale: this.helper.twoDecimal(updateRequest.priceSale) ?? existData.priceSale,
                    status: updateRequest.status ?? existData.status,
                    floorNumber: updateRequest.floorNumber ?? existData.floorNumber,
                    numberOfRooms: updateRequest.numberOfRooms ?? existData.numberOfRooms,
                    squareFootage: updateRequest.squareFootage ?? existData.squareFootage,
                    updatedAt: new Date()
                }
            });
        } catch (error) {
            if (error instanceof _common.NotFoundException) {
                throw error;
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Unit Hunian dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message, error.cause);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.units.findUnique({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Unit Hunian dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.units.delete({
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
                    throw new _common.NotFoundException(`Unit Hunian dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message, error.cause);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Unit Hunian');
        }
    }
    constructor(prisma, helper){
        this.prisma = prisma;
        this.helper = helper;
    }
};
UnitManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService,
        typeof _generalHelper.GeneralHelper === "undefined" ? Object : _generalHelper.GeneralHelper
    ])
], UnitManageService);

//# sourceMappingURL=unit-manage.service.js.map