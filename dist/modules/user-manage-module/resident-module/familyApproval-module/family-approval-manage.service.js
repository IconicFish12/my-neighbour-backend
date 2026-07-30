"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FamilyApprovalManageService", {
    enumerable: true,
    get: function() {
        return FamilyApprovalManageService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../../../database/database.service");
const _clientts = require("../../../../database/generated/prisma/client.ts");
const _clientts1 = require("../../../../database/generated/prisma/client.ts");
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
let FamilyApprovalManageService = class FamilyApprovalManageService {
    async create(createRequest) {
        try {
            const existingRequest = await this.prisma.familyApprovals.findFirst({
                where: {
                    familyMemberId: createRequest.familyMemberId,
                    status: _clientts1.ApprovalStatus.PENDING
                }
            });
            if (existingRequest) {
                throw new _common.BadRequestException('Permintaan persetujuan yang tertunda sudah ada untuk anggota keluarga ini.');
            }
            return await this.prisma.familyApprovals.create({
                data: {
                    familyMemberId: createRequest.familyMemberId,
                    headOfHouseholdId: createRequest.headOfHouseholdId,
                    status: _clientts1.ApprovalStatus.PENDING,
                    notes: createRequest.notes
                }
            });
        } catch (error) {
            console.error(error.message);
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') {
                    throw new _common.BadRequestException('ID anggota keluarga atau ID kepala rumah tangga tidak valid.');
                }
            }
            if (error instanceof _common.BadRequestException) throw error; // Re-throw custom error
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat membuat Data permintaan persetujuan keluarga.');
        }
    }
    async findAll() {
        try {
            return await this.prisma.familyApprovals.findMany({
                include: {
                    familyMember: {
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
                    headOfHousehold: {
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
                },
                orderBy: {
                    requestedAt: 'desc'
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat mengambil semua Data permintaan persetujuan keluarga.');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.familyApprovals.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    familyMember: true,
                    headOfHousehold: true
                }
            });
        } catch (error) {
            console.error(error.message);
            if (error.code === 'P2025') {
                throw new _common.NotFoundException(`Data Permintaan persetujuan keluarga dengan ID ${id} tidak ditemukan.`);
            }
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat mengambil Data permintaan persetujuan keluarga.');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.familyApprovals.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Data permintaan persetujuan Keluarga dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.familyApprovals.update({
                where: {
                    id: id
                },
                data: {
                    status: updateRequest.status,
                    respondedAt: updateRequest.status !== _clientts1.ApprovalStatus.PENDING ? new Date() : undefined,
                    notes: updateRequest.notes,
                    updatedAt: new Date()
                }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new _common.NotFoundException(`Data Permintaan persetujuan keluarga dengan ID ${id} tidak ditemukan.`);
            }
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat memperbarui Data permintaan persetujuan keluarga.');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.familyApprovals.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Data permintaan persetujuan Keluarga dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.familyApprovals.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new _common.NotFoundException(`Data Permintaan persetujuan keluarga dengan ID ${id} tidak ditemukan.`);
            }
            throw new _common.InternalServerErrorException('Terjadi kesalahan saat menghapus Data permintaan persetujuan keluarga.');
        }
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
FamilyApprovalManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], FamilyApprovalManageService);

//# sourceMappingURL=family-approval-manage.service.js.map