import { Module } from '@nestjs/common';
import { ComplaintManageModule } from './compliant-module/complaint-manage.module';
import { DatabaseModule } from '../../database/database.module';
import { UsersManageModule } from '../user-manage-module/users-manage.module';

@Module({
  imports: [DatabaseModule, ComplaintManageModule, UsersManageModule],
  exports: [ComplaintManageModule],
})
export class RequestManageModule {}
