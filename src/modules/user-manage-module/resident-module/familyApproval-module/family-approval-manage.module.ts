import { forwardRef, Module } from '@nestjs/common';
import { FamilyApprovalManageService } from './family-approval-manage.service';
import { FamilyApprovalManageController } from './family-approval-manage.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { DatabaseService } from 'src/common/database/database.service';
import { ResidentManageModule } from '../resident-manage.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => ResidentManageModule)],
  controllers: [FamilyApprovalManageController],
  providers: [FamilyApprovalManageService, DatabaseService],
  exports: [FamilyApprovalManageService],
})
export class FamilyApprovalManageModule {}
