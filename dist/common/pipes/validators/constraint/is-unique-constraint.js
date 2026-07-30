/* eslint-disable @typescript-eslint/no-unsafe-member-access */ /* eslint-disable @typescript-eslint/no-unsafe-assignment */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsUniqueConstraint", {
    enumerable: true,
    get: function() {
        return IsUniqueConstraint;
    }
});
require("dotenv/config");
const _classvalidator = require("class-validator");
const _common = require("@nestjs/common");
const _clientts = require("../../../../database/generated/prisma/client.ts");
const _adapterpg = require("@prisma/adapter-pg");
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
let IsUniqueConstraint = class IsUniqueConstraint {
    async validate(value, args) {
        if (!this.prismaClient) {
            return false;
        }
        const [model, field, excludeIdField] = args.constraints;
        if (value === undefined || value === null || value === '') {
            return true;
        }
        const modelAccessor = this.prismaClient[model];
        if (!modelAccessor || typeof modelAccessor.findFirst !== 'function') {
            console.error(`IsUniqueConstraint: Model "${String(model)}" tidak ditemukan atau tidak mendukung findFirst.`);
            return false;
        }
        const whereCondition = {
            [field]: value
        };
        if (excludeIdField && args.object && args.object[excludeIdField]) {
            const excludeId = args.object[excludeIdField];
            whereCondition.NOT = {
                id: excludeId
            };
        }
        try {
            const existingRecord = await modelAccessor.findFirst({
                where: whereCondition
            });
            return !existingRecord;
        } catch (error) {
            console.error(`IsUniqueConstraint: Database error checking uniqueness for ${model}.${field}:`, error);
            return false;
        }
    }
    defaultMessage(args) {
        const [, field] = args.constraints;
        return `Nilai '${args.value}' untuk field '${field}' sudah ada.`;
    }
    constructor(){
        const connectionString = process.env.DATABASE_URL_SUPABASE || process.env.DATABASE_URL || '';
        const adapter = new _adapterpg.PrismaPg({
            connectionString
        });
        this.prismaClient = new _clientts.PrismaClient({
            adapter
        });
    }
};
IsUniqueConstraint = _ts_decorate([
    (0, _classvalidator.ValidatorConstraint)({
        name: 'isUnique',
        async: true
    }),
    (0, _common.Injectable)({
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], IsUniqueConstraint);

//# sourceMappingURL=is-unique-constraint.js.map