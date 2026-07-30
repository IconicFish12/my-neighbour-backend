import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EmployeeManageModule } from './employee-module/employee-manage.module';
import { ResidentManageModule } from './resident-module/resident-manage.module';
import { AppUserManageModule } from './app-users-module/app-user-manage.module';

@Module({
  imports: [
    DatabaseModule,
    EmployeeManageModule,
    ResidentManageModule,
    AppUserManageModule,
  ],
  exports: [EmployeeManageModule, ResidentManageModule, AppUserManageModule],
})
export class UsersManageModule {}
