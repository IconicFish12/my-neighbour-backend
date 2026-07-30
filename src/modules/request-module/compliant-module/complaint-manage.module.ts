import { Module } from '@nestjs/common';
import { ComplaintManageService } from './complaint-manage.service';
import { ComplaintManageController } from './complaint-manage.controller';
import { DatabaseModule } from '../../../database/database.module';
import { DatabaseService } from '../../../database/database.service';
import { EmployeeManageModule } from '../../user-manage-module/employee-module/employee-manage.module';
import { ResidentManageModule } from '../../user-manage-module/resident-module/resident-manage.module';
import { GeneralHelper } from '../../../common/helper/generalHelper';

@Module({
  imports: [DatabaseModule, EmployeeManageModule, ResidentManageModule],
  controllers: [ComplaintManageController],
  providers: [ComplaintManageService, DatabaseService, GeneralHelper],
  exports: [ComplaintManageService],
})
export class ComplaintManageModule {}
