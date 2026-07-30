/* eslint-disable @typescript-eslint/no-unsafe-assignment */ /* eslint-disable @typescript-eslint/no-unsafe-member-access */ /* eslint-disable @typescript-eslint/no-unsafe-return */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OperationalReportService", {
    enumerable: true,
    get: function() {
        return OperationalReportService;
    }
});
const _common = require("@nestjs/common");
const _databaseservice = require("../../../database/database.service");
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
let OperationalReportService = class OperationalReportService {
    async getComplaintStatistics(filter) {
        const whereClause = this.buildWhereClause(filter);
        const totalComplaints = await this.prisma.complaints.count({
            where: whereClause
        });
        const complaintsByCategory = await this.prisma.complaints.groupBy({
            by: [
                'category'
            ],
            _count: {
                id: true
            },
            where: whereClause
        });
        const complaintsByStatus = await this.prisma.complaints.groupBy({
            by: [
                'status'
            ],
            _count: {
                id: true
            },
            where: whereClause
        });
        return {
            totalComplaints,
            complaintsByCategory,
            complaintsByStatus
        };
    }
    async getSecurityReportStatistics(filter) {
        const whereClause = this.buildWhereClause(filter);
        const totalSecurityReports = await this.prisma.securityReports.count({
            where: whereClause
        });
        const reportsByStatus = await this.prisma.securityReports.groupBy({
            by: [
                'status'
            ],
            _count: {
                id: true
            },
            where: whereClause
        });
        return {
            totalSecurityReports,
            reportsByStatus
        };
    }
    async getUnitAndResidentStatistics() {
        const totalResidents = await this.prisma.residents.count();
        const totalUnits = await this.prisma.units.count();
        const unitsByStatus = await this.prisma.units.groupBy({
            by: [
                'status'
            ],
            _count: {
                id: true
            }
        });
        return {
            totalResidents,
            totalUnits,
            unitsByStatus
        };
    }
    buildWhereClause(filter) {
        const where = {};
        if (filter.startDate) {
            where.createdAt = {
                gte: new Date(filter.startDate)
            };
        }
        if (filter.endDate) {
            where.createdAt = {
                ...where.createdAt,
                lte: new Date(filter.endDate)
            };
        }
        if (filter.unitStatus) {
            where.unit = {
                status: filter.unitStatus
            };
        }
        return where;
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
OperationalReportService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], OperationalReportService);

//# sourceMappingURL=operational-report.service.js.map