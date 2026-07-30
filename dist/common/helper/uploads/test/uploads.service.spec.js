"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _uploadsservice = require("../uploads.service");
describe('UploadsService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _uploadsservice.UploadsService
            ]
        }).compile();
        service = module.get(_uploadsservice.UploadsService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=uploads.service.spec.js.map