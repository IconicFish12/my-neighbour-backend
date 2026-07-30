import { Test, TestingModule } from '@nestjs/testing';
import { FamilyCodeManageService } from '../../../src/modules/user-manage-module/resident-module/familyCode-module/family-code-manage.service';
describe('FamilyCodeManageService', () => {
  let service: FamilyCodeManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyCodeManageService],
    }).compile();

    service = module.get<FamilyCodeManageService>(FamilyCodeManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
