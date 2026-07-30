import { Module } from '@nestjs/common';
import { BillingManageService } from './billing-manage.service';
import { BillingManageController } from './billing-manage.controller';
import { DatabaseModule } from '../../../database/database.module';
import { DatabaseService } from '../../../database/database.service';
import { UnitManageModule } from '../../../modules/unit-manage-module/unit-manage.module';
import { EmployeeManageModule } from '../../../modules/user-manage-module/employee-module/employee-manage.module';
import { GeneralHelper } from '../../../common/helper/generalHelper';

@Module({
  imports: [DatabaseModule, EmployeeManageModule, UnitManageModule],
  controllers: [BillingManageController],
  providers: [BillingManageService, DatabaseService, GeneralHelper],
  exports: [BillingManageService],
})
export class BillingManageModule {}
