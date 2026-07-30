/* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable @typescript-eslint/no-unsafe-member-access */ /* eslint-disable @typescript-eslint/no-unsafe-assignment */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentsReportService", {
    enumerable: true,
    get: function() {
        return PaymentsReportService;
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
let PaymentsReportService = class PaymentsReportService {
    async getTotalRevenue(filter) {
        const whereClause = this.buildWhereClause(filter);
        const totalPaid = await this.prisma.payments.aggregate({
            _sum: {
                amount: true
            },
            where: {
                ...whereClause,
                status: _clientts.PaymentStatus.PAID
            }
        });
        const totalOverdue = await this.prisma.bills.aggregate({
            _sum: {
                amount: true
            },
            where: {
                ...whereClause,
                isPaid: false,
                dueDate: {
                    lt: new Date()
                }
            }
        });
        return {
            totalPaid: totalPaid._sum.amount || 0,
            totalOverdue: totalOverdue._sum.amount || 0
        };
    }
    async getPaymentHistoryByMonth(filter) {
        const payments = await this.prisma.payments.findMany({
            where: this.buildWhereClause(filter),
            select: {
                paymentDate: true,
                amount: true,
                resident: {
                    select: {
                        user: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                },
                bill: {
                    select: {
                        type: true
                    }
                }
            },
            orderBy: {
                paymentDate: 'asc'
            }
        });
        return payments;
    }
    buildWhereClause(filter) {
        const where = {};
        if (filter.startDate) {
            where.paymentDate = {
                gte: new Date(filter.startDate)
            };
        }
        if (filter.endDate) {
            where.paymentDate = {
                ...where.paymentDate,
                lte: new Date(filter.endDate)
            };
        }
        if (filter.status) {
            where.status = filter.status;
        }
        if (filter.paymentType) {
            where.bill = {
                type: filter.paymentType
            };
        }
        return where;
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
PaymentsReportService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databaseservice.DatabaseService === "undefined" ? Object : _databaseservice.DatabaseService
    ])
], PaymentsReportService);

//# sourceMappingURL=payments-report.service.js.map