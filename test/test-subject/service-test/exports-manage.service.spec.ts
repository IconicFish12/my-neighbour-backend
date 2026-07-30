import { Test, TestingModule } from '@nestjs/testing';
import { ExportsManageService } from '../../../src/common/helper/export/exports-manage.service';

describe('ExportsManageService', () => {
  let service: ExportsManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportsManageService],
    }).compile();

    service = module.get<ExportsManageService>(ExportsManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
