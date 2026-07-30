"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaymentsReportController", {
    enumerable: true,
    get: function() {
        return PaymentsReportController;
    }
});
const _common = require("@nestjs/common");
const _paymentsreportservice = require("./payments-report.service");
const _paymentsreportfilterdto = require("../../../dtos/requests/payments-report-filter-dto");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let PaymentsReportController = class PaymentsReportController {
    getTotalRevenue(filter) {
        return this.paymentsReportService.getTotalRevenue(filter);
    }
    getPaymentHistory(filter) {
        return this.paymentsReportService.getPaymentHistoryByMonth(filter);
    }
    constructor(paymentsReportService){
        this.paymentsReportService = paymentsReportService;
    }
};
_ts_decorate([
    (0, _common.Get)('revenue'),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _paymentsreportfilterdto.PaymentsReportFilterDto === "undefined" ? Object : _paymentsreportfilterdto.PaymentsReportFilterDto
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsReportController.prototype, "getTotalRevenue", null);
_ts_decorate([
    (0, _common.Get)('history'),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _paymentsreportfilterdto.PaymentsReportFilterDto === "undefined" ? Object : _paymentsreportfilterdto.PaymentsReportFilterDto
    ]),
    _ts_metadata("design:returntype", void 0)
], PaymentsReportController.prototype, "getPaymentHistory", null);
PaymentsReportController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _paymentsreportservice.PaymentsReportService === "undefined" ? Object : _paymentsreportservice.PaymentsReportService
    ])
], PaymentsReportController);

//# sourceMappingURL=payments-report.controller.js.map