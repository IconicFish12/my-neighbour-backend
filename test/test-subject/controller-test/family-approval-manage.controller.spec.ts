import { Test, TestingModule } from '@nestjs/testing';
import { FamilyApprovalManageController } from '../../../src/modules/user-manage-module/resident-module/familyApproval-module/family-approval-manage.controller';
import { FamilyApprovalManageService } from '../../../src/modules/user-manage-module/resident-module/familyApproval-module/family-approval-manage.service';

describe('FamilyApprovalManageController', () => {
  let controller: FamilyApprovalManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyApprovalManageController],
      providers: [FamilyApprovalManageService],
    }).compile();

    controller = module.get<FamilyApprovalManageController>(
      FamilyApprovalManageController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
