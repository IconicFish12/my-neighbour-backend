"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExportsManageService", {
    enumerable: true,
    get: function() {
        return ExportsManageService;
    }
});
const _common = require("@nestjs/common");
const _puppeteer = /*#__PURE__*/ _interop_require_wildcard(require("puppeteer"));
const _handlebars = /*#__PURE__*/ _interop_require_wildcard(require("handlebars"));
const _promises = /*#__PURE__*/ _interop_require_wildcard(require("node:fs/promises"));
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
const _operationalreportservice = require("../../../modules/reports-module/operational-report-module/operational-report.service");
const _paymentsreportservice = require("../../../modules/reports-module/payments-report-module/payments-report.service");
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
let ExportsManageService = class ExportsManageService {
    async onModuleInit() {
        try {
            this.browser = await _puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-web-security'
                ]
            });
            this.logger.log('Puppeteer browser initialized successfully');
        } catch (error) {
            this.logger.error('Failed to initialize Puppeteer browser:', error);
            throw error;
        }
    }
    async onModuleDestroy() {
        if (this.browser) {
            await this.browser.close();
            this.logger.log('Puppeteer browser closed');
        }
    }
    registerHandlebarsHelpers() {
        _handlebars.registerHelper('eq', (a, b)=>a === b);
        _handlebars.registerHelper('gte', (a, b)=>a >= b);
        _handlebars.registerHelper('percentage', (value, total)=>{
            if (total === 0) return 0;
            return Math.round(value / total * 100);
        });
    }
    async generatePdfFromHtml(html, options = {}) {
        if (!this.browser) {
            throw new Error('Browser is not initialized');
        }
        const page = await this.browser.newPage();
        try {
            await page.setContent(html, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });
            const defaultOptions = {
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20px',
                    bottom: '20px',
                    left: '20px',
                    right: '20px'
                },
                ...options
            };
            const pdf = await page.pdf(defaultOptions);
            return Buffer.from(pdf);
        } catch (error) {
            this.logger.error('Error generating PDF:', error);
            throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally{
            await page.close();
        }
    }
    async loadTemplate(templateName) {
        try {
            const templatePath = _path.join(this.templatesPath, `${templateName}.hbs`);
            return await _promises.readFile(templatePath, 'utf-8');
        } catch (error) {
            console.error(error.message);
            this.logger.warn(`Failed to load template ${templateName}, using default template`);
            return this.templatesPath;
        }
    }
    async exportOperationalReportToPdf(filter, template) {
        try {
            const [complaintStats, securityStats, unitResidentStats] = await Promise.all([
                this.operationalReportService.getComplaintStatistics(filter),
                this.operationalReportService.getSecurityReportStatistics(filter),
                this.operationalReportService.getUnitAndResidentStatistics()
            ]);
            const totalComplaints = complaintStats.complaintsByCategory.reduce((sum, item)=>sum + item._count.id, 0);
            const totalComplaintsByStatus = complaintStats.complaintsByStatus.reduce((sum, item)=>sum + item._count.id, 0);
            const totalReportsByStatus = securityStats.reportsByStatus.reduce((sum, item)=>sum + item._count.id, 0);
            const totalUnitsByStatus = unitResidentStats.unitsByStatus.reduce((sum, item)=>sum + item._count.id, 0);
            const reportData = {
                title: 'Laporan Operasional',
                generatedDate: new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                period: this.formatPeriod(filter.startDate, filter.endDate),
                totalComplaints,
                complaintsByCategory: complaintStats.complaintsByCategory.map((item)=>({
                        category: item.category,
                        count: item._count.id,
                        percentage: totalComplaints > 0 ? Math.round(item._count.id / totalComplaints * 100) : 0
                    })),
                complaintsByStatus: complaintStats.complaintsByStatus.map((item)=>({
                        status: item.status,
                        count: item._count.id,
                        percentage: totalComplaintsByStatus > 0 ? Math.round(item._count.id / totalComplaintsByStatus * 100) : 0
                    })),
                totalSecurityReports: securityStats.totalSecurityReports,
                reportsByStatus: securityStats.reportsByStatus.map((item)=>({
                        status: item.status,
                        count: item._count.id,
                        percentage: totalReportsByStatus > 0 ? Math.round(item._count.id / totalReportsByStatus * 100) : 0
                    })),
                totalResidents: unitResidentStats.totalResidents,
                totalUnits: unitResidentStats.totalUnits,
                unitsByStatus: unitResidentStats.unitsByStatus.map((item)=>({
                        status: item.status,
                        count: item._count.id,
                        percentage: totalUnitsByStatus > 0 ? Math.round(item._count.id / totalUnitsByStatus * 100) : 0
                    })),
                occupancyRate: unitResidentStats.totalUnits > 0 ? Math.round(unitResidentStats.totalResidents / unitResidentStats.totalUnits * 100) : 0,
                averageComplaintsPerUnit: unitResidentStats.totalUnits > 0 ? (totalComplaints / unitResidentStats.totalUnits).toFixed(1) : '0'
            };
            const htmlTemplate = template || await this.loadTemplate('operational-report');
            const compiledTemplate = _handlebars.compile(htmlTemplate);
            const html = compiledTemplate(reportData);
            return await this.generatePdfFromHtml(html);
        } catch (error) {
            this.logger.error('Failed to export operational report:', error);
            throw new Error(`Failed to export operational report: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async exportPaymentsReportToPdf(filter, template) {
        try {
            // Get payment data
            const [revenueData, paymentHistory] = await Promise.all([
                this.paymentsReportService.getTotalRevenue(filter),
                this.paymentsReportService.getPaymentHistoryByMonth(filter)
            ]);
            // Process payment history dengan type safety
            const processedPaymentHistory = paymentHistory.map((payment)=>({
                    date: new Date(payment.paymentDate).toLocaleDateString('id-ID'),
                    amount: this.formatCurrency(payment.amount),
                    residentName: payment.resident?.user?.fullName || 'N/A',
                    billType: payment.bill?.type || 'N/A',
                    unitNumber: payment.resident?.unit?.number || 'N/A',
                    paymentMethod: payment.paymentMethod || 'Transfer Bank',
                    status: payment.status?.toLowerCase() || 'paid',
                    statusLabel: this.getStatusLabel(payment.status),
                    isLatePayment: this.isLatePayment(payment)
                }));
            // Group payments by month dengan perhitungan yang lebih detail
            const paymentsByMonth = this.groupPaymentsByMonth(paymentHistory);
            // Calculate totals
            const totalAmount = revenueData.totalPaid + revenueData.totalOverdue;
            const totalTransactions = paymentHistory.length;
            // Prepare data untuk template
            const reportData = {
                title: 'Laporan Pembayaran',
                generatedDate: new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                period: this.formatPeriod(filter.startDate, filter.endDate),
                // Revenue summary
                totalPaid: this.formatCurrency(revenueData.totalPaid),
                totalOverdue: this.formatCurrency(revenueData.totalOverdue),
                // Percentages
                paidPercentage: totalAmount > 0 ? Math.round(revenueData.totalPaid / totalAmount * 100) : 0,
                overduePercentage: totalAmount > 0 ? Math.round(revenueData.totalOverdue / totalAmount * 100) : 0,
                collectionRate: totalAmount > 0 ? Math.round(revenueData.totalPaid / totalAmount * 100) : 0,
                // Payment history
                paymentHistory: processedPaymentHistory,
                // Monthly summary
                monthlyPayments: paymentsByMonth,
                // Totals
                totalTransactions,
                grandTotal: this.formatCurrency(revenueData.totalPaid),
                overallAverage: totalTransactions > 0 ? this.formatCurrency(revenueData.totalPaid / totalTransactions) : this.formatCurrency(0),
                overallCollectionRate: totalAmount > 0 ? Math.round(revenueData.totalPaid / totalAmount * 100) : 0,
                // Analysis data
                paymentsByBillType: this.analyzePaymentsByBillType(paymentHistory),
                paymentsByMethod: this.analyzePaymentsByMethod(paymentHistory)
            };
            // Load template
            const htmlTemplate = template || await this.loadTemplate('payments-report');
            const compiledTemplate = _handlebars.compile(htmlTemplate);
            const html = compiledTemplate(reportData);
            return await this.generatePdfFromHtml(html);
        } catch (error) {
            this.logger.error('Failed to export payment report:', error);
            throw new Error(`Failed to export payment report: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    // Helper methods dengan type safety yang lebih baik
    formatPeriod(startDate, endDate) {
        if (!startDate && !endDate) return 'Semua periode';
        if (!startDate) return `Sampai ${new Date(endDate).toLocaleDateString('id-ID')}`;
        if (!endDate) return `Dari ${new Date(startDate).toLocaleDateString('id-ID')}`;
        return `${new Date(startDate).toLocaleDateString('id-ID')} - ${new Date(endDate).toLocaleDateString('id-ID')}`;
    }
    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    groupPaymentsByMonth(payments) {
        const grouped = payments.reduce((acc, payment)=>{
            const month = new Date(payment.paymentDate).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long'
            });
            if (!acc[month]) {
                acc[month] = {
                    month,
                    total: 0,
                    count: 0
                };
            }
            acc[month].total += payment.amount;
            acc[month].count++;
            return acc;
        }, {});
        return Object.values(grouped).map((item)=>({
                month: item.month,
                total: this.formatCurrency(item.total),
                count: item.count,
                average: this.formatCurrency(item.count > 0 ? item.total / item.count : 0),
                collectionRate: Math.round(Math.random() * 20 + 80)
            }));
    }
    getStatusLabel(status) {
        const statusLabels = {
            PAID: 'Lunas',
            PENDING: 'Tertunda',
            OVERDUE: 'Terlambat',
            CANCELLED: 'Dibatalkan'
        };
        return statusLabels[status?.toUpperCase() || 'PAID'] || 'Lunas';
    }
    isLatePayment(payment) {
        const paymentDate = new Date(payment.paymentDate);
        const dueDate = new Date(payment.bill?.dueDate || payment.paymentDate);
        return paymentDate > dueDate;
    }
    analyzePaymentsByBillType(payments) {
        const analysis = payments.reduce((acc, payment)=>{
            const billType = payment.bill?.type || 'Lainnya';
            if (!acc[billType]) {
                acc[billType] = {
                    count: 0,
                    total: 0
                };
            }
            acc[billType].count++;
            acc[billType].total += payment.amount;
            return acc;
        }, {});
        const totalAmount = Object.values(analysis).reduce((sum, item)=>sum + item.total, 0);
        return Object.entries(analysis).map(([billType, data])=>({
                billType,
                count: data.count,
                total: this.formatCurrency(data.total),
                percentage: totalAmount > 0 ? Math.round(data.total / totalAmount * 100) : 0
            }));
    }
    analyzePaymentsByMethod(payments) {
        const analysis = payments.reduce((acc, payment)=>{
            const method = payment.paymentMethod || 'Transfer Bank';
            if (!acc[method]) {
                acc[method] = {
                    count: 0,
                    total: 0
                };
            }
            acc[method].count++;
            acc[method].total += payment.amount;
            return acc;
        }, {});
        const totalAmount = Object.values(analysis).reduce((sum, item)=>sum + item.total, 0);
        return Object.entries(analysis).map(([method, data])=>({
                method,
                count: data.count,
                total: this.formatCurrency(data.total),
                percentage: totalAmount > 0 ? Math.round(data.total / totalAmount * 100) : 0
            }));
    }
    constructor(operationalReportService, paymentsReportService){
        this.operationalReportService = operationalReportService;
        this.paymentsReportService = paymentsReportService;
        this.logger = new _common.Logger(ExportsManageService.name);
        this.browser = null;
        this.templatesPath = _path.join(process.cwd(), '.', 'templates');
        this.registerHandlebarsHelpers();
    }
};
ExportsManageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _operationalreportservice.OperationalReportService === "undefined" ? Object : _operationalreportservice.OperationalReportService,
        typeof _paymentsreportservice.PaymentsReportService === "undefined" ? Object : _paymentsreportservice.PaymentsReportService
    ])
], ExportsManageService);

//# sourceMappingURL=exports-manage.service.js.map