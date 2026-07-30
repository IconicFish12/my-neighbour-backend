"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OperationalReportController", {
    enumerable: true,
    get: function() {
        return OperationalReportController;
    }
});
const _common = require("@nestjs/common");
const _operationalreportservice = require("./operational-report.service");
const _operationalreportfilter = require("../../../dtos/requests/operational-report-filter");
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
let OperationalReportController = class OperationalReportController {
    getComplaintStats(filter) {
        return this.operationalReportService.getComplaintStatistics(filter);
    }
    getSecurityReportStats(filter) {
        return this.operationalReportService.getSecurityReportStatistics(filter);
    }
    getUnitResidentStats() {
        return this.operationalReportService.getUnitAndResidentStatistics();
    }
    constructor(operationalReportService){
        this.operationalReportService = operationalReportService;
    }
};
_ts_decorate([
    (0, _common.Get)('complaints/stats'),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _operationalreportfilter.OperationalReportFilterDto === "undefined" ? Object : _operationalreportfilter.OperationalReportFilterDto
    ]),
    _ts_metadata("design:returntype", void 0)
], OperationalReportController.prototype, "getComplaintStats", null);
_ts_decorate([
    (0, _common.Get)('security-reports/stats'),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _operationalreportfilter.OperationalReportFilterDto === "undefined" ? Object : _operationalreportfilter.OperationalReportFilterDto
    ]),
    _ts_metadata("design:returntype", void 0)
], OperationalReportController.prototype, "getSecurityReportStats", null);
_ts_decorate([
    (0, _common.Get)('units-residents/stats'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], OperationalReportController.prototype, "getUnitResidentStats", null);
OperationalReportController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _operationalreportservice.OperationalReportService === "undefined" ? Object : _operationalreportservice.OperationalReportService
    ])
], OperationalReportController);

//# sourceMappingURL=operational-report.controller.js.map