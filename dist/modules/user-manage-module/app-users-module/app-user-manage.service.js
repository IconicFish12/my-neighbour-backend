"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppUserManageService", {
    enumerable: true,
    get: function() {
        return AppUserManageService;
    }
});
const _common = require("@nestjs/common");
const _bcrypt = /*#__PURE__*/ _interop_require_wildcard(require("bcrypt"));
const _databaseservice = require("../../../database/database.service");
const _clientts = require("../../../database/generated/prisma/client.ts");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
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
let AppUserManageService = class AppUserManageService {
    async create(createRequest) {
        try {
            const hashedPassword = await this.passwordHashing(createRequest.password);
            return await this.prisma.users.create({
                data: {
                    fullName: createRequest.fullName,
                    firstName: createRequest.firstName,
                    lastName: createRequest.lastName,
                    username: createRequest.username,
                    primaryEmail: createRequest.primaryEmail,
                    password: hashedPassword,
                    role: createRequest.role,
                    gender: createRequest.gender
                },
                omit: {
                    password: true
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Membuat Data Pengguna Aplikasi');
        }
    }
    async findAll() {
        try {
            return await this.prisma.users.findMany({
                include: {
                    Employee: {
                        select: {
                            employeeNumberId: true,
                            employeePosition: true,
                            hireDate: true,
                            workingHours: true,
                            salary: true,
                            bonus: true
                        }
                    },
                    Resident: {
                        select: {
                            emergencyContactName: true,
                            emergencyContactNumber: true,
                            movedInDate: true,
                            movedOutDate: true
                        }
                    },
                    _count: {
                        select: {
                            ForumPosts: true,
                            ForumComments: true
                        }
                    }
                },
                orderBy: {
                    fullName: 'asc'
                }
            });
        } catch (error) {
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Pengguna Aplikasi');
        }
    }
    async findOne(id) {
        try {
            return await this.prisma.users.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: {
                    Employee: {
                        select: {
                            employeeNumberId: true,
                            employeePosition: true,
                            hireDate: true,
                            workingHours: true,
                            salary: true,
                            bonus: true,
                            Complaints: {
                                select: {
                                    title: true,
                                    description: true,
                                    submittedAt: true,
                                    status: true
                                }
                            },
                            Announcements: {
                                select: {
                                    title: true,
                                    content: true,
                                    publishDate: true,
                                    expiryDate: true
                                },
                                orderBy: {
                                    publishDate: 'asc'
                                }
                            }
                        }
                    },
                    Resident: {
                        select: {
                            emergencyContactName: true,
                            emergencyContactNumber: true,
                            movedInDate: true,
                            movedOutDate: true,
                            unit: {
                                select: {
                                    unitNumber: true,
                                    buildingName: true,
                                    location: true,
                                    floorNumber: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            // Catch specific errors like NotFoundError
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Pengguna Aplikasi dengan id: ${id} tidak ditemukan`);
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Data Pengguna Aplikasi');
        }
    }
    async update(id, updateRequest) {
        try {
            const existData = await this.prisma.users.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Pengguna Aplikasi dengan id: ${id} tidak ditemukan`);
            }
            const updatedData = await this.prisma.users.update({
                where: {
                    id: id
                },
                data: {
                    fullName: updateRequest.fullName ?? existData.fullName,
                    firstName: updateRequest.firstName ?? existData.firstName,
                    lastName: updateRequest.lastName ?? existData.lastName,
                    username: updateRequest.username ?? existData.username,
                    primaryEmail: updateRequest.primaryEmail ?? existData.primaryEmail,
                    role: updateRequest.role ?? existData.role,
                    gender: updateRequest.gender ?? existData.gender,
                    secondaryEmail: updateRequest.secondaryEmail ?? existData.secondaryEmail,
                    contactNumber: updateRequest.contactNumber ?? existData.contactNumber,
                    dateOfBirth: updateRequest.dateOfBirth ?? existData.dateOfBirth,
                    updatedAt: new Date()
                },
                omit: {
                    password: true
                }
            });
            return updatedData;
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Pengguna Aplikasi dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Pengguna Aplikasi dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Mendapatkan Pengguna Aplikasi');
        }
    }
    async remove(id) {
        try {
            const existData = await this.prisma.users.findUniqueOrThrow({
                where: {
                    id: id
                }
            });
            if (!existData) {
                throw new _common.NotFoundException(`Pengguna Aplikasi dengan id: ${id} tidak ditemukan`);
            }
            return await this.prisma.users.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            if (error.name === 'NotFoundError') {
                throw new _common.NotFoundException(`Pengguna Aplikasi dengan id: ${id} tidak ditemukan`);
            }
            if (error instanceof _clientts.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new _common.NotFoundException(`Resident dengan id: ${id} tidak ditemukan`);
                }
            }
            console.error(error.message);
            throw new _common.InternalServerErrorException('Terjadi Kesalahan Saat Menghapus Data Pengguna Aplikasi');
        }
    }
    async passwordHashing(password) {
        return await _bcrypt.hash(password, 15);
    }
    async compare(password, hashedPassword) {
        return await _bcrypt.compare(password, hashedPassword);
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
AppUserManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], AppUserManageService);

//# sourceMappingURL=app-user-manage.service.js.map