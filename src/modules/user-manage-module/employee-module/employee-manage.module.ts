import { Module } from '@nestjs/common';
import { EmployeeManageService } from './employee-manage.service';
import { EmployeeManageController } from './employee-manage.controller';
import { DatabaseModule } from '../../../database/database.module';
import { DatabaseService } from '../../../database/database.service';
import { GeneralHelper } from '../../../common/helper/generalHelper';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeManageController],
  providers: [EmployeeManageService, DatabaseService, GeneralHelper],
  exports: [EmployeeManageService],
})
export class EmployeeManageModule {}
