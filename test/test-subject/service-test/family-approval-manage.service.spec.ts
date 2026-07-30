import { Test, TestingModule } from '@nestjs/testing';
import { FamilyApprovalManageService } from '../../../src/modules/user-manage-module/resident-module/familyApproval-module/family-approval-manage.service';

describe('FamilyApprovalManageService', () => {
  let service: FamilyApprovalManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyApprovalManageService],
    }).compile();

    service = module.get<FamilyApprovalManageService>(
      FamilyApprovalManageService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
