"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _midtransservice = require("./midtrans.service");
describe('MidtransService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _midtransservice.MidtransService
            ]
        }).compile();
        service = module.get(_midtransservice.MidtransService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=midtrans.service.spec.js.map