import { Test, TestingModule } from '@nestjs/testing';
import { FamilyCodeManageController } from '../../../src/modules/user-manage-module/resident-module/familyCode-module/family-code-manage.controller';
import { FamilyCodeManageService } from '../../../src/modules/user-manage-module/resident-module/familyCode-module/family-code-manage.service';

describe('FamilyCodeManageController', () => {
  let controller: FamilyCodeManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyCodeManageController],
      providers: [FamilyCodeManageService],
    }).compile();

    controller = module.get<FamilyCodeManageController>(
      FamilyCodeManageController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
