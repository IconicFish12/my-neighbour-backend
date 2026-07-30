"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseService", {
    enumerable: true,
    get: function() {
        return DatabaseService;
    }
});
require("dotenv/config");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _clientts = require("./generated/prisma/client.ts");
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
let DatabaseService = class DatabaseService extends _clientts.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    constructor(config){
        const adapter = new _adapterpg.PrismaPg({
            connectionString: config.get('DATABASE_URL') || config.get('DATABASE_URL_SUPABASE')
        });
        super({
            adapter: adapter
        }), this.config = config;
    }
};
DatabaseService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], DatabaseService);

//# sourceMappingURL=database.service.js.map